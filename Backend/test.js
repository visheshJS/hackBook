import express from "express";
import cors from "cors";
import libgen from "libgen";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


  
// test.js (Backend)
app.get("/search", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }
  
      const mirror = await libgen.mirror();
      const options = {
        mirror: mirror,
        query: query,
        count: 5,
        sort_by: "year",
        reverse: true,
      };
  
      const books = await libgen.search(options);
  
      // Add download/read links based on MD5 hash
      books.forEach((book) => {
        if (book.md5) {
          book.url = `http://libgen.rs/get.php?md5=${book.md5}`; // Example Libgen URL for EPUB files
        }
      });
      
  
      res.json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
