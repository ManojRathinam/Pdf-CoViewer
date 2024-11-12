// components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Include credentials in the request
      });

      setUploadStatus(response.data.message || 'File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Upload;
