// context/PdfContext.js
import React, { createContext, useState } from 'react';

export const PdfContext = createContext();

const PdfProvider = ({ children }) => {
  const [pdfFiles, setPdfFiles] = useState([]);

  const addPdfFile = (file) => {
    setPdfFiles([...pdfFiles, file]);
  };

  const removePdfFile = (fileName) => {
    setPdfFiles(pdfFiles.filter((file) => file.name !== fileName));
  };

  return (
    <PdfContext.Provider value={{ pdfFiles, addPdfFile, removePdfFile }}>
      {children}
    </PdfContext.Provider>
  );
};

export default PdfProvider;
