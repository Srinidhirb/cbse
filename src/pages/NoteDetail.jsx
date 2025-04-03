import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
// Set the worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
const NoteDetail = () => {
  const { category, id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfText, setPdfText] = useState("Extracting text...");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/note/${category}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch note");
        const data = await response.json();
        setNote(data);
        if (data.files.length > 0) {
          const fileUrl = `http://localhost:5000/${data.files[0]}`;
          setPdfUrl(fileUrl);
          extractTextFromPDF(fileUrl);
        }
      } catch (err) {
        setError("Error fetching note details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [category, id]);

  const extractTextFromPDF = async (url) => {
    try {
      const pdf = await pdfjsLib.getDocument(url).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item) => item.str).join(" ") + "\n\n";
      }

      setPdfText(extractedText);
    } catch (error) {
      console.error("Error extracting PDF text:", error);
      setPdfText("Failed to extract text from PDF.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!note) return <p>No note found.</p>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <p className="mb-4">{note.description}</p>

      {/* YouTube Links */}
      <h2 className="text-2xl font-semibold mt-4">YouTube Links</h2>
      <ul className="list-disc pl-5">
        {note.youtubeLinks.map((link, index) => (
          <li key={index}>
            <a href={link.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {link.trim()}
            </a>
          </li>
        ))}
      </ul>

      {/* Uploaded Files */}
      <h2 className="text-2xl font-semibold mt-4">Attachments</h2>
      <ul className="list-disc pl-5">
        {note.files.map((file, index) => (
          <li key={index}>
            <a href={`http://localhost:5000/${file}`} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">
              {file.split("\\").pop()}
            </a>
          </li>
        ))}
      </ul>

      {/* Render PDF Viewer */}
      {pdfUrl && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">PDF Viewer</h2>
          <div className="border border-gray-300 w-full h-[600px]">
            <Worker workerUrl='{`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}'>
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          </div>
        </div>
      )}

      {/* Extracted PDF Text */}
      <h2 className="text-2xl font-semibold mt-4">Extracted PDF Content</h2>
      <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
        {pdfText}
      </div>
    </div>
  );
};

export default NoteDetail;
