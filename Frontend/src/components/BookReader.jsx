import React, { useEffect, useState, useRef } from "react";
import ePub from "epubjs";
import axios from "axios";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BookReader = ({ fileUrl, fileType }) => {
  const [arrayBuffer, setArrayBuffer] = useState(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fetch-file?url=${encodeURIComponent(fileUrl)}`, {
          responseType: "arraybuffer",
        });

        setArrayBuffer(response.data);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, [fileUrl]);

  if (!arrayBuffer) return <p>Loading...</p>;

  return (
    <div>
      {fileType === "epub" ? (
        <div ref={viewerRef} style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}>
          <EpubViewer file={arrayBuffer} />
        </div>
      ) : fileType === "pdf" ? (
        <Document file={{ data: arrayBuffer }}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Unsupported file type</p>
      )}
    </div>
  );
};

// EPUB Viewer Component
const EpubViewer = ({ file }) => {
  const renditionRef = useRef(null);

  useEffect(() => {
    const book = ePub(file);
    const rendition = book.renderTo("epub-viewer", { width: "100%", height: "600px" });
    rendition.display();
    renditionRef.current = rendition;

    rendition.on("rendered", () => {
      console.log("EPUB file rendered successfully");
    });

    rendition.on("error", (error) => {
      console.error("Error rendering EPUB file:", error);
    });

    return () => {
      rendition.destroy();
    };
  }, [file]);

  const handleNextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };

  const handlePrevPage = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };

  return (
    <div>
      <div id="epub-viewer"></div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button onClick={handlePrevPage} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BookReader;