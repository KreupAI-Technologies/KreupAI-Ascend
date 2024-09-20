import { useNavigate } from "react-router-dom";

function PriceB() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-8 p-4">
        {/* Image on the left */}
        <img src="/images/Books.webp" alt="Books" className="w-1/3 h-auto" />

        {/* Text and Buttons */}
        <div>
          <h1 className="text-left text-2xl font-bold">
            Offer Best Prices with Price Books
          </h1>
          <p className="mb-6 text-gray-700">
            Price Books refer to the goods or procured by an organization.
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
              onClick={() => navigate("create-pricebook")}
            >
              Create a Price Book
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
              onClick={() => navigate("import")}
            >
              Import Price Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceB;
