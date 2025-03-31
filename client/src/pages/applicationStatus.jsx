import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationStatus } from '../services/fundingService';

const ApplicationStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const data = await getApplicationStatus(id);
        setApplication(data);
      } catch (err) {
        setError('Failed to load application status. Please try again.');
        console.error('Application status error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationStatus();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'funded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
          <p>Application not found. Please check the application ID.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Application Status</h1>
        <p className="text-gray-600 mt-2">Track the progress of your funding application</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Application #{application._id.slice(-6).toUpperCase()}</h2>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
              {formatStatus(application.status)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on {new Date(application.submittedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Funding Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600">Funding Option</p>
              <p className="font-medium">{application.fundingOption.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount Requested</p>
              <p className="font-medium">${application.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium">{application.fundingOption.type.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Interest Rate</p>
              <p className="font-medium">{application.fundingOption.interestRate ? `${application.fundingOption.interestRate}%` : 'N/A'}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Application Timeline</h3>
            <div className="space-y-6">
              <div className="relative flex items-start">
                <div className="flex items-center h-6">
                  <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Application Submitted</h4>
                  <p className="text-sm text-gray-500">{new Date(application.submittedAt).toLocaleString()}</p>
                </div>
              </div>
              
              {application.status === 'under_review' || application.status === 'approved' || application.status === 'rejected' || application.status === 'funded' ? (
                <div className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Under Review</h4>
                    <p className="text-sm text-gray-500">Your application is being reviewed by our team</p>
                  </div>
                </div>
              ) : (
                <div className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full">
                      <span className="h-2 w-2 bg-gray-500 rounded-full"></span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-400">Under Review</h4>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              )}
              
              {application.status === 'approved' || application.status === 'funded' ? (
                <div className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-green-500 rounded-full">
                      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Application Approved</h4>
                    <p className="text-sm text-gray-500">{application.decidedAt ? new Date(application.decidedAt).toLocaleString() : 'Your application has been approved'}</p>
                  </div>
                </div>
              ) : application.status === 'rejected' ? (
                <div className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-red-500 rounded-full">
                      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Application Rejected</h4>
                    <p className="text-sm text-gray-500">{application.decidedAt ? new Date(application.decidedAt).toLocaleString() : 'Your application was not approved'}</p>
                  </div>
                </div>
              ) : (
                <div className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full">
                      <span className="h-2 w-2 bg-gray-500 rounded-full"></span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-400">Decision</h4>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              )}
              
              {application.status === 'funded' ? (
                <div className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Funds Disbursed</h4>
                    <p className="text-sm text-gray-500">Funding has been transferred to your account</p>
                  </div>
                </div>
              ) : (
                <div className="relative flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full">
                      <span className="h-2 w-2 bg-gray-500 rounded-full"></span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-400">Funds Disbursed</h4>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {application.aiEvaluation && (
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">AI Evaluation</h3>
              <div>
                <p className="text-sm text-gray-600 mb-2">Credit Score Estimate</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(application.aiEvaluation.score, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-800 mb-4">Score: {application.aiEvaluation.score}/100</p>
                
                <p className="text-sm text-gray-600 mb-2">Feedback</p>
                <p className="text-sm text-gray-800">{application.aiEvaluation.feedback}</p>
              </div>
            </div>
          )}
          
          {application.status === 'rejected' && application.reviewerNotes && (
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Reviewer Notes</h3>
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm text-gray-800">{application.reviewerNotes}</p>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Back to Dashboard
              </button>
              
              <button
                onClick={() => navigate('/applications')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
              >
                View All Applications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;