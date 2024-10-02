import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const Import = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if file is uploaded successfully
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    navigate('/pricebook'); // Navigate to the previous page
  };

  const handleNextClick = () => {
    // Navigate to the excel-importer page with fileData
    navigate('/excel-importer', { state: { fileData } });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = (file) => {
    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (fileType.includes('csv')) {
        Papa.parse(event.target.result, {
          header: true,
          complete: (result) => {
            setFileData(result.data);
            setSuccessMessage(`File "${file.name}" uploaded successfully!`);
            setIsFileUploaded(true); // Set file as uploaded
            console.log('File uploaded and parsed successfully:', result.data);
          },
          error: (error) => {
            console.error('CSV Parsing Error:', error);
          }
        });
      } else if (fileType.includes('sheet') || fileType.includes('excel')) {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setFileData(jsonData);
        setSuccessMessage(`File "${file.name}" has been uploaded successfully!`);
        setIsFileUploaded(true); // Set file as uploaded
        console.log('File uploaded and parsed successfully:', jsonData);
      } else {
        alert('Unsupported file type');
      }
    };

    if (fileType.includes('csv')) {
      reader.readAsText(file);
    } else if (fileType.includes('sheet') || fileType.includes('excel')) {
      reader.readAsBinaryString(file);
    }
  };

  const cardClass = (card) =>
    selectedCard === card
      ? 'border-blue-500 shadow-blue-500/50 border-2'
      : 'border-gray-300';

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gray-50"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Cards Section */}
      <div className="bg-white rounded-lg p-6 max-w-4xl flex justify-between space-x-6">
        {/* From File Card */}
        <div
          className={`flex-1 ${cardClass('file')} border rounded-lg p-6 cursor-pointer`}
          onClick={() => handleCardSelect('file')}
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12l9 5-9 5-9-5 9-5zm0 0l9-5-9-5-9 5 9 5zm0 0v10"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold">From File</h2>
          </div>
          {successMessage ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-800 text-lg">{successMessage}</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-center text-gray-600 mb-4">Drag and drop your file here.</p>
              <p className="text-center text-gray-600 mb-4">- or -</p>
              <div className="flex items-center justify-center mb-8">
                <button
                  onClick={handleBrowseClick}
                  className="bg-blue-500 shadow-lg text-white px-4 py-2 rounded-md"
                >
                  Browse
                </button>
              </div>
              <p className="text-gray-500 text-center text-sm mb-16">
                Download sample file{' '}
                <a
                  href="/path-to-sample-file.csv"
                  download="sample.csv"
                  className="text-blue-500 no-underline hover:underline"
                >
                  CSV
                </a>{' '}
                or{' '}
                <a
                  href="/path-to-sample-file.xlsx"
                  download="sample.xlsx"
                  className="text-blue-500 no-underline hover:underline"
                >
                  XLSX
                </a>
              </p>
              <p className="text-gray-500 text-center text-sm">
                You can import up to 5000 records through an .xls, .xlsx, .vcf, or .csv file. To import more
                than 5000 records at a time, use a .csv file.
              </p>
              <input
                type="file"
                accept=".csv, .xlsx"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
            </>
          )}
        </div>

        <div className="flex items-center text-gray-400">or</div>

        {/* From Other CRMs Card */}
        <div
          className={`flex-1 ${cardClass('crm')} border rounded-lg p-6 cursor-pointer flex flex-col justify-center`}
          onClick={() => handleCardSelect('crm')}
        >
          <div>
            <div className="flex space-x-2 mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16v4h-10v-4h10zm-5-12v10m8-8h-16v10h16v-10z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-left">From Other CRMs</h2>
            </div>

            <div className="flex flex-col justify-center py-16 items-center flex-grow">
              <p className="text-blue-500 text-center no-underline hover:underline text-sm cursor-pointer mb-4">
                Which CRM are you coming from?
              </p>
              <button className="bg-blue-500 shadow-lg text-white px-4 py-2 rounded-md">
                Import from Other CRMs
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-centertext-sm "> Choose from your favorite CRM and use our native integrations to import data. </p> 
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-100 shadow-md text-gray-600 px-4 py-2 rounded-md mr-4"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            !isFileUploaded ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleNextClick}
          disabled={!isFileUploaded} // Disable if file is not uploaded
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Import;
