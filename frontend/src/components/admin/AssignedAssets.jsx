import { useState, useEffect } from "react";
import axios from "axios";

const AssignedAssets = () => {
  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    empId: "",
    assetTag: "",
    assignedAt: "",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/assign/all");
      setAssignments(res.data || []);
    } catch (error) {
      console.error("Error fetching assigned assets:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/admin/assign/asset", formData);
      setIsModalOpen(false);
      setFormData({ empId: "", assetTag: "", assignedAt: "" });
      fetchAssignments();
    } catch (error) {
      console.error("Error assigning asset:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-900">Assigned Assets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Assign Asset
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {assignments.map((assignment, index) => (
    <tr key={index} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">{assignment.assetName || "N/A"}</div>
        <div className="text-sm text-gray-500">Tag: {assignment.assetId || "N/A"}</div>
      </td>
      <td className="px-6 py-4">
        <div className="font-medium">{assignment.employeeName || "N/A"}</div>
        <div className="text-sm text-gray-500">ID: {assignment.employeeId || "N/A"}</div>
      </td>
      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
        {assignment.assignedDate
          ? new Date(assignment.assignedDate).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
        {assignment.returnDate
          ? new Date(assignment.returnDate).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
        <button className="text-red-600 hover:text-red-900">Revoke</button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Assign Asset</h2>
            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Tag</label>
                <input
                  type="text"
                  name="assetTag"
                  value={formData.assetTag}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Date</label>
                <input
                  type="date"
                  name="assignedAt"
                  value={formData.assignedAt}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedAssets;
