import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dealSchema } from "./dealSchema";
import PropTypes from "prop-types";
import {
    NumberInputField,
    SelectField,
    TextAreaField,
    TextInputField,
} from "../../../../components/FormFields";
import axios from "axios";
import { Loader } from "lucide-react";

const DealsForm = ({ closeModal, onSubmit }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingNew, setIsSavingNew] = useState(false);

    // State variables for options
    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [typeStatuses, setTypeStatuses] = useState([]);
    const [LeadSources, setLeadSources] = useState([]);
    const [stageStatuses, setStageStatuses] = useState([]);

    // Fetch options from backend
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [
                    usersResponse,
                    accountsResponse,
                    contactsResponse,
                    LeadSourcesResponse,
                    statusesResponse,
                ] = await Promise.all([
                    axios.get("http://localhost:5002/api/auth/users"),
                    axios.get("http://localhost:5002/api/accounts"),
                    axios.get("http://localhost:5002/api/contacts"),
                    axios.get("http://localhost:5002/api/lead-sources"),
                    axios.get("http://localhost:5002/api/statuses"),
                ]);

                setUsers(usersResponse.data);
                setAccounts(accountsResponse.data);
                setContacts(contactsResponse.data);
                setLeadSources(LeadSourcesResponse.data);

                const allStatuses = statusesResponse.data;

                // Separate statuses based on statusGroup
                const typeStatuses = allStatuses.filter(
                    (status) => status.statusGroup === "OPPORTUNITY TYPE"
                );

                const stageStatuses = allStatuses.filter(
                    (status) => status.statusGroup === "OPPORTUNITY STAGE"
                );

                setTypeStatuses(typeStatuses);
                setStageStatuses(stageStatuses);
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
        resolver: zodResolver(dealSchema), // Validation schema
    });

    // Handle form submit to post the form data to the backend API
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
                "http://localhost:5002/api/opportunities",
                data
            );

            const newDeal = response.data;

            console.log("Data successfully saved:", newDeal);

            // Call the onSubmit callback with the new Deal
            onSubmit(newDeal);

            if (actionType === "saveAndNew") {
                reset(); // Reset the form if "Save and New" is clicked
            } else {
                closeModal(); // Close the modal after saving
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
                        <h2 className="text-xl font-semibold">Create Deal</h2>
                        <div className="w-[30%] flex items-center justify-center gap-4">
                            <button
                                type="submit"
                                name="save"
                                className="w-1/2 flex items-center justify-center text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
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

                    {/* Deal Information Form */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <SelectField
                            name="userId"
                            register={register}
                            label="Deal Owner"
                            placeholder="Select Deal Owner"
                            options={users.map((user) => ({
                                value: user._id,
                                label: `${user.firstName} ${user.lastName}`,
                            }))}
                            errors={errors}
                        />
                        <SelectField
                            name="accountId"
                            register={register}
                            label="Account Name"
                            placeholder="Select Account Name"
                            options={accounts.map((account) => ({
                                value: account._id,
                                label: account.clientName,
                            }))}
                            errors={errors}
                        />
                        <SelectField
                            name="contactId"
                            register={register}
                            label="Contact Name"
                            placeholder="Select Contact Name"
                            options={contacts.map((contact) => ({
                                value: contact._id,
                                label: `${contact.firstName} ${contact.lastName}`,
                            }))}
                            errors={errors}
                        />
                        <NumberInputField
                            name="amount"
                            register={register}
                            label="Amount"
                            placeholder="Amount"
                            errors={errors}
                        />
                        <TextInputField
                            name="website"
                            register={register}
                            label="Website"
                            placeholder="Website"
                            errors={errors}
                        />
                        <TextInputField
                            name="dealName"
                            register={register}
                            label="Deal Name"
                            placeholder="Deal Name"
                            errors={errors}
                        />
                        <SelectField
                            name="typeId"
                            register={register}
                            label="Type"
                            placeholder="Select Type"
                            options={typeStatuses.map((type) => ({
                                value: type._id,
                                label: type.statusDescription,
                            }))}
                            errors={errors}
                        />
                        <TextInputField
                            name="nextStep"
                            register={register}
                            label="Next Step"
                            placeholder="Next Step"
                            errors={errors}
                        />
                        <TextInputField
                            name="closingDate"
                            register={register}
                            label="Closing Date"
                            placeholder="YYYY-MM-DD"
                            errors={errors}
                        />
                        <SelectField
                            name="leadSourceId"
                            register={register}
                            label="Lead Source"
                            placeholder="Select Lead Source"
                            options={LeadSources.map((source) => ({
                                value: source._id,
                                label: source.name,
                            }))}
                            errors={errors}
                        />
                        <SelectField
                            name="stageId"
                            register={register}
                            label="Deal Stage"
                            placeholder="Select Deal Stage"
                            options={stageStatuses.map((stage) => ({
                                value: stage._id,
                                label: stage.statusDescription,
                            }))}
                            errors={errors}
                        />
                        <NumberInputField
                            name="expectedRevenue"
                            register={register}
                            label="Expected Revenue"
                            placeholder="Expected Revenue"
                            errors={errors}
                        />

                        <NumberInputField
                            name="probability"
                            register={register}
                            label="Probability (Decimal)"
                            placeholder="Enter a value between 0 and 1"
                            errors={errors}
                            registerOptions={{ valueAsNumber: true, min: 0, max: 1 }}
                            step="any"  // Allow decimal values
                            min={0}
                            max={0}
                        />

                        <NumberInputField
                            name="probabilityPercentage"
                            register={register}
                            label="Probability Percentage (%)"
                            placeholder="Enter a value between 0 and 100"
                            errors={errors}
                            registerOptions={{ valueAsNumber: true, min: 0, max: 100 }}
                        />

                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-6">Description Information</h3>
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

DealsForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default DealsForm;
