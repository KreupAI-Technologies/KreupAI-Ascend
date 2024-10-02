import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./leadSchema";
import PropTypes from "prop-types";
import {
  CheckBoxField,
  SelectField,
  TextAreaField,
  TextInputField,
} from "../../../../components/FormFields";
import ClapSpinner from "../../../../components/ui/ClapSpinner";

const LeadsForm = ({ closeModal, onSubmit }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingNew, setIsSavingNew] = useState(false);

  const defaultValues = {
    leadImage: "",
    leadOwner: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mobile: "",
    title: "",
    leadSource: null,
    industry: null,
    annualRevenue: "",
    emailOptOut: false,
    company: "",
    fax: "",
    website: "",
    leadStatus: null,
    numberOfEmployees: null,
    rating: null,
    skypeId: "",
    secondaryEmail: "",
    twitter: "",
    description: "",
    address: {
      street: "",
      city: null,
      state: null,
      zipCode: "",
      country: null,
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    const actionType = event.nativeEvent.submitter.name;

    if (actionType === "save") {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
    } else if (actionType === "saveAndNew") {
      setIsSavingNew(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
    }

    console.log("Data successfully saved:", data);

    setIsSaving(false);
    setIsSavingNew(false);

    if (actionType === "saveAndNew") {
      reset();
    } else {
      closeModal();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="pt-20">
        <div className="overflow-y-auto max-h-[540px] p-4">
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Create Lead</h2>
            <div className="w-[30%] flex items-center justify-center gap-4">
              <button
                type="submit"
                name="save"
                className="w-1/2 flex items-center justify-center text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 disabled"
                disabled={isSaving || isSavingNew}
              >
                {isSaving ? <ClapSpinner /> : "Save"}
              </button>
              <button
                type="submit"
                name="saveAndNew"
                className="w-full flex items-center justify-center text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
                disabled={isSaving || isSavingNew}
              >
                {isSavingNew ? <ClapSpinner /> : "Save and New"}
              </button>
              <button
                type="button"
                className="w-1/2 text-sm bg-white py-2 px-3 rounded-lg border border-gray-300 hover:border-blue-400 disabled:opacity-80"
                onClick={closeModal}
                disabled={isSaving || isSavingNew}
              >
                Cancel
              </button>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-6">Lead Information</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <SelectField
              name="leadOwner"
              register={register}
              label="Lead Owner"
              placeholder="Select Lead Owner"
              options={["Sabu John Bosco", "Option2", "Option3"]}
              errors={errors}
            />
            <TextInputField
              name="company"
              register={register}
              label="Company"
              placeholder="Account name"
              errors={errors}
            />
            <TextInputField
              name="firstName"
              register={register}
              label="First Name"
              placeholder="First Name"
              errors={errors}
            />
            <TextInputField
              name="lastName"
              register={register}
              label="Last Name"
              placeholder="Last Name"
              errors={errors}
            />
            <TextInputField
              name="title"
              register={register}
              label="Title"
              placeholder="Title"
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
              name="phone"
              register={register}
              label="Phone"
              placeholder="Phone"
              errors={errors}
            />
            <TextInputField
              name="fax"
              register={register}
              label="Fax"
              placeholder="Fax"
              errors={errors}
            />
            <TextInputField
              name="mobile"
              register={register}
              label="Mobile"
              placeholder="Mobile"
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
              name="leadSource"
              register={register}
              label="Lead Source"
              placeholder="Select Lead Source"
              options={[
                "Website",
                "Referral",
                "Advertisement",
                "Social Media",
                "Email Campaign",
                "Cold Call",
                "Event",
              ]}
              errors={errors}
            />

            <SelectField
              name="leadStatus"
              register={register}
              label="Lead Status"
              placeholder="Select Lead Status"
              options={[
                "New",
                "Contacted",
                "Qualified",
                "Unqualified",
                "Converted",
                "Lost",
              ]}
              errors={errors}
            />
            <SelectField
              name="industry"
              register={register}
              label="Industry"
              placeholder="Select Industry"
              options={[
                "Technology",
                "Healthcare",
                "Finance",
                "Education",
                "Retail",
                "Manufacturing",
                "Consulting",
                "Real Estate",
              ]}
              errors={errors}
            />
            <SelectField
              name="numberOfEmployees"
              register={register}
              label="No. of Employees"
              placeholder="Select No. of Employees"
              options={[
                "1-10",
                "11-50",
                "50-200",
                "201-500",
                "501-1000",
                "1001-5000",
                "5001-10,000",
                "10,000+",
              ]}
              errors={errors}
            />
            <TextInputField
              name="annualRevenue"
              register={register}
              label="Annual revenue"
              placeholder="Annual revenue"
              errors={errors}
            />
            <SelectField
              name="rating"
              register={register}
              label="Rating"
              placeholder="Select Rating"
              options={["Hot", "Warm", "Cold"]}
              errors={errors}
            />
            <CheckBoxField
              name="emailOptOut"
              register={register}
              label="Email Opt Out"
              errors={errors}
            />
            <TextInputField
              name="skypeId"
              register={register}
              label="Skype ID"
              placeholder="Skype ID"
              errors={errors}
            />
            <TextInputField
              name="secondaryEmail"
              register={register}
              label="Secondary Email"
              placeholder="Secondary Email"
              errors={errors}
            />
            <TextInputField
              name="twitter"
              register={register}
              label="Twitter"
              placeholder="Twitter"
              errors={errors}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-6">Address Information</h3>
            <div className="grid grid-cols-2 gap-4 gap-x-8">
              <TextInputField
                name="address.street"
                register={register}
                label="Street"
                placeholder="Street"
                errors={errors}
              />
              <SelectField
                name="address.city"
                register={register}
                label="City"
                placeholder="Select City"
                options={["City1", "City2", "City3"]}
                errors={errors}
              />
              <SelectField
                name="address.state"
                register={register}
                label="State"
                placeholder="Select State"
                options={["State1", "State2", "State3"]}
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
                options={["Country1", "Country2", "Country3"]}
                errors={errors}
              />
            </div>
            <div className="mt-8">
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
        </div>
      </form>
    </div>
  );
};

LeadsForm.propTypes = {
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default LeadsForm;
