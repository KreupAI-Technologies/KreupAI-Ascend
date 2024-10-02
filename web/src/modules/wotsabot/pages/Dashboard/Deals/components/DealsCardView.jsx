import DealsActionBar from "./DealsActionBar";
import DealsCard from "./DealsCard";
import { BsClipboardCheck } from "react-icons/bs";
import CustomSelect from "../../../../components/ui/CustomSelect";

const sortByOptions = ["None", "Option 1", "Option 2", "Option 3"];
const sortByOrderOptions = ["Asc", "Option 1", "Option 2", "Option 3"];
const stageViewOptions = ["Stage view", "Option 1", "Option 2", "Option 3"];

const cards = [
  {
    title: "Qualification",
    count: 1,
    percentage: "10%",
    amount: "$250,000.00",
    deals: [
      {
        company: "Benton",
        contact: "Sabu John Bosco",
        value: 250000,
        date: "03/07/2024",
        icon: <BsClipboardCheck />,
      },
    ],
  },
  {
    title: "Needs Analysis",
    count: 2,
    percentage: "20%",
    amount: "$100,000.00",
    deals: [
      {
        company: "Truhlar And Truhlar Attys",
        contact: "Sabu John Bosco",
        value: 45000,
        date: "03/07/2024",
        icon: <BsClipboardCheck />,
      },
      {
        company: "Chanay",
        contact: "Josephine Darakjy",
        value: 55000,
        date: "04/07/2024",
      },
    ],
  },
  {
    title: "Value Proposition",
    count: 1,
    percentage: "40%",
    amount: "$70,000.00",
    deals: [
      {
        company: "Chemel",
        contact: "Sabu John Bosco",
        value: 70000,
        date: "03/07/2024",
      },
    ],
  },
  {
    title: "Indentify Decision Makers",
    count: 2,
    percentage: "60%",
    amount: "$105,000.00",
    deals: [
      {
        company: "King",
        contact: "Sabu John Bosco",
        value: 60000,
        date: "05/07/2024",
      },
      {
        company: "Feltz Printing Service",
        contact: "Sabu John Bosco",
        value: 45000,
        date: "06/07/2024",
        icon: <BsClipboardCheck />,
      },
    ],
  },
];

const DealsCardView = () => {
  return (
    <main>
      <div>
        <DealsActionBar />
      </div>
      <div className="flex items-center justify-between p-3">
        <CustomSelect options={stageViewOptions} />
        <div className="flex items-center gap-4">
          <div>Sort by</div>
          <CustomSelect options={sortByOptions} />
          <CustomSelect options={sortByOrderOptions} />
        </div>
      </div>
      <div className="h-screen">
        <div className="flex space-x-4 pl-1">
          {cards.map((card, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <DealsCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DealsCardView;
