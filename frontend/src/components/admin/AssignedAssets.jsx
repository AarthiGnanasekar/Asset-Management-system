import { useState, useEffect } from 'react';
import axios from 'axios';

const AssignedAssets = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        empId: '',
        assetTag: '',
        assignedAt: ''
    });

    useEffect(() => {
        fetchAssignedAssets();
    }, []);

    const fetchAssignedAssets = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/assign/all');
            if (response.data?.success && Array.isArray(response.data.data)) {
                setAssignments(response.data.data);
            } else {
                setAssignments([]);
                console.warn('Unexpected API response structure:', response.data);
            }
        } catch (err) {
            console.error('API Error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch assigned assets');
            setAssignments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAssignAsset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/admin/assign/asset', formData);
            if (response.data.success) {
                // Refresh the assignments list
                await fetchAssignedAssets();
                // Close modal and reset form
                setIsModalOpen(false);
                setFormData({
                    empId: '',
                    assetTag: '',
                    assignedAt: ''
                });
            } else {
                setError(response.data.message || 'Failed to assign asset');
            }
        } catch (err) {
            console.error('Assignment Error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to assign asset');
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading assigned assets...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-900">Assigned Assets</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Assign Asset
                </button>
            </div>

            {assignments.length > 0 ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset Tag</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purchased Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {assignments.map((asset) => (
                                <tr key={asset._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{asset.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {asset.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {asset.model}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {asset.assetTag}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            asset.status === 'assigned' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(asset.purchasedDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <p className="text-gray-500">No assigned assets found</p>
                </div>
            )}

            {/* Assign Asset Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Assign Asset</h2>
                            <form onSubmit={handleAssignAsset}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        name="empId"
                                        value={formData.empId}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Asset Tag
                                    </label>
                                    <input
                                        type="text"
                                        name="assetTag"
                                        value={formData.assetTag}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Assignment Date
                                    </label>
                                    <input
                                        type="date"
                                        name="assignedAt"
                                        value={formData.assignedAt}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    >
                                        Assign
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

export default AssignedAssets;