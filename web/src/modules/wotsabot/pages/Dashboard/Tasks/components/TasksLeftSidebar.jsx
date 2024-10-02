import { BiTask } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const tasks = [
  {
    id: 1,
    title: "Refer CRM Videos",
    assignedTo: "King(Sample)",
    updatedBy: "Kris Mar..",
    dueDate: "Jul 04",
    priority: "Normal",
    assignedBy: "You",
    status: "In Progress",
    cost: "$35,..",
  },
  {
    id: 2,
    title: "Competitor Comparison Document",
    assignedTo: "Feltz Printing",
    updatedBy: "Capla Pap...",
    dueDate: "Jun 30",
    priority: "Highest",
    assignedBy: "You",
    status: "Not Started",
    cost: "$45,..",
  },
  {
    id: 3,
    title: "Get Approval from Manager",
    assignedTo: "Chapman",
    updatedBy: "Simon Mor..",
    dueDate: "Jul 01",
    priority: "Low",
    assignedBy: "You",
    status: "Not Started",
    cost: "$70,..",
  },
  {
    id: 4,
    title: "Get Approval from Manager",
    assignedTo: "Commercial Solutions",
    updatedBy: "Leota Dilliar..",
    dueDate: "Jul 03",
    priority: "Normal",
    assignedBy: "You",
    status: "In Progress",
    cost: "$45,..",
  },
  {
    id: 5,
    title: "Get Approval from Manager",
    assignedTo: "King(Sample)",
    updatedBy: "Kris Mar..",
    dueDate: "Jul 03",
    priority: "High",
    assignedBy: "You",
    status: "In Progress",
    cost: "$45,..",
  },
  {
    id: 6,
    title: "Register for upcoming CRM Event",
    assignedTo: "Michael Russel",
    updatedBy: "You",
    dueDate: "Jul 05",
    priority: "Normal",
    assignedBy: "You",
    status: "In Progress",
    cost: "$55,..",
  },
  {
    id: 7,
    title: "Refer CRM Videos",
    assignedTo: "Morlongo Associates",
    updatedBy: "Mitsue Tolliver",
    dueDate: "Jul 04",
    priority: "Normal",
    assignedBy: "You",
    status: "In Progress",
    cost: "$35,..",
  },
];

const TasksLeftSidebar = () => {
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate("/tasks");
  };

  return (
    <nav>
    <div className="w-64 fixed top-16 bottom-0 left-16 overflow-auto bg-white border-r border-gray-200 custom-scrollbar">
      <div className="fixed top-16 left-16 bottom-[540px] right-[1225px] bg-white flex items-center gap-2 mb-6">
        <GoArrowLeft
          size={24}
          className="text-lg cursor-pointer ml-4"
          onClick={onBackClick}
        />
        <h3 className="text-lg font-bold mt-1">All Tasks</h3>
      </div>
      <div className="mt-20 mb-4">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-1">
            <div className="mt-4">
              <div className="border border-gray-200" />
              <div className="flex items-center gap-1 px-4">
                <BiTask size={20} className="mt-2" />
                <h2 className="text-sm font-semibold mt-4">{task.title}</h2>
              </div>
            </div>
            <div className="flex items-center justify-between px-4">
              <h4 className="text-xs text-gray-500">{task.assignedTo}</h4>
              <h4 className="text-xs text-gray-500">{task.updatedBy}</h4>
              <h5 className="text-xs text-red-500">{task.dueDate}</h5>
            </div>
            <div className="flex items-center justify-end px-4">
              <h5 className="text-xs text-gray-500">{task.priority}</h5>
            </div>
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <h4 className="text-xs text-gray-500">{task.assignedBy}</h4>
                <h4 className="text-xs text-gray-500">{task.status}</h4>
              </div>
              <h5 className="text-xs text-red-500">{task.cost}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
    </nav>
  );
};

export default TasksLeftSidebar;
