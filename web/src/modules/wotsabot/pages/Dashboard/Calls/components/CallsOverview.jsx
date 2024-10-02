import { useParams } from "react-router-dom";
import { callsData } from "../../../../data/CallsData";
import CallsHeader from "./CallsHeader";
import CallsLeftSidebar from "./CallsLeftSidebar";
import CallsRightSidebar from "./CallsRightSidebar";

const CallsOverview = () => {
  const { id } = useParams();

  const item = callsData.find((acc) => acc.id === parseInt(id));

  return (
    <div>
      <div className="flex h-full overflow-hidden">
        <CallsLeftSidebar />
        <div className="flex-1 flex flex-col">
          <CallsHeader />
          <div className="flex flex-1">
            <main className="flex-1 mx-64 mt-20 pl-4 pr-20 pb-4">
              <section className="">
                <div className="bg-white border border-gray-200 px-6 py-4 rounded-lg shadow-sm mb-4">
                  {[
                    { label: "Call To", value: item.assigned_to },
                    { label: "Related To", value: "—" },
                    { label: "Call Type", value: item.call_type },
                    { label: "Outgoing Call Status", value: item.status },
                    { label: "Call Start Time", value: item.call_time },
                    { label: "Call Owner", value: item.caller },
                    { label: "Subject", value: item.call_name },
                    { label: "Created By", value: "—" },
                    { label: "Modified By", value: "—" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center my-4">
                      <p className="text-secondary text-sm text-right mr-12 min-w-[160px]">
                        {item.label}
                      </p>
                      <p
                        className={`text-primary text-sm font-medium ${
                          item.label === "Call To" ? "text-blue-500" : ""
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="px-2 py-4 bg-white border border-gray-200 rounded-lg">
                  <div className="px-6 mt-4">
                    <div className="px-6 py-2 rounded-lg  mb-8">
                      <h2 className="text-lg font-semibold mb-6 ">
                        Purpose of Outgoing Call
                      </h2>
                      <div>
                        {[
                          { label: "Call Purpose", value: "—" },
                          { label: "Call Agenda", value: "—" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center my-4">
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
                </div>
              </section>

              {/* Notes Section */}
              <section>
                <div className="px-2 py-4 bg-white border border-gray-200 rounded-lg mt-4">
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
                </div>
              </section>
            </main>
            <CallsRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallsOverview;
