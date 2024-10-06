import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { leadsData, leadColumnDefs } from "../../../../data/LeadsData";
import LeadsActionBar from "./LeadsActionBar";
import { useNavigate } from "react-router-dom";

const LeadsTable = () => {
  const [rowData, setRowData] = useState(() => {
    const savedData = localStorage.getItem("userInfo");
    return savedData ? JSON.parse(savedData) : leadsData;
  });

  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    const newData = [...rowData, data];
    setRowData(newData);
    localStorage.setItem("userInfo", JSON.stringify(newData));
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  }, []);

  const handleRowClick = (e) => {
    const leadId = e.data.id;
    navigate(`../${leadId}`);
  }

  return (
    <div>
      <div>
      <LeadsActionBar onFormSubmit={handleFormSubmit}/>
      </div>
      <div className="m-4">
        <div className="ag-theme-quartz " style={{ height: 500}}>
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