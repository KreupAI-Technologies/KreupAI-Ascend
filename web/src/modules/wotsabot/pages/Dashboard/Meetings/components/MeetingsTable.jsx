import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { meetingsData, meetingColumnDefs } from "../../../../data/MeetingsData";
import MeetingsActionBar from "./MeetingsActionBar";

const MeetingsTable = () => {
  const [rowData, setRowData] = useState(meetingsData);
  const [colDefs, setColDefs] = useState(meetingColumnDefs);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  }, []);

  return (
    <div>
      <div>
        <MeetingsActionBar />
      </div>
      <div className="m-4">
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20]}
            rowSelection={"multiple"}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingsTable;
