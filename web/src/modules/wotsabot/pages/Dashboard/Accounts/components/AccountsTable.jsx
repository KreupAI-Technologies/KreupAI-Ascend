import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState, useEffect } from "react";
import { accountColumnDefs } from "../../../../data/AccountsData";
import AccountsActionBar from "./AccountsActionBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountsTable = () => {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsResponse = await axios.get("http://localhost:5002/api/accounts");
        setRowData(accountsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = (newAccount) => {
    setRowData((prevData) => [...prevData, newAccount]);
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  }, []);

  const handleRowClick = (e) => {
    const accountId = e.data._id;
    navigate(`../${accountId}`);
  };

  return (
    <div>
      <div>
        <AccountsActionBar onFormSubmit={handleFormSubmit} />
      </div>
      <div className="m-4">
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={accountColumnDefs}
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

export default AccountsTable;
