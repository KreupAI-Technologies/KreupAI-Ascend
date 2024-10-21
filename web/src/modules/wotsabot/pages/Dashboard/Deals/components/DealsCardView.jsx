import { useEffect, useState } from "react";
import axios from "axios";
import DealsActionBar from "./DealsActionBar";
import DealsCard from "./DealsCard";
import CustomSelect from "../../../../components/ui/CustomSelect";

const sortByOptions = ["None", "Option 1", "Option 2", "Option 3"];
const sortByOrderOptions = ["Asc", "Option 1", "Option 2", "Option 3"];
const stageViewOptions = ["Stage view", "Option 1", "Option 2", "Option 3"];

const DealsCardView = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5002/api/opportunities");
        const fetchedOpportunities = response.data.map(opportunity => ({
          title: opportunity.dealName,
          count: 1,
          percentage: `${opportunity.probabilityPercentage}%`,
          amount: `$${opportunity.amount.toLocaleString()}`,
          deals: [
            {
              company: opportunity.accountId.clientName,
              contact: opportunity.contactId.firstName + " " + opportunity.contactId.lastName || "Unknown Contact",
              value: opportunity.amount,
              date: new Date(opportunity.closingDate).toLocaleDateString(),
            },
          ],
        }));
        setCards(fetchedOpportunities);
        setLoading(false);

      } catch (err) {
        setError("Failed to fetch opportunities");
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleFormSubmit = (newDeal) => {
    // Update the state with the new deal data
    const updatedDeal = {
      title: newDeal.dealName,
      count: 1,
      percentage: `${newDeal.probability}%`,
      amount: `$${newDeal.amount.toLocaleString()}`,
      deals: [
        {
          company: newDeal.accountId.clientName,
          contact: `${newDeal.contactId.firstName}  ${newDeal.contactId.lastName}` || "Unknown Contact",
          value: newDeal.amount,
          date: new Date(newDeal.closingDate).toLocaleDateString(),
        },
      ],
    };

    setCards((prevCards) => [...prevCards, updatedDeal]);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <div>
        <DealsActionBar onFormSubmit={handleFormSubmit} />
      </div>
      <div className="flex items-center justify-between p-3">
        <CustomSelect options={stageViewOptions} />
        <div className="flex items-center gap-4">
          <div>Sort by</div>
          <CustomSelect options={sortByOptions} />
          <CustomSelect options={sortByOrderOptions} />
        </div>
      </div>
      <div className="h-screen overflow-auto">
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
