// LeadsForm.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "./leadSchema";
import PropTypes from "prop-types";
import {
  CheckBoxField,
  NumberInputField,
  SelectField,
  TextAreaField,
  TextInputField,
} from "../../../../components/FormFields";
import axios from "axios";
import { Loader } from "lucide-react";

const LeadsForm = ({ closeModal, onSubmit }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingNew, setIsSavingNew] = useState(false);

  // State variables for options
  const [users, setUsers] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [leadSubSources, setLeadSubSources] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch options from backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          usersResponse,
          industriesResponse,
          leadSubSourcesResponse,
          statusesResponse,
          citiesResponse,
          statesResponse,
          countriesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5002/api/auth/users"),
          axios.get("http://localhost:5002/api/industries"),
          axios.get("http://localhost:5002/api/lead-sub-sources"),
          axios.get("http://localhost:5002/api/statuses"),
          axios.get("http://localhost:5002/api/cities"),
          axios.get("http://localhost:5002/api/states"),
          axios.get("http://localhost:5002/api/countries"),
        ]);

        setUsers(usersResponse.data);
        setIndustries(industriesResponse.data);
        setLeadSubSources(leadSubSourcesResponse.data);

        setCities(citiesResponse.data);
        setStates(statesResponse.data);
        setCountries(countriesResponse.data);

        // Separate statuses and ratings based on statusGroup
        const allStatuses = statusesResponse.data;
        setStatuses(
          allStatuses.filter((status) => status.statusGroup === "LEAD STATUS")
        );
        setRatings(
          allStatuses.filter((status) => status.statusGroup === "RATING")
        );
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
  });

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    const actionType = event.nativeEvent.submitter.name;

    try {
      if (actionType === "save") {
        setIsSaving(true);
      } else if (actionType === "saveAndNew") {
        setIsSavingNew(true);
      }

      // Send POST request to backend API
      const response = await axios.post(
        "http://localhost:5002/api/leads",
        data
      );
      const newLead = response.data;

      console.log("Data successfully saved:", newLead);

      // Call the onSubmit callback with the new lead
      onSubmit(newLead);

      if (actionType === "saveAndNew") {
        reset();
      } else {
        closeModal();
      }
    } catch (error) {
      console.error("Error saving data:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsSaving(false);
      setIsSavingNew(false);
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
                {isSaving ? (
                  <Loader className="animate-spin mx-auto" size={24} />
                ) : (
                  "Save"
                )}
              </button>
              <button
                type="submit"
                name="saveAndNew"
                className="w-full flex items-center justify-center text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
                disabled={isSaving || isSavingNew}
              >
                {isSavingNew ? (
                  <Loader className="animate-spin mx-auto" size={24} />
                ) : (
                  "Save and New"
                )}
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
            {/* User ID (Lead Owner) */}
            <SelectField
              name="userId"
              register={register}
              label="Lead Owner"
              placeholder="Select Lead Owner"
              options={users.map((user) => ({
                value: user._id,
                label: `${user.firstName} ${user.lastName}`,
              }))}
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

            {/* Lead Sub Source ID */}
            <SelectField
              name="leadSubSourceId"
              register={register}
              label="Lead Source"
              placeholder="Select Lead Source"
              options={leadSubSources.map((source) => ({
                value: source._id,
                label: source.name,
              }))}
              errors={errors}
            />

            {/* Status ID */}
            <SelectField
              name="statusId"
              register={register}
              label="Lead Status"
              placeholder="Select Lead Status"
              options={statuses.map((status) => ({
                value: status._id,
                label: status.statusDescription,
              }))}
              errors={errors}
            />

            {/* Industry ID */}
            <SelectField
              name="industryId"
              register={register}
              label="Industry"
              placeholder="Select Industry"
              options={industries.map((industry) => ({
                value: industry._id,
                label: industry.name,
              }))}
              errors={errors}
            />

            {/* Number of Employees (Number Input) */}
            <NumberInputField
              name="numberOfEmployees"
              register={register}
              label="No. of Employees"
              placeholder="Enter Number of Employees"
              errors={errors}
              registerOptions={{ valueAsNumber: true }}
            />

            {/* Annual Revenue (Number Input) */}
            <NumberInputField
              name="annualRevenue"
              register={register}
              label="Annual Revenue"
              placeholder="Annual Revenue"
              errors={errors}
              registerOptions={{ valueAsNumber: true }}
            />

            {/* Rating ID */}
            <SelectField
              name="ratingId"
              register={register}
              label="Rating"
              placeholder="Select Rating"
              options={ratings.map((rating) => ({
                value: rating._id,
                label: rating.statusDescription,
              }))}
              errors={errors}
            />

            <CheckBoxField
              name="emailOptOut"
              register={register}
              label="Email Opt Out"
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

          {/* Address Information (Optional) */}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-6">Address Information</h3>
            <div className="grid grid-cols-2 gap-4 gap-x-8">
              <TextInputField
                name="addressLines[0]"
                register={register}
                label="Address Line 1"
                placeholder="Address Line 1"
                errors={errors}
              />
              <TextInputField
                name="addressLines[1]"
                register={register}
                label="Address Line 2"
                placeholder="Address Line 2"
                errors={errors}
              />
              <TextInputField
                name="addressLines[2]"
                register={register}
                label="Address Line 3"
                placeholder="Address Line 3"
                errors={errors}
              />
              <SelectField
                name="cityId"
                register={register}
                label="City"
                placeholder="Select City"
                options={cities.map((city) => ({
                  value: city._id,
                  label: city.name,
                }))}
                errors={errors}
              />
              <SelectField
                name="stateId"
                register={register}
                label="State"
                placeholder="Select State"
                options={states.map((state) => ({
                  value: state._id,
                  label: state.name,
                }))}
                errors={errors}
              />
              <TextInputField
                name="postalCode"
                register={register}
                label="Zip Code"
                placeholder="Zip Code"
                errors={errors}
              />
              <SelectField
                name="countryId"
                register={register}
                label="Country"
                placeholder="Select Country"
                options={countries.map((country) => ({
                  value: country._id,
                  label: country.name,
                }))}
                errors={errors}
              />
            </div>
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
      </form>
    </div>
  );
};

LeadsForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LeadsForm;
