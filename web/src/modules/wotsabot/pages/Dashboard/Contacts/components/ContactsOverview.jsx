import { useState } from "react";
import { useParams } from "react-router-dom";
import { contactsData } from "../../../../data/ContatcsData";
import { FiPhone } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ContactsHeader from "./ContactsHeader";
import ContactsSidebar from "./ContactsSidebar";

const AccountOverview = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { id } = useParams();

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const item = contactsData.find((acc) => acc.id === parseInt(id));

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
                    { label: "Contact Owner", value: item.contact_owner },
                    { label: "Email", value: item.industry },
                    {
                      label: "Phone",
                      value: (
                        <span className="flex items-center gap-2">
                          <FiPhone
                            size={24}
                            className="text-green-500 bg-green-100 p-1 rounded-md"
                          />
                          {item.phone}
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
                          {item.phone}
                        </span>
                      ),
                    },
                    {
                      label: "Department",
                      value: item.department,
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

              {/* Deals, Next Action, and Contacts Section */}

              <section className="flex mb-4 bg-white border border-gray-200 px-8 py-6 rounded-lg shadow-sm">
                <div className="w-1/2">
                  <h3 className="font-bold mb-4 text-lg">Deals</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-primary text-sm">
                        {item.account_name}
                      </h4>
                      <div className="ml-4 text-sm font-medium bg-red-100 px-2 py-1 rounded-md border border-red-600">
                        $60,000.00
                      </div>
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-primary text-sm">
                        Identify Decision Makers
                      </h3>
                      <h3 className="text-primary ml-4 text-sm">05/07/2024</h3>
                    </div>
                  </div>
                </div>

                <div className="border-l border-gray-200 mx-6" />

                <div className="w-1/2">
                  <h3 className="font-bold text-lg mb-4">Next Action</h3>
                  {[
                    {
                      date: "JUL 2",
                      action: "Register for upcoming CRM Webinars",
                    },
                    { date: "JUL 2", action: "Get Approval from Manager" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <div className="text-sm font-medium bg-red-100 px-2 py-1 rounded-md border border-red-600">
                        {item.date}
                      </div>
                      <div className=" text-primary text-sm font-semibold">
                        {item.action}
                      </div>
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
                                  value: item.contact_owner,
                                },
                                {
                                  label: "Account Name",
                                  value: item.account_name,
                                },
                                {
                                  label: "Email",
                                  value: item.account_site,
                                },
                                {
                                  label: "Phone",
                                  value: (
                                    <span className="flex items-center gap-2">
                                      <FiPhone
                                        size={24}
                                        className="text-green-500 bg-green-100 p-1 rounded-md"
                                      />
                                      {item.phone}
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
                                      {item.phone}
                                    </span>
                                  ),
                                },
                                { label: "Assistant", value: "—" },
                                {
                                  label: "Created By",
                                  value: item.annual_revenue,
                                },
                                {
                                  label: "Modified By",
                                  value: item.created_by,
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
                                { label: "Lead Source", value: item.rating },
                                {
                                  label: "Contact Name",
                                  value: item.contact_name,
                                },
                                { label: "Vendor Name", value: "—" },
                                {
                                  label: "Title",
                                  value: item.title,
                                },
                                {
                                  label: "Department",
                                  value: item.ticker_symbol,
                                },
                                { label: "Home Phone", value: item.ownership },
                                { label: "Fax", value: item.employees },
                                { label: "Date of Birth", value: "—" },
                                {
                                  label: "Asst Phone",
                                  value: item.modified_by,
                                },
                                {
                                  label: "Email Opt Out",
                                  value: item.modified_by,
                                },
                                {
                                  label: "Skype ID",
                                  value: item.modified_by,
                                },
                                {
                                  label: "Secondary Email",
                                  value: item.modified_by,
                                },
                                {
                                  label: "Reporting To",
                                  value: item.modified_by,
                                },
                                {
                                  label: "Twitter",
                                  value: item.modified_by,
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

                        <div className="border-t border-grey-200 my-6" />

                        {/* Notes Section */}
                        <div className="px-6 py-2 rounded-lg ">
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
                      </>
                    ) : (
                      <>
                        {/* Partially visible Account Information Section */}
                        <div className="px-6 py-2 rounded-lg  mb-8">
                          <h2 className="text-lg font-semibold mb-6 ">
                            Contact Information
                          </h2>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Show only the first few items */}
                            <div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Contact Owner
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.account_owner}
                                </p>
                              </div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Account Name
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.account_name}
                                </p>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Lead Source
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.rating}
                                </p>
                              </div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Contact Name
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  <span className="flex items-center gap-2">
                                    <FiPhone
                                      size={24}
                                      className="text-green-500 bg-green-100 p-1 rounded-md"
                                    />
                                    {item.phone}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-grey-200 my-6" />

                        {/* Partially visible Description Information Section */}
                        <div className="px-6 py-2 rounded-lg  mb-8">
                          <h2 className="text-lg font-semibold mb-6 ">
                            Description Information
                          </h2>
                          <div className="flex items-center ">
                            <h3 className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                              Description
                            </h3>
                            <p className="font-medium text-primary text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
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

export default AccountOverview;
