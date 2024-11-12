import React, { useEffect, useState, useContext } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';
import usePdfSocket from './Socket';
import { AuthContext } from '../context/AuthContext';

const PdfViewer = ({ page, setPage }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-latest-pdf/');
        setPdfUrl(response.data.pdf_url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };
    fetchPdf();
  }, []);

  usePdfSocket((data) => {
    setPage(data.page);
  });

  const handlePageChange = async (newPage) => {
    if (user?.isAdmin) {
      setPage(newPage);
      await axios.post('http://127.0.0.1:8000/api/update-page/', { page: newPage });
    }
  };

  return (
    <div style={{ height: '600px' }}>
      {pdfUrl ? (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl={pdfUrl}
            initialPage={page}
            onPageChange={(e) => handlePageChange(e.currentPage + 1)}
          />
        </Worker>
      ) : (
        <p>No PDF available</p>
      )}
    </div>
  );
};

export default PdfViewer;
