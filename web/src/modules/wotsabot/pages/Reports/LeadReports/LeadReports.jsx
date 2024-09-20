// import { useMemo, useState } from "react";
// import axios from "axios"; // For making API requests
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import Sidebar from "../Sidebar";
// import SearchBar from "../SearchBar";

// const LeadReports = () => {
//   const [rowData, setRowData] = useState([
//     {
//       report_name: "Today's Leads",
//       description: "Leads obtained today",
//       filter: { dateCreated: new Date().toISOString().split("T")[0] }, // Example filter for today's leads
//     },
//     {
//       report_name: "Leads by Status",
//       description: "Leads and their statuses",
//       filter: { status: "Open" }, // Example filter for leads by status
//     },
//     {
//       report_name: "Leads by Source",
//       description: "Leads from various sources",
//       filter: { source: "Website" }, // Example filter for leads by source
//     },
//     {
//       report_name: "Leads by Ownership",
//       description: "Leads by Owner",
//       filter: { owner: "John Doe" }, // Example filter for leads by owner
//     },
//     {
//       report_name: "Leads by Industry",
//       description: "Leads by industry",
//       filter: { industry: "Technology" }, // Example filter for leads by industry
//     },
//     {
//       report_name: "Converted Leads",
//       description: "Leads converted to Account/Deal/Contact",
//       filter: { isConverted: true }, // Example filter for converted leads
//     },
//   ]);

//   const [columnDefs] = useState([
//     {
//       field: "report_name",
//       headerName: "Report Name",
//       headerCheckboxSelection: true,
//       checkboxSelection: true,
//       flex: 1,
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       flex: 2,
//     },
//   ]);

//   const defaultColDef = useMemo(() => {
//     return {
//       filter: true,
//     };
//   }, []);

//   // Function to fetch filtered leads from the backend
//   const fetchLeads = async (filter) => {
//     try {
//       const queryParams = new URLSearchParams(filter).toString();
//       // Replace /api/leads with your actual backend API endpoint
//       console.log("Query Params:", queryParams); // Log the query string being sent to the backend
//       const response = await axios.get(`http://localhost:3000/leads?${queryParams}`);
//       console.log("Filtered Leads:", response.data); // For debugging, to view the fetched data
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//     }
//   };

//   // Handle row selection to fetch leads based on the selected report
//   const handleRowSelection = (event) => {
//     const selectedReport = event.api.getSelectedRows()[0]; // Get the first selected row
//     if (selectedReport && selectedReport.filter) {
//       fetchLeads(selectedReport.filter); // Fetch leads based on the filter for that report
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />
//       {/* Main Content */}
//       <div className="w-full m-16">
//         <div className="flex justify-end mb-6">
//           <SearchBar />
//         </div>

//         {/* Reports Table */}
//         <div className="ag-theme-quartz mb-6" style={{ height: "200px" }}>
//           <AgGridReact
//             rowData={rowData}
//             columnDefs={columnDefs}
//             rowSelection={"single"}
//             domLayout="autoHeight"
//             defaultColDef={defaultColDef}
//             onSelectionChanged={handleRowSelection} // Handle row selection
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadReports;



import { useMemo, useState } from "react";
import axios from "axios"; // For making API requests
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const LeadReports = () => {
  const [rowData, setRowData] = useState([
    {
      report_name: "Today's Leads",
      description: "Leads obtained today",
      filter: { dateCreated: new Date().toISOString().split("T")[0] }, // Example filter for today's leads
    },
    {
      report_name: "Leads by Status",
      description: "Leads and their statuses",
      filter: { status: "Open" }, // Example filter for leads by status
    },
    {
      report_name: "Leads by Source",
      description: "Leads from various sources",
      filter: { source: "Website" }, // Example filter for leads by source
    },
    {
      report_name: "Leads by Ownership",
      description: "Leads by Owner",
      filter: { owner: "John Doe" }, // Example filter for leads by owner
    },
    {
      report_name: "Leads by Industry",
      description: "Leads by industry",
      filter: { industry: "Technology" }, // Example filter for leads by industry
    },
    {
      report_name: "Converted Leads",
      description: "Leads converted to Account/Deal/Contact",
      filter: { isConverted: true }, // Example filter for converted leads
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

  // Function to fetch filtered leads from the backend
  const fetchLeads = async (filter) => {
    try {
      const queryParams = new URLSearchParams(filter).toString();
      console.log("Query Params:", queryParams); // Log the query string being sent to the backend
      const response = await axios.get(`http://localhost:3000/leads?${queryParams}`);
      console.log("Filtered Leads:", response.data); // For debugging, to view the fetched data
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  // Handle row selection to fetch leads based on the selected report
  const handleRowSelection = (event) => {
    const selectedReport = event.api.getSelectedRows()[0]; // Get the first selected row
    if (selectedReport && selectedReport.filter) {
      fetchLeads(selectedReport.filter); // Fetch leads based on the filter for that report
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
            <h1 className="text-3xl font-bold mt-8">Leads Reports</h1>
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

export default LeadReports;
