import { IoMdPricetag } from "react-icons/io";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { tasksData } from "../../../../data/TasksData.js";
import { useParams } from "react-router-dom";
import DotsDropdown from "../../../../components/ui/dropdown/DotsDropdown.jsx";
import { BiTask } from "react-icons/bi";

const dotsOptions = ["Option 1", "Option 2", "Option 3"];

const TasksHeader = () => {
  const { id } = useParams();
  const item = tasksData.find((d) => d.id === parseInt(id));

  return (
    <header className="fixed top-16 left-80 right-0 z-10">
      <div className="flex items-center justify-between px-8 py-2 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <BiTask size={24} />
                <h1 className="text-xl font-bold">{item.task_name}</h1>
              </div>
              <div className="flex items-center text-sm text-medium text-gray-500">
                <IoMdPricetag size={20} color="gray" />
                <h4>Add Tags</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:border-blue-400 transition-colors duration-150 flex items-center justify-center">
            Edit
          </button>
          <div>
            <DotsDropdown options={dotsOptions} />
          </div>
          <AiOutlineLeft className="cursor-pointer" />
          <AiOutlineRight className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default TasksHeader;
