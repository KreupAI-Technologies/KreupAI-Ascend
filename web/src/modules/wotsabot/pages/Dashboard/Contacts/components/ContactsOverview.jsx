import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ContactsHeader from "./ContactsHeader";
import ContactsSidebar from "./ContactsSidebar";
import axios from "axios";

const ContactsOverview = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const [contactData, setContactData] = useState(null); // State to store contact data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const { id } = useParams();

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/contacts/${id}`
        ); // Adjust your API endpoint
        setContactData(response.data); // Assuming the data structure is { data: contact }
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError("Failed to load contact data");
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchContactData();
  }, [id]);

  // Show loading state while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>{error}</p>;
  }

  // If no contact data is found
  if (!contactData) {
    return <p>No contact found</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <ContactsHeader />
      <div className="flex flex-1">
        <ContactsSidebar />
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Custom Switch */}

            <div className="flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm p-2 gap-1">
              <button
                type="text"
                onClick={() => setActiveTab("Overview")}
                className={`px-4 py-1 rounded-full ${
                  activeTab === "Overview"
                    ? "bg-blue-100 border border-blue-400 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                Overview
              </button>
              <button
                type="text"
                onClick={() => setActiveTab("Timeline")}
                className={`px-4 py-1 rounded-full ${
                  activeTab === "Timeline"
                    ? "bg-blue-100 border border-blue-400 text-blue-600"
                    : "text-secondary"
                }`}
              >
                Timeline
              </button>
            </div>
            <p className="text-xs text-secondary mt-2">
              Last Update: 7 day(s) ago
            </p>
          </div>
          {activeTab === "Overview" ? (
            <>
              {/* Account Details Section */}

              <section className="">
                <div className="bg-white border border-gray-200 px-6 py-4 rounded-lg shadow-sm mb-4">
                  {[
                    {
                      label: "Contact Owner",
                      value: contactData.userId.firstName,
                    },
                    { label: "Email", value: contactData.email },
                    {
                      label: "Phone",
                      value: (
                        <span className="flex items-center gap-2">
                          <FiPhone
                            size={24}
                            className="text-green-500 bg-green-100 p-1 rounded-md"
                          />
                          {contactData.phone}
                        </span>
                      ),
                    },
                    {
                      label: "Mobile",
                      value: (
                        <span className="flex items-center gap-2">
                          <FiPhone
                            size={24}
                            className="text-green-500 bg-green-100 p-1 rounded-md"
                          />
                          {contactData.mobile}
                        </span>
                      ),
                    },
                    {
                      label: "Department",
                      value: "—",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center my-4">
                      <p className="text-secondary text-sm text-right mr-12 min-w-[160px]">
                        {item.label}
                      </p>
                      <p className="text-primary text-sm font-medium ">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Hide Details Section */}

              <section>
                <div className="px-2 py-4 bg-white border border-gray-200 rounded-lg">
                  {/* Toggle Details button */}
                  <div className="mb-4">
                    <button
                      onClick={toggleDetails}
                      className="ml-4 flex items-center gap-x-1 text-black font-bold hover:!text-secondary"
                    >
                      {isDetailsVisible ? (
                        <>
                          <IoMdArrowDropup /> Hide Details
                        </>
                      ) : (
                        <>
                          <IoMdArrowDropdown /> Show Details
                        </>
                      )}
                    </button>
                  </div>
                  <div className="px-6">
                    <div className="border-t border-grey-200 my-4" />

                    {isDetailsVisible ? (
                      <>
                        {/* Full Account Information Section */}
                        <div className="px-6 py-2 rounded-lg  mb-8">
                          <h2 className="text-lg font-semibold mb-6 ">
                            Contact Information
                          </h2>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div>
                              {[
                                {
                                  label: "Contact Owner",
                                  value: "—",
                                },
                                {
                                  label: "Account Name",
                                  value: "—",
                                },
                                {
                                  label: "Email",
                                  value: "—",
                                },
                                {
                                  label: "Phone",
                                  value: (
                                    <span className="flex items-center gap-2">
                                      <FiPhone
                                        size={24}
                                        className="text-green-500 bg-green-100 p-1 rounded-md"
                                      />
                                      {contactData.phone}
                                    </span>
                                  ),
                                },
                                {
                                  label: "Other Phone",
                                  value: "—",
                                },
                                {
                                  label: "Mobile",
                                  value: (
                                    <span className="flex items-center gap-2">
                                      <FiPhone
                                        size={24}
                                        className="text-green-500 bg-green-100 p-1 rounded-md"
                                      />
                                      {contactData.phone}
                                    </span>
                                  ),
                                },
                                { label: "Assistant", value: "—" },
                                {
                                  label: "Created By",
                                  value: "—",
                                },
                                {
                                  label: "Modified By",
                                  value: "—",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center my-4"
                                >
                                  <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                    {item.label}
                                  </p>
                                  <p className="text-primary font-medium text-sm">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Right Column */}
                            <div>
                              {[
                                { label: "Lead Source", value: "—" },
                                {
                                  label: "Contact Name",
                                  value: "—",
                                },
                                { label: "Vendor Name", value: "—" },
                                {
                                  label: "Title",
                                  value: "—",
                                },
                                {
                                  label: "Department",
                                  value: "—",
                                },
                                { label: "Home Phone", value: "—" },
                                { label: "Fax", value: "—" },
                                { label: "Date of Birth", value: "—" },
                                {
                                  label: "Asst Phone",
                                  value: "—",
                                },
                                {
                                  label: "Email Opt Out",
                                  value: "—",
                                },
                                {
                                  label: "Skype ID",
                                  value: "—",
                                },
                                {
                                  label: "Secondary Email",
                                  value: "—",
                                },
                                {
                                  label: "Reporting To",
                                  value: "—",
                                },
                                {
                                  label: "Twitter",
                                  value: "—",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center my-4"
                                >
                                  <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                    {item.label}
                                  </p>
                                  <p className="text-primary font-medium text-sm">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-grey-200 my-6" />

                        {/* Address Information Section */}
                        <div className=" px-6 py-2 rounded-lg  mb-8">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold mb-6">
                              Address Information
                            </h2>
                            <div>
                              <button className="bg-white border border-grey-300 hover:border-blue-300 py-2 px-4 rounded-md transition-colors duration-150 active:bg-gray-50">
                                Locate Map
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div>
                              {[
                                {
                                  label: "Mailing Street",
                                  value: "—",
                                },
                                {
                                  label: "Mailing City",
                                  value: "—",
                                },
                                {
                                  label: "Mailing State",
                                  value: "—",
                                },
                                {
                                  label: "Mailing ZIp",
                                  value: "—",
                                },
                                {
                                  label: "Mailing Country",
                                  value: "—",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center my-4"
                                >
                                  <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                    {item.label}
                                  </p>
                                  <p className="text-primary font-medium text-sm">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Right Column */}
                            <div>
                              {[
                                {
                                  label: "Other Street",
                                  value: "—",
                                },
                                {
                                  label: "Other City",
                                  value: "—",
                                },
                                {
                                  label: "Other State",
                                  value: "—",
                                },
                                {
                                  label: "Other Zip",
                                  value: "—",
                                },
                                {
                                  label: "Other Country",
                                  value: "—",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center my-4"
                                >
                                  <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                    {item.label}
                                  </p>
                                  <p className="text-primary font-medium text-sm">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-grey-200 my-6" />

                        {/* Description Information Section */}
                        <div className="px-6 py-2 rounded-lg  mb-8">
                          <h2 className="text-lg font-semibold mb-6 ">
                            Description Information
                          </h2>
                          <div className="flex items-center ">
                            <h3 className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                              Description
                            </h3>
                            <p className="font-medium text-primary text-sm">
                              King is a multinational contract manufacturing
                              company with its headquarters in Baltimore, United
                              States.
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-grey-200 my-6" />

                        {/* Visit Summary Section */}
                        <div className=" px-6 py-2 rounded-lg  mb-8">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold mb-6">
                              Visit Summary
                            </h2>
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div>
                              {[
                                {
                                  label: "Most Recent Visit",
                                  value: "—",
                                },
                                {
                                  label: "Average Time Spent",
                                  value: "—",
                                },
                                {
                                  label: "Referrer",
                                  value: "—",
                                },
                                {
                                  label: "First Visit",
                                  value: "—",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center my-4"
                                >
                                  <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                    {item.label}
                                  </p>
                                  <p className="text-primary font-medium text-sm">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Right Column */}
                            <div>
                              {[
                                {
                                  label: "First Page Visited",
                                  value: "—",
                                },
                                {
                                  label: "Number of Chats",
                                  value: "—",
                                },
                                {
                                  label: "Visit Score",
                                  value: "—",
                                },
                                {
                                  label: "Days Visited",
                                  value: "—",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center my-4"
                                >
                                  <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                    {item.label}
                                  </p>
                                  <p className="text-primary font-medium text-sm">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>{/* Hide Information Section */}</>
                    )}
                  </div>
                </div>
                {/* Notes Section */}
                <div className="bg-white px-6 py-4 rounded-lg mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Notes</h2>
                    <button type="link" className="text-blue-500">
                      Recent Last ▼
                    </button>
                  </div>
                  <textarea
                    className="w-full p-4 border rounded-md mb-4 text-sm"
                    placeholder="Add a note..."
                  />
                </div>
              </section>
            </>
          ) : (
            <div className="text-center text-lg font-semibold">
              Timeline Content Goes Here...
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ContactsOverview;
