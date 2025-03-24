// Required packages
import axios from "axios";
import * as cheerio from "cheerio";

class BookData {
  constructor({ title, author,year, thumbnail, link, md5, publisher, info }) {
    this.title = title;
    this.author = author || "unknown";
    this.year = year || "N/A";
    this.thumbnail = thumbnail || null;
    this.link = link;
    this.md5 = md5;
    this.publisher = publisher || "unknown";
    this.info = info || "";
  }
}

class BookInfoData extends BookData {
  constructor({
    title,
    author,
    year,
    thumbnail,
    publisher,
    info,
    link,
    md5,
    format,
    mirror,
    description,
  }) {
    super({ title, author, year ,thumbnail, link, md5, publisher, info });
    this.format = format || "unknown";
    this.mirror = mirror || null;
    this.description = description || "No description available";
  }
}

class AnnasArchive {
  constructor() {
    this.baseUrl = "https://annas-archive.org";
    this.defaultHeaders = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    };
  }

  getMd5(url) {
    return url.split("/").pop();
  }

  async searchBooks(
    searchQuery,
    content = "",
    sort = "",
    fileType = "",
    enableFilters = true
  ) {
    try {
      const encodedURL = this.urlEncoder(
        searchQuery,
        content,
        sort,
        fileType,
        enableFilters
      );
      const response = await axios.get(encodedURL, {
        headers: this.defaultHeaders,
      });
      return this._parser(response.data, fileType);
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  }

  urlEncoder(searchQuery, content, sort, fileType, enableFilters) {
    const encodedQuery = searchQuery.replace(/ /g, "+");
    if (!enableFilters) return `${this.baseUrl}/search?q=${encodedQuery}`;
    return `${this.baseUrl}/search?index=&q=${encodedQuery}&content=${content}&ext=${fileType}&sort=${sort}`;
  }

  _parser(html, fileType) {
    const $ = cheerio.load(html.replace(/<!--|-->/g, ""));
    let bookList = [];

    $("a").each((_, element) => {
      let data = {
        title: $(element).find("h3").text(),
        year: $(element).find('div[class*="truncate"][class*="leading-"][class*="max-lg:text-xs"]').text().match(/\d{4}(?=\D*$)/)?.[0] || "N/A",
        thumbnail: $(element).find("img").attr("src"),
        link: $(element).attr("href"),
        author: $(element).find("div.italic").text() || "unknown",
        publisher: $(element).find("div.truncate").text() || "unknown",
        info: $(element).find("div.text-gray-500").text() || "",
      };
      if (
        data.title &&
        data.link &&
        data.info &&
        ((fileType === "" && /pdf|epub|cbr|cbz/.test(data.info)) ||
          data.info.includes(fileType))
      ) {
        bookList.push(
          new BookData({
            ...data,
            link: this.baseUrl + data.link,
            md5: this.getMd5(data.link),
          })
        );
      }
    });

    return bookList;
  }

  async bookInfo(url) {
    try {
      const response = await axios.get(url, { headers: this.defaultHeaders });
      return this._bookInfoParser(response.data, url);
    } catch (error) {
      console.error("Error fetching book info:", error);
      throw error;
    }
  }

  _bookInfoParser(html, url) {
    const $ = cheerio.load(html);
    const main = $("main.main");
    const externalLinks = main.find("ul.js-show-external.hidden li>a");

    let mirror = null;
    main.find("ul.list-inside.mb-4.ml-1 li>a").each((_, element) => {
      if (
        $(element).attr("href")?.startsWith("/slow_download") &&
        $(element).attr("href")?.endsWith("/2")
      ) {
        mirror = `${this.baseUrl}${$(element).attr("href")}`;
      }
    });

    if (!mirror) {
      externalLinks.each((_, element) => {
        if ($(element).attr("href")?.startsWith("/ipfs_downloads")) {
          mirror = `${this.baseUrl}${$(element).attr("href")}`;
        }
      });
    }

    let data = {
      title: main.find("div.text-3xl.font-bold").text().trim(),
      author: main.find("div.italic").text().trim() || "unknown",
      year: main.find('div[class*="truncate"][class*="leading-"][class*="max-lg:text-xs"]').text().match(/\d{4}$/)[0],   
      thumbnail: main.find("img").attr("src"),
      link: url,
      mirror: mirror,
      publisher: main.find("div.text-md").text().trim() || "unknown",
      info: main.find("div.text-sm.text-gray-500").text().trim() || "",
      description:
        main.find("div.mb-1").text().replace("description", "").trim() ||
        "No description",
    };

    if (data.title && data.link) {
      return new BookInfoData({
        ...data,
        md5: this.getMd5(data.link),
        format: this.getFormat(data.info),
        mirror,
      });
    } else {
      return null;
    }
  }

  getFormat(info) {
    if (/pdf/.test(info)) return "pdf";
    if (/cbr/.test(info)) return "cbr";
    if (/cbz/.test(info)) return "cbz";
    return "epub";
  }
}

// Example usage
const getbook = async ({query}) => {
  const archive = new AnnasArchive();
  try {
    const books = await archive.searchBooks(query, "", "", "epub", true);
    console.log("Books found:", books);
    return books;

    // if (books.length > 0) {          
    //   const bookDetails = await archive.bookInfo(books[0].link);
    //   console.log("Book details:", bookDetails);
    // }
  } catch (error) {
    console.error("Error:", error);
  }
};
getbook({query: "Harry Potter"});
export default getbook;