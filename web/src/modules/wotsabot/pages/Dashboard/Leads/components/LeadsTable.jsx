import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useMemo, useState } from "react";
import { leadColumnDefs } from "../../../../data/LeadsData";
import LeadsActionBar from "./LeadsActionBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LeadsTable = () => {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsResponse = await axios.get("http://localhost:5002/api/leads");
        setRowData(leadsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = (newLead) => {
    setRowData((prevData) => [...prevData, newLead]);
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  }, []);

  const handleRowClick = (e) => {
    const leadId = e.data._id;
    navigate(`../${leadId}`);
  };

  return (
    <div>
      <div>
        <LeadsActionBar onFormSubmit={handleFormSubmit} />
      </div>
      <div className="m-4">
        <div className="ag-theme-quartz " style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={leadColumnDefs}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20]}
            gridOptions={{
              selection: {
                mode: "multiRow", // replaces rowSelection: "multiple"
                headerCheckbox: true, // enables the header checkbox
                checkboxes: true, // enables the row checkboxes
              },
            }}
            defaultColDef={defaultColDef}
            onRowClicked={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsTable;
