import express from "express";
import cors from "cors";
import libgen from "libgen";
import axios from "axios";
import getbook from "./ana.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


  
// test.js (Backend)
app.get("/libsearch", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }
  
      const mirror = await libgen.mirror();
      console.log(mirror);
      const options = {
        mirror: mirror,
        query: query,
        count: 10,
        sort_by: "epub",
      };
  
      const books = await libgen.search(options);
      console.log(books);
      // Add download/read links based on MD5 hash
      books.forEach((book) => {
        if (book.md5) {
          book.url = `https://cdn3.booksdl.lc/get.php?md5=6551B0782C5036A057B2F84887C11CA8`; // Example Libgen URL for EPUB files
          // book.url = `https://cdn3.booksdl.lc/get.php?md5=${book.md5}`; // Example Libgen URL for EPUB files
        }
        if (book.extension) {
          book.fileType = `${book.extension}`;
        }
      });
      
  
      res.json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
app.get("/search", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }
  
  
      const books = await getbook({query: query});
      console.log(books);
      // Add download/read links based on MD5 hash
      books.forEach((book) => {
        if (book.md5) {
          book.url = `https://cdn3.booksdl.lc/get.php?md5=6551B0782C5036A057B2F84887C11CA8`; // Example Libgen URL for EPUB files
          // book.url = `https://cdn3.booksdl.lc/get.php?md5=${book.md5}`; // Example Libgen URL for EPUB files
        }
          book.fileType = "epub";
        }
      );
      
  
      res.json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
app.get("/fetch-file", async (req, res) => {
  try {
    const fileUrl = req.query.url;
    if (!fileUrl) return res.status(400).json({ error: "URL is required" });

    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the file" });
  }
}); 
  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
