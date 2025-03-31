import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFinancialSummary } from '../services/dashboardService';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getFinancialSummary();
        setSummary(data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {currentUser?.firstName || 'User'}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your financial journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Available Balance</h2>
          <p className="text-3xl font-bold text-purple-600">${summary?.balance || '0.00'}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Active Applications</h2>
          <p className="text-3xl font-bold text-purple-600">{summary?.activeApplications || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Approved Funds</h2>
          <p className="text-3xl font-bold text-purple-600">${summary?.approvedFunds || '0.00'}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Financial Score</h2>
          <p className="text-3xl font-bold text-purple-600">{summary?.financialScore || 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Applications</h2>
          {summary?.recentApplications?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentApplications.map((app, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-200">{app.type}</td>
                      <td className="py-2 px-4 border-b border-gray-200">${app.amount}</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">{app.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent applications found.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended For You</h2>
          {summary?.recommendations?.length > 0 ? (
            <div className="space-y-4">
              {summary.recommendations.map((rec, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="font-medium text-purple-600">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  <a href={rec.link} className="text-sm text-purple-700 font-medium hover:text-purple-800 mt-2 inline-block">
                    Learn more →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recommendations available at this time.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;