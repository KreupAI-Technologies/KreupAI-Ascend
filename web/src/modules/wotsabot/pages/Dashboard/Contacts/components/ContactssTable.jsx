import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { contactsData, contactColumnDefs } from "../../../../data/ContatcsData";
import ContactsActionBar from "./ContactsActionBar";
import { useNavigate } from "react-router-dom";

const ContactsTable = () => {
  const [rowData, setRowData] = useState(contactsData);
  const [colDefs, setColDefs] = useState(contactColumnDefs);
  const navigate = useNavigate();

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  }, []);

  const handleRowClick = (event) => {
    const contactId = event.data.id; 
    navigate(`contacts/${contactId}`);
  };

  return (
    <div>
      <div>
        <ContactsActionBar />
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
            onRowClicked={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactsTable;
