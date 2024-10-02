import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./invoiceSchema";
import { FaUser, FaRegStickyNote, FaInfoCircle, FaAddressBook, FaBuilding, FaWallet } from "react-icons/fa";
import { TextInputField, SelectField } from "./FormFields";
import PropTypes from "prop-types";
import InvoiceItemsTable from './InvoiceItemsTable';
import TermsSection from "./TermsSection";

const InvoiceForm = ({ closeModal }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingNew, setIsSavingNew] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const inputData = event.nativeEvent.submitter.name;

    if (inputData === "save") {
      setIsSaving(true);
    } else if (inputData === "saveAndNew") {
      setIsSavingNew(true);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data saved:", data);

    setIsSaving(false);
    setIsSavingNew(false);

    if (inputData === "saveAndNew") {
      reset();
    } else {
      closeModal();
    }
  };

  return (
    <div className="relative bg-white p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-20">
        <div className="p-4">
          <div className="absolute shadow-md p-4 top-0 left-0 right-0 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">Create Invoice</h2>
              <a
                href="/some-link"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Edit Page Layout
              </a>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="bg-gray-100 text-black shadow-md py-2 px-4 rounded"
                onClick={closeModal}
                disabled={isSaving || isSavingNew}
              >
                Cancel
              </button>
              <button
                type="submit"
                name="saveAndNew"
                className="bg-gray-100 text-black shadow-md py-2 px-4 rounded"
                disabled={isSaving || isSavingNew}
              >
                {isSavingNew ? "Saving..." : "Save and New"}
              </button>
              <button
                type="submit"
                name="save"
                className="bg-blue-500 text-white shadow-md py-2 px-4 rounded"
                disabled={isSaving || isSavingNew}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold mb-3">Invoice Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="grid gap-4 pl-20">
                <SelectField
                  name="invoiceOwner"
                  control={control}
                  label="Invoice Owner"
                  placeholder="Select invoice Owner"
                  options={["Sabu John Bosco", "Owner2", "Owner3"]}
                  errors={errors}
                  icon={FaUser}
                />
                <TextInputField
                  name="Subject"
                  control={control}
                  label="Subject"
                  errors={errors}
                />
                <TextInputField
                  name="Invoicedate"
                  control={control}
                  label="Invoice Date"
                  errors={errors}
                  icon={FaRegStickyNote}
                />
                <TextInputField
                  name="duedate"
                  control={control}
                  label="Due Date"
                  placeholder="DD/MM/YYYY"
                  errors={errors}
                />
                <TextInputField
                  name="salescommission"
                  control={control}
                  label="Sales Commission"
                  errors={errors}
                  icon={FaInfoCircle}
                />
                <TextInputField
                  name="Accountname"
                  control={control}
                  label="Account Name"
                  errors={errors}
                  icon={FaBuilding}
                />
                <TextInputField
                  name="Contactname"
                  control={control}
                  label="Contact Name"
                  errors={errors}
                  icon={FaAddressBook}
                />
                <TextInputField
                  name="Dealname"
                  control={control}
                  label="Deal Name"
                  errors={errors}
                  icon={FaWallet}
                />
              </div>
              <div className="grid gap-4 pl-20 mb-64">
                <TextInputField
                  name="Salesorder"
                  control={control}
                  label="Sales Order"
                  errors={errors}
                />
                <TextInputField
                  name="Purchaseorder"
                  control={control}
                  label="Purchase Order"
                  errors={errors}
                />
                <TextInputField
                  name="exciseduty"
                  control={control}
                  label="Excise Duty"
                  errors={errors}
                  icon={FaInfoCircle}
                />
                <SelectField
                  name="status"
                  control={control}
                  label="Status"
                  placeholder="Select Status"
                  options={["Created", "Approved", "Delivered", "Cancelled"]}
                  errors={errors}
                />
                {/* Additional divs for adjust spacing */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold mt-8">Address Information</h3>
              <button
                type="button"
                className="bg-gray-100 text-black shadow-md py-2 px-4 rounded mt-10"
              >
                Copy Address
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="grid gap-4 pl-20">
                <TextInputField
                  name="billingStreet"
                  control={control}
                  label="Billing street"
                  errors={errors}
                />
                <TextInputField
                  name="billingCity"
                  control={control}
                  label="Billing City"
                  errors={errors}
                />
                <TextInputField
                  name="billingState"
                  control={control}
                  label="Billing State"
                  errors={errors}
                />
                <TextInputField
                  name="billingCode"
                  control={control}
                  label="Billing code"
                  errors={errors}
                />
                <TextInputField
                  name="billingCountry"
                  control={control}
                  label="Billing country"
                  errors={errors}
                />
              </div>
              <div className="grid gap-4 pl-20">
                <TextInputField
                  name="shippingStreet"
                  control={control}
                  label="Shipping street"
                  errors={errors}
                />
                <TextInputField
                  name="shippingCity"
                  control={control}
                  label="Shipping City"
                  errors={errors}
                />
                <TextInputField
                  name="shippingState"
                  control={control}
                  label="Shipping state"
                  errors={errors}
                />
                <TextInputField
                  name="shippingCode"
                  control={control}
                  label="Shipping Code"
                  errors={errors}
                />
                <TextInputField
                  name="shippingCountry"
                  control={control}
                  label="Shipping Country"
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </div>
        <InvoiceItemsTable />
        <TermsSection />
      </form>
    </div>
  ); 
};

InvoiceForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default InvoiceForm;
