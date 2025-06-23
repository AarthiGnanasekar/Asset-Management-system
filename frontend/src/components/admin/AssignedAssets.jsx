import { useState, useEffect } from "react";
import axios from "axios";

const AssignedAssets = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/assign/asset");
      setAssignments(res.data || []);
    } catch (error) {
      console.error("Error fetching assigned assets:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">Assigned Assets</h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {assignment.assetId?.name || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Tag: {assignment.assetId?.assetTag || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">
                    {assignment.employeeId?.name || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {assignment.employeeId?.empId || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(assignment.assignedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {assignment.returnDate
                    ? new Date(assignment.returnDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedAssets;
