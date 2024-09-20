import { BsBuilding } from "react-icons/bs";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { callsData } from "../../../../data/CallsData";
import { useParams } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

const CallsRightSidebar = () => {
  const { id } = useParams();

  const item = callsData.find((acc) => acc.id === parseInt(id));

  return (
    <div className="w-80 fixed top-32 right-0 bottom-0 p-4 bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar">
      <div className="mt-4">
        <div className="border-b border-gray-300 mb-4">
          <div className="flex space-x-6 text-gray-500">
            <button className="focus:outline-none text-blue-500 border-b-2 border-blue-500 pb-2 text-sm">
              Info
            </button>
            <button className="focus:outline-none pb-2 hover:text-blue-500 hover:border-blue-500 transition-all border-b-2 border-transparent text-sm">
              Timeline
            </button>
            <button className="focus:outline-none pb-2 hover:text-blue-500 hover:border-blue-500 transition-all border-b-2 border-transparent text-sm">
              Conversations
            </button>
          </div>
        </div>
      </div>

      {/* Profile Picture and Contact Name */}
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Donette Foller"
          className="rounded-full w-10 h-10 mr-4"
        />
        <div>
          <h4 className="font-semibold">{item?.assigned_to}</h4>
          <p className="text-sm text-gray-500">Contact</p>
        </div>
      </div>

      {/* Send Email Button */}
      <div className="flex items-center justify-center">
        <button className=" mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Send Email
        </button>
      </div>

      {/* Company and Contact Information */}
      <div className="flex items-center text-gray-500 mb-2 text-sm">
        <BsBuilding className="mr-2" />
        <p>{item?.company_name}</p>
      </div>
      <div className="flex items-center text-gray-500 mb-2 text-sm ">
        <FaPhone className="mr-2" />
        <p>{item?.phone}</p>
      </div>
      <div className="flex items-center text-gray-500 mb-2 text-sm">
        <TbDeviceLandlinePhone className="mr-2" />
        <p>{item?.mobile}</p>
      </div>
      <div className="flex items-center text-gray-500 mb-4 text-sm">
        <FaEnvelope className="mr-2" />
        <p>{item?.email}</p>
      </div>

      {/* Followers and More Info */}
      <div className="flex justify-between text-blue-500 mb-6">
        <button className="flex items-center focus:outline-none text-sm">
          <FiUsers className="mr-1 " /> 0 Followers
        </button>
        <button className="focus:outline-none text-sm">More Info</button>
      </div>

      <div className=" border border-gray-300 mb-4" />

      {/* Open Activities */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Open Activities</h4>
        <button className="text-blue-500 ">+ New</button>
      </div>

      <button className="flex justify-between items-center px-4 py-2 bg-blue-50 w-full text-dark mb-2 border border-blue-500 rounded-md">
        <div className="flex items-center text-sm">
          <span>Calls</span>
          <span className="ml-2">1</span>
        </div>
        <RiArrowDropDownLine />
      </button>

      <button className="flex justify-between items-center px-4 py-2 bg-blue-50 w-full text-dark mb-2 border border-blue-500 rounded-md">
        <div className="flex items-center text-sm">
          <span>Meetings</span>
          <span className="ml-2">0</span>
        </div>
        <RiArrowDropDownLine />
      </button>

      <button className="flex justify-between items-center px-4 py-2 bg-blue-50 w-full text-dark border border-blue-500 rounded-md">
        <div className="flex items-center text-sm">
          <span>Calls</span>
          <span className="ml-2">0</span>
        </div>
        <RiArrowDropDownLine />
      </button>
    </div>
  );
};

export default CallsRightSidebar;
