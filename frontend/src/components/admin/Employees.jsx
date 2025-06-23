import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon } from "@heroicons/react/outline";

const Employees = () => {
    const [employees, setEmployees] = useState([
        { 
            id: 1, 
            name: "John Doe", 
            email: "john@company.com", 
            password: "password123",
            empId: "EMP001",
            phone: 1234567890,
            position: "Developer", 
            department: "IT",
            role: "Software Engineer",
            status: "active"
        },
        { 
            id: 2, 
            name: "Jane Smith", 
            email: "jane@company.com",
            password: "password123",
            empId: "EMP002",
            phone: 9876543210,
            position: "Designer", 
            department: "Branding",
            role: "UI/UX Designer",
            status: "active"
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const departments = ["HR", "IT", "Management", "Finance", "Branding"];
    const statuses = ["active", "inactive", "resigned"];

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.empId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const employeeData = Object.fromEntries(formData);
        
        // Convert phone to number
        employeeData.phone = Number(employeeData.phone);
        
        if (currentEmployee) {
            // Update existing employee
            setEmployees(employees.map(emp => 
                emp.id === currentEmployee.id ? { ...emp, ...employeeData } : emp
            ));
        } else {
            // Add new employee
            const newEmployee = {
                ...employeeData,
                id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
            };
            setEmployees([...employees, newEmployee]);
        }
        
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-900">Manage Employees</h1>
                <button
                    onClick={() => { setCurrentEmployee(null); setIsModalOpen(true); }}
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{employee.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{employee.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{employee.empId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{employee.department}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        employee.status === 'active' ? 'bg-green-100 text-green-800' :
                                        employee.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {employee.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(employee)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-lg font-bold mb-4">
                                {currentEmployee ? "Edit Employee" : "Add New Employee"}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-1">Full Name*</label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={currentEmployee?.name || ""}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-1">Email*</label>
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={currentEmployee?.email || ""}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            required
                                        />
                                    </div>
                                    
                                    {!currentEmployee && (
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium mb-1">Password*</label>
                                            <input
                                                type="password"
                                                name="password"
                                                defaultValue={currentEmployee?.password || ""}
                                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                                required={!currentEmployee}
                                            />
                                        </div>
                                    )}
                                    
                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-1">Employee ID*</label>
                                        <input
                                            type="text"
                                            name="empId"
                                            defaultValue={currentEmployee?.empId || ""}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-1">Phone Number*</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            defaultValue={currentEmployee?.phone || ""}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-1">Department*</label>
                                        <select
                                            name="department"
                                            defaultValue={currentEmployee?.department || ""}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-1">Position/Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            defaultValue={currentEmployee?.role || ""}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-1">Status*</label>
                                        <select
                                            name="status"
                                            defaultValue={currentEmployee?.status || "active"}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            required
                                        >
                                            {statuses.map(status => (
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
                                        {currentEmployee ? "Update" : "Create"}
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

export default Employees;