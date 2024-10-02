import { useState } from "react";
import { useParams } from "react-router-dom";
import { tasksData } from "../../../../data/TasksData";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import TasksHeader from "./TasksHeader";
import TasksLeftSidebar from "./TasksLeftSidebar";
import TasksRightSidebar from "./TasksRightSidebar";

const TasksOverview = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { id } = useParams();

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const item = tasksData.find((acc) => acc.id === parseInt(id));

  return (
    <div>
      <div className="flex h-full overflow-hidden">
        <TasksLeftSidebar />
        <div className="flex-1 flex flex-col">
          <TasksHeader />
          <div className="flex flex-1">
            <main className="flex-1 mx-64 mt-20 pl-4 pr-20 pb-4">
              <section className="">
                <div className="bg-white border border-gray-200 px-6 py-4 rounded-lg shadow-sm mb-4">
                  {[
                    { label: "Priority", value: item.priority },
                    { label: "Due Date", value: item.due_date },
                    { label: "Status", value: item.status },
                    { label: "Account", value: item.assigned_to },
                    { label: "Task Owner", value: item.task_owner },
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
                      type="link"
                      onClick={toggleDetails}
                      className="ml-4 flex items-center gap-x-1 text-black font-bold"
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
                        {/* Full Task Information Section */}
                        <div className="px-6 py-2 rounded-lg  mb-8">
                          <h2 className="text-lg font-semibold mb-6 ">
                            Task Information
                          </h2>
                          <div>
                            {[
                              {
                                label: "Task Owner",
                                value: item.task_owner,
                              },
                              {
                                label: "Subject",
                                value: item.task_name,
                              },
                              {
                                label: "Due Date",
                                value: item.due_date,
                              },
                              { label: "Contact", value: "—" },
                              {
                                label: "Account",
                                value: item.related_entity,
                              },
                              {
                                label: "Status",
                                value: item.status,
                              },
                              {
                                label: "Priority",
                                value: item.priority,
                              },
                              {
                                label: "Created By",
                                value: "—",
                              },
                              {
                                label: "Modified By",
                                value: "—",
                              },
                              {
                                label: "Reminder",
                                value: "—",
                              },
                              {
                                label: "Repeat",
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
                      </>
                    ) : (
                      <>
                        {/* Partially visible Task Information Section */}
                        <div className="px-6 py-2 rounded-lg  mb-8">
                          <h2 className="text-lg font-semibold mb-6 ">
                            Task Information
                          </h2>
                          <div className="grid grid-cols-2 gap-8">
                            {/* Show only the first few items */}
                            <div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Task Owner
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.task_owner}
                                </p>
                              </div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Subject
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.task_name}
                                </p>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Status
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.status}
                                </p>
                              </div>
                              <div className="flex items-center my-4">
                                <p className="text-secondary text-right mr-12 min-w-[160px] text-sm">
                                  Priority
                                </p>
                                <p className="text-primary font-medium text-sm">
                                  {item.priority}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </section>
            </main>
            <TasksRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksOverview;
