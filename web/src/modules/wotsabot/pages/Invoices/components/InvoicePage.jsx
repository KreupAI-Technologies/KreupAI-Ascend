import { useState } from "react";
import InvoiceForm from "./InvoiceForm";

const InvoicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <InvoiceForm />
      {isModalOpen && (
        <div className="modal">
          <button onClick={closeModal}></button>
          <InvoiceForm closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
