import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExcelImporter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileData = location.state?.fileData || [];

  const [mappedFields, setMappedFields] = useState({});
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);

  // Initialize mapping fields based on uploaded data
  const initializeMapping = (data) => {
    if (data.length === 0) return;
    const fields = Object.keys(data[0]);
    const initialMapping = fields.reduce((acc, field) => {
      acc[field] = ''; // Initially set all to empty
      return acc;
    }, {});
    setMappedFields(initialMapping);
  };

  // Handle field mapping changes
  const handleMappingChange = (field, selectedHeader) => {
    setMappedFields((prev) => ({
      ...prev,
      [field]: selectedHeader
    }));
  };

  // Generate column definitions for AG Grid based on mapping
  const generateColumnDefs = () => {
    const headers = Object.values(mappedFields).filter(header => header);
    return headers.map(header => ({
      headerName: header.charAt(0).toUpperCase() + header.slice(1),
      field: header,
      flex: 1 // Use flex to make column stretch
    }));
  };

  // Process data based on mapping and update AG Grid
  const processAndDisplayData = () => {
    const processedData = fileData.map(row => {
      const newRow = {};
      Object.keys(mappedFields).forEach(excelField => {
        const agGridField = mappedFields[excelField];
        if (agGridField) {
          newRow[agGridField] = row[excelField] !== undefined ? row[excelField] : ''; // Handle missing values
        }
      });
      return newRow;
    });
    setRowData(processedData);
    setColumnDefs(generateColumnDefs());
  };

  // Initialize mapping when file data is set
  React.useEffect(() => {
    initializeMapping(fileData);
  }, [fileData]);

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <button
        onClick={() => navigate('/import')} // Navigate back to Import component
        className="bg-transparent text-gray-700 px-4 py-2 rounded-md mb-4 flex items-center"
      >
        <AiOutlineArrowLeft className="h-5 w-5 mr-2" /> {/* Arrow icon with size and margin */}
        Back to Import
      </button>

      {/* Mapping section */}
      <div className="p-4 bg-gray-100 w-64 shadow-md rounded-md mb-4">
        {Object.keys(mappedFields).map(field => (
          <div key={field} className="mb-2">
            <label className="block text-gray-700">{field}:</label>
            <select
              value={mappedFields[field]}
              onChange={(e) => handleMappingChange(field, e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Field to Import</option>
              {Object.keys(fileData[0] || {}).map(header => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={processAndDisplayData}
          className="bg-blue-500 shadow-md mt-2 text-white px-4 py-2 rounded-md"
        >
          Import Data
        </button>
      </div>

      {/* AG Grid */}
      <div className="ag-grid-container" style={{ height: 'calc(100% - 48px)', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination
        />
      </div>
    </div>
  );
};

export default ExcelImporter;
