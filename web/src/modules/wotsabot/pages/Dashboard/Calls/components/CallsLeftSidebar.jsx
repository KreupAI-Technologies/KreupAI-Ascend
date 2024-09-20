import { FiPhoneOutgoing } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const calls = [
  {
    id: 1,
    assigned_to: "Chau Kitzman (Sample)",
    dueDate: "Jul 03",
    assignedBy: "You",
  },
];

const CallsLeftSidebar = () => {
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate("/calls");
  };

  return (
    <div className="w-64 fixed top-16 bottom-0 left-16 overflow-auto bg-white border-r border-gray-200 custom-scrollbar">
      <div className="fixed top-16 left-16 bottom-[540px] right-[1225px] bg-white flex items-center gap-2 mb-6">
        <GoArrowLeft
          size={24}
          className="text-lg cursor-pointer ml-4"
          onClick={onBackClick}
        />
        <h3 className="text-lg font-bold mt-1">All Calls</h3>
      </div>
      <div className="mt-20 mb-4">
        {calls.map((call) => (
          <div key={call.id} className="space-y-1">
            <div>
              <div className="py-4 bg-blue-50">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-1 ">
                    <FiPhoneOutgoing />
                    <h2 className="text-sm font-semibold">
                      {call.assigned_to}
                    </h2>
                  </div>
                  <h5 className="text-xs text-gray-500">{call.dueDate}</h5>
                </div>
                <h4 className="text-xs text-gray-500 ml-10">
                  {call.assignedBy}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsLeftSidebar;
