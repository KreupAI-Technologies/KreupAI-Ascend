import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const DealReports = () => {
  const [rowData, setRowData] = useState([
    {
      report_name: "Today's Sales",
      description: "Today's Sales",
      filter: { dateCreated: new Date().toISOString().split("T")[0] },
    },
    {
      report_name: "Stage Vs Deal Type Report",
      description: "Summarizes the various stages of New and Existing Business",
      filter: { status: "Open" },
    },
    {
      report_name: "Salesperson's Performance Report",
      description: "Deals gained by SalesPerson",
      filter: { source: "Website" },
    },
    {
      report_name: "Sales By Lead Source",
      description: "Sales gained from various lead sources",
      filter: { status: "Open" },
    },
    {
      report_name: "Sales This Month",
      description: "This Month's Sales",
      filter: { source: "Website" },
    },
    {
      report_name: "Pipeline By Stage",
      description: "Deals by Stage",
      filter: { owner: "John Doe" },
    },
    {
      report_name: "Pipeline By Probabiltiy",
      description: "Deals by Probability",
      filter: { industry: "Technology" },
    },
    {
      report_name: "Open Deals",
      description: "Deals Pending",
      filter: { isConverted: true },
    },
    {
      report_name: "Lost Deals",
      description: "Deals Lost",
      filter: { isConverted: true },
    },
    {
      report_name: "Deals By Type",
      description: "Deals by Type",
      filter: { isConverted: true },
    },
    {
      report_name: "Deals Closing this Month",
      description: "Deals closing this Month",
      filter: { isConverted: true },
    },
  ]);

  const [columnDefs] = useState([
    {
      field: "report_name",
      headerName: "Report Name",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 2,
      cellClass: "text-blue-500 font-bold", // Tailwind CSS classes for blue and bold text
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mt-32">
          {/* Header and Search Bar */}
          <div className="flex justify-between items-center mb-6 pl-16 mr-16">
            <h1 className="text-3xl font-bold mt-8">Deal Reports</h1>
            {/* Search Bar */}
            <SearchBar />

          </div>

          {/* Reports Table */}
          <div className="ag-theme-quartz pl-16 mb-4 mr-16">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={"single"}
              domLayout="autoHeight"
              defaultColDef={defaultColDef}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealReports;