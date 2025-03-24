from libgen_api import LibgenSearch
from ast import literal_eval
import requests

class Books() :
    def search(self, author:str = "", title:str = "", publisher:str = "", year:str = "", language:str = "") -> list :
        if title == "" and author == "" :
            return []
        libgen = LibgenSearch()
        filter = self.getFilter(publisher, year, language)
        if title != "" :
            if author != "" :
                filter["Author"] = author
            if filter == {} :
                result = libgen.search_title(title)
            else :
                result = libgen.search_title_filtered(title, filter, exact_match = True)
        else :
            if filter == {} :
                result = libgen.search_author(author)
            else :
                result = libgen.search_author_filtered(author, filter, exact_match = True)
            
        return self.resultfilter(result)
    
    def searchISBN(self, isbn:int) -> list :
        language = ""
        author = ""
        url = "https://openlibrary.org/isbn/" + str(isbn) + ".json"
        book = requests.get(url)
        try :
            book_info = literal_eval(book.text)
        except :
            return []
        if "languages" in book_info :
            languagekey = book_info["languages"][0]["key"][-3:]
            print(languagekey)
            language = "english" if languagekey == "eng" else language
        if "authors" in book_info :
            authorkey = book_info["authors"][0]["key"]
            author = requests.get("https://openlibrary.org"+authorkey).text
            author = author[author.find(authorkey):]
            author = author[author.find('/', 9)+1 : author.find('"')].replace("_", " ")
        #for i in book_info :
        #    print(i, "\t", book_info[i])
        return self.search(title=book_info["title"], language=language, author=author)
    
    def getFilter(self, publisher:str = "", year:str = "", language:str = "") -> dict :
        filter = {}
        if publisher != "" :
            filter["Publisher"] = publisher.title()
        if year != "" :
            filter["Year"] = year.title()
        if language != "" :
            filter["Language"] = language.title()
        return filter
    
    def resultfilter(self, searchResult:list) -> list :
        result = []
        libgen = LibgenSearch()
        for i in searchResult :
            tempdict = {}
            tempdict["Author"]     = i["Author"]
            tempdict["Title"]      = i["Title"]
            tempdict["Year"]       = i["Year"]
            tempdict["Language"]   = i["Language"]
            tempdict["Download-1"] = libgen.resolve_download_links(i)["GET"]
            tempdict["Download-2"] = i["Mirror_2"].replace("libgen.li/ads", "cdn3.booksdl.lc/get")
            result.append(tempdict)

        # 3 Download links "GET" is set, change if not work
        # GET
        # Cloudflare
        # IPFS.io

        return result


if __name__ == "__main__" :
    a = Books()
    r = a.searchISBN(9780733426094)
    print(r)

"""
    9780439362139 : Harry Potter and the Sorcerer's Stone
    9780525559474 : The Midnight Library
    9780765387561 : The Invisible Life of Addie LaRue
    9781984806734 : Beach Read
    https://cdn3.booksdl.lc/get.php?md5=
    https://libgen.li/ads.php?md5=3882D483B375869505B5268E0185D7B5
"""