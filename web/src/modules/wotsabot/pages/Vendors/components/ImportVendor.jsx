import { useState, useEffect } from 'react';
import { FaSearch, FaCheckCircle } from 'react-icons/fa';
import { getVendors, deleteVendor } from '../../../../wotsabot/api/vendorApi';
import { useNavigate } from 'react-router-dom';


function ImportVendor() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [vendors, setVendors] = useState([]);
  const handleRowClick = (user) => {
    setSelectedUser(user);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const data = await getVendors();
    setVendors(data);
  };

  const handleDelete = async (id) => {
    await deleteVendor(id);
    fetchVendors(); // Refresh the list
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleDone = () => {
    setIsDialogOpen(true); // Show the dialog box
    setTimeout(() => {
      setIsDialogOpen(false);
      window.location.reload(); // Reload the page after hiding the dialog
    }, 1000); // Hide the dialog box after 3 seconds
  };

  

  return (
    <div className="p-8">
      <h1 className="text-left text-2xl font-bold mb-4">Select User</h1>
      
      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center border border-blue-500 rounded-full p-2 w-64 transition-all duration-300 focus-within:ring-1 focus-within:ring-blue-400">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Users"
            className="w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Selected user:</span>
          <img
            src="https://via.placeholder.com/32" // Replace with actual user image source
            alt="User"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="font-medium">Sabu John Bosco</span>
        </div>
      </div>
      
      {/* User Table */}
      <table className="min-w-full bg-white border rounded-md">
  <thead>
    <tr className="text-left">
      <th className="p-3 border-b"></th> {/* Empty header for the radio button column */}
      <th className="p-3 border-b">User Name</th>
      <th className="p-3 border-b">Role</th>
      <th className="p-3 border-b">Email</th>
      <th className="p-3 border-b">Profile</th>
      <th className="p-3 border-b">Actions</th>
    </tr>
  </thead>
  <tbody>
  {vendors.map((vendor) => (
            <tr key={vendor._id}>
      <td className="p-3 border-b">
        <input
          type="radio"
          name="user"
          checked={selectedUser === 'Sabu John Bosco'}
          onChange={() => handleRowClick('Sabu John Bosco')}
          className="mr-2"
        />
      </td>
      <td className="flex items-center p-3 border-b">
        <img
          src="https://via.placeholder.com/32" // Replace with actual user image source
          alt="User"
          className="w-8 h-8 rounded-full mr-2"
        />
        {vendor.vendorName}
      </td>
      <td className="p-3 border-b">CEO</td>
      <td className="p-3 border-b">{vendor.email}</td>
      <td className="p-3 border-b">Administrator</td>
      <td>
                <button onClick={() => navigate(`/edit/${vendor._id}`)}>Edit</button>
                <button onClick={() => handleDelete(vendor._id)}>Delete</button>
              </td>
    </tr>
))}
    {/* Repeat the above <tr> block for additional users */}
  </tbody>
</table>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleDone}
        >
          Done
        </button>
      </div>

      {/* Success Dialog */}
      {isDialogOpen && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white border border-gray-300 shadow-md rounded-md p-4 flex items-center">
          <FaCheckCircle className="text-green-500 h-6 w-6 mr-3" />
          <span>Imported successfully!</span>
        </div>
      </div>
      )}
    </div>
  );
}

export default ImportVendor;
