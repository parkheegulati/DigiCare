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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#191919] p-6 text-left text-[#37352f] dark:text-[#e3e3e3] font-sans pt-14">
      <div className="bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-[#37352f] dark:text-[#e3e3e3]">Upload PDF</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f]"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full p-2 border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] rounded-md text-xs"
          />
          <button
            type="submit"
            className="w-full bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919] py-2 rounded-md text-xs font-medium transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Display uploaded reports */}
      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-sm font-bold mb-3 text-[#37352f] dark:text-[#e3e3e3]">Uploaded Reports</h3>
        {uploadedReports.length > 0 ? (
          <ul className="space-y-2">
            {uploadedReports.map((report, index) => (
              <li key={index} className="bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] p-3 rounded-md flex justify-between items-center text-xs">
                <span className="font-medium text-[#37352f] dark:text-[#e3e3e3]">{report.name}</span>
                <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-[#2383e2] hover:underline font-medium">
                  View PDF
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[#787774] dark:text-[#9b9b9b]">No reports uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
