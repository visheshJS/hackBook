from libgen_api import LibgenSearch

class Libgen() :
    def search(self, author:str = "", title:str = "", publisher:str = "", year:str = "", language:str = "") -> list:
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
    
    def getFilter(self, publisher:str = "", year:str = "", language:str = "") -> dict :
        filter = {}
        if publisher != "" :
            filter["Publisher"] = publisher
        if year != "" :
            filter["Year"] = year
        if language != "" :
            filter["Language"] = language
        return filter
    
    def resultfilter(self, searchResult:list) -> list :
        result = []
        libgen = LibgenSearch()
        tempdict = {
            "Author"    : "",
            "Title"     : "",
            "Year"      : "",
            "Language"  : "",
            "Download"  : ""
        }
        for i in searchResult :
            tempdict["Author"]   = i["Author"]
            tempdict["Title"]    = i["Title"]
            tempdict["Year"]     = i["Year"]
            tempdict["Language"] = i["Language"]
            tempdict["Download"] = libgen.resolve_download_links(i)["GET"]
            result.append(tempdict)

        # 3 Download links "GET" is set, change if not work
        # GET
        # Cloudflare
        # IPFS.io

        return result


if __name__ == "__main__" :
    a = Libgen()
    r = a.search(title="Harry Potter", language="English")
    for i in r :
        print(i)