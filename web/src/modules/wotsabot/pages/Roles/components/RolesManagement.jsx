import { Button } from "@/components/ui/button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import { roleColumnDefs } from "@/modules/wotsabot/data/RolesData";
import Modal from "@/modules/wotsabot/components/ui/Modal";
import RolesForm from "./RolesForm";
import axios from "axios";

const RolesManagement = () => {
  const [rowData, setRowData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/roles"); // Update the URL as needed
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/roles", data); // Update the URL as needed
      const newRole = response.data;
      const newData = [...rowData, newRole];
      setRowData(newData);
      closeModal();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  return (
    <div>
      <div className="bg-white p-8 m-4 rounded-lg shadow-md">
        <h1 className="font-bold text-xl">Roles</h1>
        <p className="font-medium text-sm text-gray-500 ">Manage the roles</p>
        <div className="mt-4">
          <Button onClick={openModal}>Add Role</Button>
        </div>
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          title="Create Account"
        >
          <RolesForm closeModal={closeModal} onSubmit={handleFormSubmit} />
        </Modal>
        <div className="mt-6">
          <div className="ag-theme-quartz">
            <AgGridReact
              rowData={rowData}
              columnDefs={roleColumnDefs}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesManagement;
