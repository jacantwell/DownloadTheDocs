import React, { useState } from 'react';
import axios from 'axios';

const PdfDownloader: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const handleDownload = async () => {
    try {
      const response = await axios({
        url: url+"/download-pdf",
        method: 'GET',
        responseType: 'blob', // important
      });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      setDownloadUrl(fileURL);
    } catch (error) {
      console.error('Error fetching the PDF:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">PDF Downloader</h1>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors"
        >
          Download PDF
        </button>
        {downloadUrl && (
          <a
            href={downloadUrl}
            download="downloaded-file.pdf"
            className="block mt-4 bg-green-500 text-white p-2 rounded text-center hover:bg-green-600 transition-colors"
          >
            Click here to download your PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default PdfDownloader;
