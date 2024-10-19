import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useMemo, useState } from "react";
import { contactColumnDefs } from "../../../../data/ContactsData";
import ContactsActionBar from "./ContactsActionBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactsTable = () => {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsResponse = await axios.get("http://localhost:5002/api/contacts");
        setRowData(contactsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = (newContact) => {
    setRowData((prevData) => [...prevData, newContact]);
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  }, []);

  const handleRowClick = (event) => {
    const contactId = event.data._id; 
    navigate(`../${contactId}`);
  };

  return (
    <div>
      <div>
        <ContactsActionBar onFormSubmit={handleFormSubmit} />
      </div>
      <div className="m-4">
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={contactColumnDefs}
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

export default ContactsTable;
