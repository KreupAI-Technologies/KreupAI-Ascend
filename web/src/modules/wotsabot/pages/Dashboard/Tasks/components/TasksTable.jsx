import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { tasksData, taskColumnDefs } from "../../../../data/TasksData";
import TasksActionBar from "./TasksActionBar";
import { useNavigate } from "react-router-dom";

const TasksTable = () => {
  const [rowData, setRowData] = useState(() => {
    const savedData = localStorage.getItem("userInfo");
    return savedData ? JSON.parse(savedData) : tasksData;
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
    const taskId = e.data.id;
    navigate(`../${taskId}`);
  }

  return (
    <div>
      <div>
      <TasksActionBar onFormSubmit={handleFormSubmit}/>
      </div>
      <div className="m-4">
        <div className="ag-theme-quartz " style={{ height: 500}}>
          <AgGridReact
            rowData={rowData}
            columnDefs={taskColumnDefs}
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

export default TasksTable; 