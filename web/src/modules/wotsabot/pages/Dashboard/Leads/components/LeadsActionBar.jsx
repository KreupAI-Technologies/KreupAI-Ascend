import AllAccountsDropdown from "../../../../components/ui/dropdown/AllAccountsDropdown";
import ArrowDropdown from "../../../../components/ui/dropdown/ArrowDropdown";
import LinesDropdown from "../../../../components/ui/dropdown/LinesDropdown";
import LeadsForm from "./LeadsForm";
import { useState } from "react";
import Modal from "../../../../components/ui/Modal";
import ActionsDropdown from "../../../../components/ui/dropdown/ActionsDropdown";
import AllDropdown from "../../../../components/ui/dropdown/AllDropdown";
import PropTypes from 'prop-types'

const LeadsActionBar = ({ onFormSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const accountOptions = [
    "All Leads",
    "All Locked Leads",
    "Converted Leads",
    "Junk Leads",
  ];

  const actionOptions = [
    "Mass Delete",
    "Mass Update",
    "Mass Convert",
    "Manage Tags",
    "Drafts",
    "Mass Email",
    "Autoresponders",
    "Approve Leads",
    "Deduplicate Leads",
    "Add to Campaigns",
    "Create Client Script✨",
    "Export Leads",
  ];

  const linesOptions = ["Option 1", "Option 2", "Option 3"];
  const allOptions = ["Option 1", "Option 2", "Option 3"];
  const arrowOptions = ["Option 1", "Option 2", "Option 3"];


  return (
    <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-3 -ml-6">
        <div></div>
        <div>
          <AllAccountsDropdown
            options={accountOptions}
            placeholder="All Leads"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Calculate Select */}
        <div>
          <LinesDropdown
            options={linesOptions}
            placeholderImage="/icons/options.svg"
          />
        </div>
        {/* Create Lead Button */}
        <div>
          <div className="flex items-center space-x-[3px]">
            {/* Create Lead Button */}
            <div>
              <button
                type="button"
                className="text-sm text-white px-4 py-1.5 rounded-l-md bg-blue-500 hover:bg-blue-500 transition-colors duration-150 w-full"
                onClick={openModal}
              >
                Create Lead
              </button>
            </div>
            <div>
              <ArrowDropdown options={arrowOptions} />
            </div>
          </div>
        </div>
        <div>
          <ActionsDropdown options={actionOptions} placeholder="Actions" />
        </div>
        <div>
          <AllDropdown options={allOptions} placeholder="All" />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Create Account"
      >
        <LeadsForm closeModal={closeModal} onSubmit={onFormSubmit} />
      </Modal>
    </div>
  );
};

LeadsActionBar.propTypes = {
  onFormSubmit: PropTypes.func,
};

export default LeadsActionBar;
