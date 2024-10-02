import { useState } from "react";
import { useParams } from "react-router-dom";
import { leadsData } from "../../../../data/LeadsData";
import { FiPhone } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import LeadsHeader from "./LeadsHeader";
import LeadsSidebar from "./LeadsSidebar";

const LeadsOverview = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { id } = useParams();

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const item = leadsData.find((acc) => acc.id === parseInt(id));

  return (
    <div className="flex flex-col h-screen">
      <LeadsHeader />
      <div className="flex flex-1">
        <LeadsSidebar />
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
                    { label: "Lead Owner", value: item.leadOwner },
                    { label: "Email", value: item.email },
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
                          {item.mobile}
                        </span>
                      ),
                    },
                    {
                      label: "Lead Status",
                      value: item.leadStatus,
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
                <div className="">
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
                      type="link"
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
                        {/* Full Lead Information Section */}
                        <div className="px-6 py-2 rounded-lg  mb-8">
                          <h2 className="text-lg font-semibold mb-6 ">
                            Lead Information
                          </h2>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div>
                              {[
                                {
                                  label: "Lead Owner",
                                  value: item.leadOwner,
                                },
                                {
                                  label: "Title",
                                  value: item.title,
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
                                  label: "Mobile",
                                  value: (
                                    <span className="flex items-center gap-2">
                                      <FiPhone
                                        size={24}
                                        className="text-green-500 bg-green-100 p-1 rounded-md"
                                      />
                                      {item.mobile}
                                    </span>
                                  ),
                                },
                                {
                                  label: "Lead Source",
                                  value: item.leadSource,
                                },
                                { label: "Industry", value: item.industry },
                                {
                                  label: "Annual Revenue",
                                  value: "—",
                                },
                                {
                                  label: "Email Opt Out",
                                  value: item.emailOptOut,
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
                                { label: "Company", value: item.company },
                                {
                                  label: "Lead Name",
                                  value: item.firstName,
                                },
                                {
                                  label: "Email",
                                  value: item.email,
                                },
                                { label: "Fax", value: "—" },
                                {
                                  label: "Website",
                                  value: (
                                    <a
                                      href={item.website}
                                      className="text-blue-500"
                                    >
                                      {item.website}
                                    </a>
                                  ),
                                },
                                {
                                  label: "Lead Status",
                                  value: item.leadStatus,
                                },
                                { label: "No. of Employees", value: "—" },
                                { label: "Rating", value: item.rating },
                                { label: "Created By", value: "—" },
                                {
                                  label: "Skype ID",
                                  value: item.skypeID,
                                },
                                {
                                  label: "Secondary Email",
                                  value: item.secondaryEmail,
                                },
                                {
                                  label: "Twitter",
                                  value: item.twitter,
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
                              <button className="py-2 px-4 rounded-md">
                                Locate Map
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div>
                              {[
                                {
                                  label: "Street",
                                  value: "—",
                                },
                                {
                                  label: "State",
                                  value: "—",
                                },
                                {
                                  label: "Country",
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
                                  label: "City",
                                  value: "—",
                                },
                                {
                                  label: "Zip Code",
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
                            Account Information
                          </h2>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Show only the first few items */}
                            <div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Account Owner
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
                                  Rating
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.rating}
                                </p>
                              </div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Phone
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

export default LeadsOverview;
