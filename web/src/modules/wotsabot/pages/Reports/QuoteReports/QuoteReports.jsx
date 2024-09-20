import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const QuoteReportsTable = () => {
  const [rowData, setRowData] = useState([
    {
      report_name: "Quotes by Stage",
      description: "Quote Based on Stages",
    },
    {
      report_name: "Quotes by Accounts",
      description: "Quote Based on Accounts",
    },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "report_name",
      headerName: "Report Name",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 1,
      
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
      <div className="flex flex-col justify-center w-full m-16">
        <div className="flex justify-end mb-6">
          <SearchBar />
        </div>

        {/* Table */}

        <div className="ag-theme-quartz">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection={"multiple"}
            domLayout="autoHeight"
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteReportsTable;
