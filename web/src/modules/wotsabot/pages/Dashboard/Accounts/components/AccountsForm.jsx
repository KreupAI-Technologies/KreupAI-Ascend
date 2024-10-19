// AccountsForm.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "./accountSchema";
import PropTypes from "prop-types";
import {
    NumberInputField,
    SelectField,
    TextAreaField,
    TextInputField,
} from "../../../../components/FormFields";
import axios from "axios";
import { Loader } from "lucide-react";

const AccountsForm = ({ closeModal, onSubmit }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingNew, setIsSavingNew] = useState(false);

    // State variables for options
    const [users, setUsers] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [deliveryTerms, setDeliveryTerms] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [employeeStatuses, setEmployeeStatuses] = useState([]);
    const [clientStatuses, setClientStatuses] = useState([]);
    const [divisions, setDivisions] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [states, setStates] = useState([]);
    // const [countries, setCountries] = useState([]);

    // Fetch options from backend
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [
                    usersResponse,
                    industriesResponse,
                    statusesResponse,
                    divisionResponse,
                    paymentTermsResponse,
                    deliveryTermsResponse,
                    paymentMethodsResponse,
                    // citiesResponse,
                    // statesResponse,
                    // countriesResponse,
                ] = await Promise.all([
                    axios.get("http://localhost:5002/api/auth/users"),
                    axios.get("http://localhost:5002/api/industries"),
                    axios.get("http://localhost:5002/api/statuses"),
                    axios.get("http://localhost:5002/api/divisions"),
                    axios.get("http://localhost:5002/api/payment-terms"),
                    axios.get("http://localhost:5002/api/delivery-terms"),
                    axios.get("http://localhost:5002/api/payment-methods"),
                    // axios.get("http://localhost:5002/api/cities"),
                    // axios.get("http://localhost:5002/api/states"),
                    // axios.get("http://localhost:5002/api/countries"),
                ]);

                setUsers(usersResponse.data);
                setIndustries(industriesResponse.data);
                setDivisions(divisionResponse.data);
                setPaymentTerms(paymentTermsResponse.data);
                setDeliveryTerms(deliveryTermsResponse.data);
                setPaymentMethods(paymentMethodsResponse.data);
                // setCities(citiesResponse.data);
                // setStates(statesResponse.data);
                // setCountries(countriesResponse.data);

                // // Separate statuses  based on statusGroup
                // const allStatuses = statusesResponse.data;
                // if (allStatuses.name === "numberOfEmployeesRangeId") {
                //     setStatuses(
                //         allStatuses.filter((status) => status.statusGroup === "EMPLOYEES RANGE")

                //     );
                // }
                // if (allStatuses.name === "clientTypeId") {
                //     setStatuses(
                //         allStatuses.filter((status) => status.statusGroup === "CLIENTS")
                //     );
                // }


                const allStatuses = statusesResponse.data;

                // Separate statuses based on statusGroup
                const employeeRangeStatuses = allStatuses.filter(
                    (status) => status.statusGroup === "EMPLOYEES RANGE"
                );

                const clientTypeStatuses = allStatuses.filter(
                    (status) => status.statusGroup === "CLIENTS"
                );

                // Set state for employee range and client types
                setEmployeeStatuses(employeeRangeStatuses);
                setClientStatuses(clientTypeStatuses);

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
        resolver: zodResolver(accountSchema),
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
                "http://localhost:5002/api/accounts",
                data
            );
            const newAccount = response.data;

            console.log("Data successfully saved:", newAccount);

            // Call the onSubmit callback with the new lead
            onSubmit(newAccount);

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
                        <h2 className="text-xl font-semibold">Create Account</h2>
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

                    <h3 className="text-lg font-semibold mb-6">Account Information</h3>
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
                            name="clientId"
                            register={register}
                            label="Client Id"
                            placeholder="Client Id"
                            errors={errors}
                        />
                        <TextInputField
                            name="clientName"
                            register={register}
                            label="Client Name"
                            placeholder="Client Name"
                            errors={errors}
                        />
                        <TextInputField
                            name="tradeLicense"
                            register={register}
                            label="Trade License"
                            placeholder="Trade License"
                            errors={errors}
                        />
                        <TextInputField
                            name="taxId"
                            register={register}
                            label="Tax Id"
                            placeholder="Tax Id"
                            errors={errors}
                        />
                        <SelectField
                            name="clientTypeId"
                            register={register}
                            label="Client Type"
                            placeholder="Client Type"
                            errors={errors}
                            options={clientStatuses.map((status) => ({
                                value: status._id,
                                label: status.statusDescription,
                            }))}

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

                        <NumberInputField
                            name="creditLimit"
                            register={register}
                            label="Credit Limit"
                            placeholder="Credit Limit"
                            errors={errors}
                            registerOptions={{ valueAsNumber: true }}
                        />
                        <NumberInputField
                            name="creditDays"
                            register={register}
                            label="Credit Days"
                            placeholder="Credit Days"
                            errors={errors}
                            registerOptions={{ valueAsNumber: true }}
                        />
                        <TextInputField
                            name="website"
                            register={register}
                            label="Website"
                            placeholder="Website"
                            errors={errors}
                        />
                        <SelectField
                            name="paymentTermsId"
                            register={register}
                            label="Payment Terms"
                            placeholder="Payment Terms"
                            errors={errors}
                            options={paymentTerms.map((paymentTerm) => ({
                                value: paymentTerm._id,
                                label: paymentTerm.name,
                            }))}
                        />
                        <SelectField
                            name="deliveryTermsId"
                            register={register}
                            label="Delivery Terms"
                            placeholder="Delivery Terms"
                            errors={errors}
                            options={deliveryTerms.map((deliveryTerm) => ({
                                value: deliveryTerm._id,
                                label: deliveryTerm.name,
                            }))}
                        />
                        <SelectField
                            name="paymentMethodId"
                            register={register}
                            label="Payment Method"
                            placeholder="Select Payment Method"
                            errors={errors}
                            options={paymentMethods.map((paymentMethod) => ({
                                value: paymentMethod._id,
                                label: paymentMethod.name,
                            }))}
                        />


                        {/* Annual Income (Number Input) */}
                        <NumberInputField
                            name="annualIncome"
                            register={register}
                            label="Annual Income"
                            placeholder="Annual Income"
                            errors={errors}
                            registerOptions={{ valueAsNumber: true }}
                        />


                        {/* Number of Employees  */}
                        <SelectField
                            name="numberOfEmployeesRangeId"
                            register={register}
                            label="No. of Employees Range"
                            placeholder="Enter Number of Employees Range"
                            errors={errors}
                            options={employeeStatuses.map((status) => ({
                                value: status._id,
                                label: status.statusDescription,
                            }))}

                        />
                        <TextInputField
                            name="rating"
                            register={register}
                            label="Rating"
                            placeholder="Rating"
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
                            name="email"
                            register={register}
                            label="Email"
                            placeholder="Email"
                            errors={errors}
                        />
                        <SelectField
                            name="divisionId"
                            register={register}
                            label="Division"
                            placeholder="Select Division"
                            options={divisions.map((division) => ({
                                value: division._id,
                                label: division.name,
                            }))}
                            errors={errors}
                        />
                        <SelectField
                            name="createdBy"
                            register={register}
                            label="Created By"
                            placeholder="Select Created By"
                            options={users.map((user) => ({
                                value: user._id,
                                label: `${user.firstName} ${user.lastName}`,
                            }))}
                            errors={errors}
                        />
                        <SelectField
                            name="lastModifiedBy"
                            register={register}
                            label="Last Modified By"
                            placeholder="Select Last Modified By"
                            options={users.map((user) => ({
                                value: user._id,
                                label: `${user.firstName} ${user.lastName}`,
                            }))}
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
                            {/* <TextInputField
                                name="billingAddressId"
                                register={register}
                                label="Billing Address"
                                placeholder="Billing Address"
                                errors={errors}
                            />
                            <TextInputField
                                name="shippingAddressId"
                                register={register}
                                label="Shipping Address"
                                placeholder="Shipping Address"
                                errors={errors}
                            /> */}
                            {/* <SelectField
                                name="cityId"
                                register={register}
                                label="City"
                                placeholder="Select City"
                                options={cities.map((city) => ({
                                    value: city._id,
                                    label: city.name,
                                }))}
                                errors={errors}
                            /> */}
                            {/* <SelectField
                                name="stateId"
                                register={register}
                                label="State"
                                placeholder="Select State"
                                options={states.map((state) => ({
                                    value: state._id,
                                    label: state.name,
                                }))}
                                errors={errors}
                            /> */}
                            {/* <TextInputField
                                name="postalCode"
                                register={register}
                                label="Zip Code"
                                placeholder="Zip Code"
                                errors={errors}
                            /> */}
                            {/* <SelectField
                                name="countryId"
                                register={register}
                                label="Country"
                                placeholder="Select Country"
                                options={countries.map((country) => ({
                                    value: country._id,
                                    label: country.name,
                                }))}
                                errors={errors}
                            /> */}
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

AccountsForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AccountsForm;
