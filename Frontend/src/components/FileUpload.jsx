import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedReports, setUploadedReports] = useState([]);

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title); // add title to the formData if needed

    try {
      const response = await axios.post('/api/upload_report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('File uploaded successfully!');
      setTitle('');
      setFile(null);
      fetchReports(); // Refresh uploaded files list
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed.');
    }
  };

  // Fetch uploaded reports from Cloudinary
  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/get_reports');
      setUploadedReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Upload PDF</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Display uploaded reports */}
      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-2">Uploaded Reports</h3>
        {uploadedReports.length > 0 ? (
          <ul className="space-y-2">
            {uploadedReports.map((report, index) => (
              <li key={index} className="bg-white shadow p-2 rounded flex justify-between items-center">
                <span>{report.name}</span>
                <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View PDF
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
