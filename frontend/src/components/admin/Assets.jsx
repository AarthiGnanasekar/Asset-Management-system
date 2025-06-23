import { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);

  const statusColors = {
    available: "bg-green-100 text-green-800",
    assigned: "bg-blue-100 text-blue-800",
    damaged: "bg-red-100 text-red-800",
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/asset/all");
      if (Array.isArray(response.data)) {
        setAssets(response.data);
      } else if (Array.isArray(response.data.assets)) {
        setAssets(response.data.assets);
      } else {
        console.error("Unexpected response format", response.data);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/asset/delete/${id}`);
      fetchAssets();
    } catch (error) {
      console.error("Failed to delete asset:", error);
    }
  };

  const handleEdit = (asset) => {
    setCurrentAsset(asset);
    setIsModalOpen(true);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = {
    name: formData.get("name"),
    srlNo: formData.get("srlNo"),
    category: formData.get("category"),
    model: formData.get("model"),
    imageURL: formData.get("imageURL"),
    assetTag: formData.get("assetTag"),
    status: formData.get("status"),
    purchasedDate: formData.get("purchasedDate"),
    warrantyExpiringDate: formData.get("warrantyExpiringDate"),
  };
 console.log(data)
  try {
    if (currentAsset) {
      // Make sure we're using the correct ID field (_id)
      await axios.put(`http://localhost:8000/api/asset/update/${currentAsset._id}`, data);
    } else {
      await axios.post("http://localhost:8000/api/asset/add", data);
    }
    console.log("Updating asset with ID:", currentAsset?._id);
    setIsModalOpen(false);
    setCurrentAsset(null);
    fetchAssets(); // Refresh the list
  } catch (error) {
    console.error("Error saving asset:", error.response?.data || error.message);
  }
};

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-900">Manage Assets</h1>
        <button
          onClick={() => {
            setCurrentAsset(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Asset
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr key={asset._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{asset.name}</td>
                <td className="px-6 py-4">{asset.category}</td>
                <td className="px-6 py-4">{asset.srlNo}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${statusColors[asset.status]}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(asset)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(asset._id)} className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">{currentAsset ? "Edit Asset" : "Add New Asset"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                  {[
                    { label: "Asset Name", name: "name", type: "text" },
                    { label: "Serial Number", name: "srlNo", type: "number" },
                    { label: "Category", name: "category", type: "text" },
                    { label: "Model", name: "model", type: "text" },
                    { label: "Image URL", name: "imageURL", type: "text" },
                    { label: "Asset Tag", name: "assetTag", type: "text" },
                    { label: "Status", name: "status", type: "text" },
                    { label: "Purchased Date", name: "purchasedDate", type: "date" },
                    { label: "Warranty Expiring Date", name: "warrantyExpiringDate", type: "date" },
                  ].map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        defaultValue={currentAsset?.[field.name] || ""}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-sm text-gray-600 hover:text-gray-800">
                    Cancel
                  </button>
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                    {currentAsset ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;
