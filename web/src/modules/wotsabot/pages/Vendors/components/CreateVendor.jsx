import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorSchema } from "./vendorSchema"; // Import the vendor schema
import PropTypes from "prop-types";
import {
  CheckBoxField,
  NumberInputField,
  SelectField,
  TextAreaField,
  TextInputField,
} from "../../../../wotsabot/components/FormFields";
import { useNavigate } from "react-router-dom";
import ClapSpinner from "../../../../wotsabot/components/ui/ClapSpinner";
const CreateVendor = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingNew, setIsSavingNew] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vendorSchema),
  });

  const handleFormSubmit = async (data, event) => {
    const formattedData = {
      ...data,
      productId: data.productId ? data.productId : undefined, // Replace empty string with undefined
      unitPrice: Number(data.unitPrice),
    };
    event.preventDefault();
    const actionType = event.nativeEvent.submitter.name;

    if (actionType === "save") {
      setIsSaving(true);
    } else if (actionType === "saveAndNew") {
      setIsSavingNew(true);
    }
    try {
      // Send data to server
      const response = await axios.post(
        "http://localhost:3000/api/vendors",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 201) {
        console.log("Data successfully saved:", response.data);
        if (actionType === "saveAndNew") reset();
      } else {
        throw new Error(response.data.message || "Email already exists.");
      }

    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    } finally {
      setIsSaving(false);
      setIsSavingNew(false);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="pt-20"
      >
        <div className="overflow-y-auto max-h-[540px] p-4">
          <div className="absolute top-4 left-0 right-0 flex justify-between items-center shadow-md mb-24 p-4 bg-white">
            <h2 className="text-xl font-semibold">Create Vendor</h2>
            <div className="w-[30%] flex items-center justify-center gap-4">
              <button
                type="button"
                className="w-1/2 bg-gray-100 shadow-md py-2 px-3 rounded-lg border border-gray-300 hover:border-blue-400 disabled:opacity-80"
                onClick={() => navigate(-1)} // Navigate to the previous page
                disabled={isSaving || isSavingNew}
              >
                Cancel
              </button>
              <button
                type="submit"
                name="save"
                className="w-1/2 flex items-center shadow-md justify-center bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 active:bg-blue-800 disabled:opacity-80"
                disabled={isSaving || isSavingNew}
              >
                {isSaving ? <ClapSpinner /> : "Save"}
              </button>
              <button
                type="submit"
                name="saveAndNew"
                className="w-full flex items-center shadow-md justify-center bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 active:bg-blue-800 disabled:opacity-80"
                disabled={isSaving || isSavingNew}
              >
                {isSavingNew ? <ClapSpinner /> : "Save and New"}
              </button>
            </div>
          </div>
          {/* Vendor Image Section */}
          <div className="mt-8 ml-2 space-y-4">
            <h2 className="text-lg font-medium">Vendor Image</h2>
            <div className="flex flex-col space-y-4">
              <div className="w-24 h-24 border rounded-full flex items-center justify-center bg-gray-100">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="ml-2 mb-4 mr-4 mt-8">
            <h3 className="text-lg font-semibold mb-6">Vendor Information</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <SelectField
                name="vendorOwner"
                register={register}
                label="Vendor Owner"
                placeholder="Select Vendor Owner"
                options={["Sabu John Bosco", "Owner2", "Owner3"]}
                errors={errors}
              />
              <TextInputField
                name="vendorName"
                register={register}
                label="Vendor Name"
                placeholder="Vendor Name"
                errors={errors}
              />
              <TextInputField
                name="phone"
                register={register}
                label="Phone"
                placeholder="Phone"
                errors={errors}
              />
              <TextInputField
                name="email"
                register={register}
                label="Email"
                placeholder="Email"
                errors={errors}
              />
              <TextInputField
                name="website"
                register={register}
                label="Website"
                placeholder="Website"
                errors={errors}
              />
              <SelectField
                name="category"
                register={register}
                label="Category"
                placeholder="Select Category"
                options={["Category1", "Category2", "Category3"]}
                errors={errors}
              />
              <SelectField
                name="GLAccount"
                register={register}
                label="GL Account"
                placeholder="Select GL Account"
                options={[
                  "Sales-Software",
                  "Sales-Hardware",
                  "Rental Income",
                  "Interest Income",
                  "Sales Software Support",
                  "Sales Other",
                  "Interest Sales",
                ]}
                errors={errors}
              />
              <div className="flex items-center">
                <CheckBoxField
                  name="emailOptOut"
                  register={register}
                  label="Email Opt Out"
                  errors={errors}
                />
              </div>
            </div>
          </div>
          <div className="ml-2 mb-4 mr-4 mt-8">
            <h3 className="text-lg font-semibold mb-6">Address Information</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <TextInputField
                name="address.street"
                register={register}
                label="Street"
                placeholder="Street"
                errors={errors}
              />
              <TextInputField
                name="address.city"
                register={register}
                label="City"
                placeholder="City"
                errors={errors}
              />
              <TextInputField
                name="address.state"
                register={register}
                label="State"
                placeholder="State"
                errors={errors}
              />
              <TextInputField
                name="address.zipCode"
                register={register}
                label="Zip Code"
                placeholder="Zip Code"
                errors={errors}
              />
              <SelectField
                name="address.country"
                register={register}
                label="Country"
                placeholder="Select Country"
                options={["USA", "Canada", "UK"]}
                errors={errors}
              />
            </div>
          </div>
          {/*contact information */}
          <div className="ml-2 mb-4 mr-4 mt-8">
            <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <TextInputField
                name="contactInformation.contactPerson"
                register={register}
                label="Contact Person"
                placeholder="Contact Person"
                errors={errors}
              />
              <TextInputField
                name="contactInformation.contactPhone"
                register={register}
                label="Phone"
                placeholder="Phone"
                errors={errors}
              />
              <TextInputField
                name="contactInformation.contactEmail"
                register={register}
                label="Email"
                placeholder="Email"
                errors={errors}
              />
            </div>
          </div>
          {/* Product Information */}
          <div className="ml-2 mb-4 mr-4 mt-8">
            <h3 className="text-lg font-semibold mb-6">Product Supplied</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <TextInputField
                name="productsSupplied.productId"
                register={register}
                label="Product ID"
                placeholder="Product ID"
                errors={errors}
              />
              <TextInputField
                name="productsSupplied.productName"
                register={register}
                label="Product Name"
                placeholder="Product Name"
                errors={errors}
              />
              <NumberInputField
                name="productsSupplied.unitPrice"
                register={register}
                defaultValue={100}
                label="Unit Price"
                placeholder="Unit Price"
                errors={errors}
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="ml-2 mb-4 mr-4 mt-8">
            <h3 className="text-lg font-semibold mb-6">Payment Information</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <SelectField
                name="paymentMethods.methodName"
                register={register}
                label="Method Name"
                placeholder="Payment Method"
                options={[
                  "Bank Transfer",
                  "Credit Card",
                  "Check",
                  "Cash",
                  "PayPal",
                  "Mobile Payment ",
                  "Cryptocurrency ",
                  "Direct Debit",
                  "Money Order",
                  "Vendor-Specific Payment Portal",
                ]}
                errors={errors}
              />
              <TextInputField
                name="paymentMethods.accountDetails.bankName"
                register={register}
                label="Bank Name"
                placeholder="Bank Name"
                errors={errors}
              />
              <TextInputField
                name="paymentMethods.accountDetails.accountNumber"
                register={register}
                label="Account Number"
                placeholder="Account Number"
                errors={errors}
              />
              <TextInputField
                name="paymentMethods.accountDetails.routingNumber"
                register={register}
                label="Routing Number"
                placeholder="Routing Number"
                errors={errors}
              />
              <SelectField
                name="paymentMethods.accountDetails.currency"
                register={register}
                label="Currency"
                placeholder="Select Currency"
                options={["USD", "EUR", "GBP"]}
                errors={errors}
              />
              <SelectField
                name="status"
                register={register}
                label="Status"
                placeholder="Select Status"
                options={["Active", "Inactive"]}
                errors={errors}
              />
              <TextAreaField
                name="paymentTerms"
                register={register}
                label="Payment Terms"
                placeholder="Enter Payment Terms"
                errors={errors}
              />
            </div>
          </div>

          {/* Created By Section */}
          <div className="ml-2 mb-4 mr-4 mt-8">
            <h3 className="text-lg font-semibold mb-6">Created By</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <TextInputField
                name="createdBy.userId"
                register={register}
                label="User ID"
                placeholder="User ID"
                errors={errors}
              />
              <TextInputField
                name="createdBy.username"
                register={register}
                label="Username"
                placeholder="Username"
                errors={errors}
              />
            </div>
          </div>
          <div className=" ml-2 mr-4 mt-16">
            <h3 className="text-lg font-semibold mb-6">
              Description Information
            </h3>
            <TextAreaField
              name="description"
              register={register}
              label="Description"
              placeholder="Description"
              errors={errors}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

CreateVendor.propTypes = {
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CreateVendor;
