import React, { useRef } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const PDFGenerator = () => {
  const pdfRef = useRef();

  const handleDownload = () => {
    pdfRef.current.updateContainer();
    pdfRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.pdf";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <PDFViewer ref={pdfRef} style={{ width: "100%", height: "500px" }}>
        <PDFDocument />
      </PDFViewer>
      <button onClick={handleDownload}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerator;
