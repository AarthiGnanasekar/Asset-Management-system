import { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon, SearchIcon } from "@heroicons/react/outline";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const departments = ["HR", "IT", "Management", "Finance", "Branding"];
  const statuses = ["active", "inactive", "resigned"];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/employee/all");
      setEmployees(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeData = Object.fromEntries(formData.entries());
    employeeData.phone = Number(employeeData.phone);

    try {
        console.log("Sending data to backend:", employeeData);
      await axios.post("http://localhost:8000/api/employee/add", employeeData);
      setIsModalOpen(false);
      e.target.reset();
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-900">Manage Employees</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search employees by name, email or ID..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.empId} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{employee.name}</td>
                <td className="px-6 py-4 text-gray-500">{employee.email}</td>
                <td className="px-6 py-4 text-gray-500">{employee.empId}</td>
                <td className="px-6 py-4 text-gray-500">{employee.department}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                    employee.status === "active" ? "bg-green-100 text-green-800" :
                    employee.status === "inactive" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Employee */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">Add New Employee</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <input className="hidden" name="role" defaultValue="Employee" />
                  <FormInput label="Full Name*" name="name" type="text" required />
                  <FormInput label="Email*" name="email" type="email" required />
                  <FormInput label="Password*" name="password" type="password" required />
                  <FormInput label="Employee ID*" name="empId" type="text" required />
                  <FormInput label="Phone Number*" name="phone" type="number" required />

                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Department*</label>
                    <select
                      name="department"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Status*</label>
                    <select
                      name="status"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      defaultValue="active"
                      required
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                  >
                    Create
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

const FormInput = ({ label, name, type, required }) => (
  <div>
    <label className="block text-sm text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      required={required}
    />
  </div>
);

export default Employees;
