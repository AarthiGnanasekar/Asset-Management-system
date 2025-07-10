import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAssets: 0,
    assignedAssets: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const [employeesRes, assetsRes] = await Promise.all([
          fetch('http://localhost:8000/api/employee/all'),  //  employee API
          fetch('http://localhost:8000/api/asset/all')     // asset API
        ]);

        if (!employeesRes.ok) throw new Error('Failed to fetch employees');
        if (!assetsRes.ok) throw new Error('Failed to fetch assets');

        const employees = await employeesRes.json();
        const assets = await assetsRes.json();

        setStats({
          totalEmployees: employees.length || employees.count || 0,
          totalAssets: assets.length || assets.count || 0,
          assignedAssets: assets.filter(asset => asset.status === 'assigned').length,
        });
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Employees Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Employees</h3>
          <p className="text-3xl font-bold mt-1">{stats.totalEmployees}</p>
        </div>

        {/* Assets Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Assets</h3>
          <p className="text-3xl font-bold mt-1">{stats.totalAssets}</p>
        </div>

        {/* Assigned Assets Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">Assigned Assets</h3>
          <p className="text-3xl font-bold mt-1">{stats.assignedAssets}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;