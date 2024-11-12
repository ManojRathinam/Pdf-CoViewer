import React, { useState } from 'react';
import PdfViewer from '../components/PDFViewer';
import useWebSocket from '../components/Socket';

const Home = () => {
  const [page, setPage] = useState(1);

  useWebSocket(setPage);

  return (
    <div>
      <h1>Real-Time PDF Viewer</h1>
      <PdfViewer page={page} setPage={setPage} />
    </div>
  );
};

export default Home;
