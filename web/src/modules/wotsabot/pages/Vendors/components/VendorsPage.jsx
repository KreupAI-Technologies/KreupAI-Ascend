import { useNavigate } from 'react-router-dom';

function VendorsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-left text-2xl font-bold mb-4">Contact Your Vendors</h1>
      <p className="mb-6 text-gray-700">
        Vendors are the companies, individuals, or contractors your organization gets products/services from.
      </p>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
          onClick={() => navigate('create-vendor')}
        >
          Create a Vendor
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
          onClick={() => navigate('import-vendor')}
        >
          Import Vendors
        </button>
      </div>
    </div>
  );
}

export default VendorsPage;
