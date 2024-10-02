import { IoMdPricetag } from "react-icons/io";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { accountsData } from "../../../../data/AccountsData";
import { useNavigate, useParams } from "react-router-dom";
import DotsDropdown from "../../../../components/ui/dropdown/DotsDropdown.jsx";

const dotsOptions = ["Option 1", "Option 2", "Option 3"];

const AccountsHeader = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const item = accountsData.find((d) => d.id === parseInt(id));

  const onBackClick = () => {
    navigate("/accounts");
  };

  return (
    <header className="flex items-center justify-between px-8 py-2 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <GoArrowLeft
          size={24}
          className="text-lg cursor-pointer"
          onClick={() => {
            onBackClick();
          }}
        />
        <div className="flex items-center">
          <img
            src="/images/Profile2.png"
            alt="Profile Photo"
            className="rounded-full w-20 h-20 mr-2"
          />
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{item.account_name} -</h1>
              <a href={item.website} className="text-blue-500 text-sm">
                {item.website}
              </a>
            </div>
            <div className="flex items-center text-sm text-medium text-gray-500">
              <IoMdPricetag size={20} color="gray"/>
              <h4>Add Tags</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm text-white px-4 py-2 rounded-md border border-blue-500  bg-blue-500 hover:bg-blue-500 transition-colors duration-150 flex items-center justify-center">
          Send Mail
        </button>
        <button className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:border-blue-400 transition-colors duration-150 flex items-center justify-center">
          Edit
        </button>
        <div>
          <DotsDropdown options={dotsOptions} />
        </div>
        <AiOutlineLeft className="cursor-pointer" />
        <AiOutlineRight className="cursor-pointer" />
      </div>
    </header>
  );
};

export default AccountsHeader;
