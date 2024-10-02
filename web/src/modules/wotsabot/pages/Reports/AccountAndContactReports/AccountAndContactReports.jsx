import { useMemo, useState } from "react";
import axios from "axios"; // For making API requests
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const AccountAndContactReports = () => {
  const [rowData, setRowData] = useState([
    {
      report_name: "Key Accounts",
      description: "Account with More Deals",
      filter: { dateCreated: new Date().toISOString().split("T")[0] },
    },
    {
      report_name: "Contact Mailing List",
      description: "Contact Address Details",
      filter: { status: "Open" },
    },
    {
      report_name: "Account by Industry",
      description: "Accounts by Industry",
      filter: { source: "Website" },
    },
    {
      report_name: "Account Details",
      description: "Account detailing",
      filter: { owner: "John Doe" },
    },
    {
      report_name: "Sales Cycle Duration Source",
      description: "Lead by industry",
      filter: { industry: "Technology" },
    },
    {
      report_name: "Sales Cycle Duration industry",
      description: "Lead converted to Account/Deal/Contact",
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
      cellClass: "text-blue-500 font-bold",
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

  // Function to fetch filtered leads from the backend
  const fetchAccounts = async (filter) => {
    try {
      const queryParams = new URLSearchParams(filter).toString();
      console.log("Query Params:", queryParams); // Log the query string being sent to the backend
      const response = await axios.get(`http://localhost:3000/accounts?${queryParams}`);
      console.log("Filtered Accounts:", response.data); // For debugging, to view the fetched data
    } catch (error) {
      console.error("Error fetching Accounts:", error);
    }
  };

  // Handle row selection to fetch accounts and contacts based on the selected report
  const handleRowSelection = (event) => {
    const selectedReport = event.api.getSelectedRows()[0]; // Get the first selected row
    if (selectedReport && selectedReport.filter) {
      fetchAccounts(selectedReport.filter); // Fetch leads based on the filter for that report
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mt-32">
          {/* Header and Search Bar */}
          <div className="flex justify-between items-center mb-6 pl-16 mr-16">
            <h1 className="text-3xl font-bold mt-8">Account and Contact Report</h1>
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
              onSelectionChanged={handleRowSelection} // Handle row selection
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAndContactReports;
