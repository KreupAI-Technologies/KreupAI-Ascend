import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { callsData, callColumnDefs } from "../../../../data/CallsData";
import CallsActionBar from "./CallsActionBar";
import { useNavigate } from "react-router-dom";

const CallsTable = () => {
  const [rowData, setRowData] = useState(() => {
    const savedData = localStorage.getItem("userInfo");
    return savedData ? JSON.parse(savedData) : callsData;
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
    const callId = e.data.id;
    navigate(`calls/${callId}`);
  }

  return (
    <div>
      <div>
      <CallsActionBar onFormSubmit={handleFormSubmit}/>
      </div>
      <div className="m-4">
        <div className="ag-theme-quartz " style={{ height: 500}}>
          <AgGridReact
            rowData={rowData}
            columnDefs={callColumnDefs}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20]}
            rowSelection={"multiple"}
            defaultColDef={defaultColDef}
            onRowClicked={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CallsTable; 