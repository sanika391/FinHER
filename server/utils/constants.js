
export const APPLICATION_STATUS = {
  DRAFT: {
    id: 'draft',
    label: 'Draft',
    color: 'bg-gray-100 text-gray-800'
  },
  SUBMITTED: {
    id: 'submitted',
    label: 'Submitted',
    color: 'bg-yellow-100 text-yellow-800'
  },
  UNDER_REVIEW: {
    id: 'under_review',
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800'
  },
  APPROVED: {
    id: 'approved',
    label: 'Approved',
    color: 'bg-green-100 text-green-800'
  },
  REJECTED: {
    id: 'rejected',
    label: 'Rejected',
    color: 'bg-red-100 text-red-800'
  },
  FUNDED: {
    id: 'funded',
    label: 'Funded',
    color: 'bg-purple-100 text-purple-800'
  }
};

/**
 * Funding types with display names and colors
 */
export const FUNDING_TYPES = {
  MICROLOAN: {
    id: 'microloan',
    label: 'Microloan',
    color: 'bg-blue-100 text-blue-800',
    description: 'Small loans typically under $50,000 with flexible terms'
  },
  GRANT: {
    id: 'grant',
    label: 'Grant',
    color: 'bg-green-100 text-green-800',
    description: 'Non-repayable funds provided for specific business purposes'
  },
  VENTURE_CAPITAL: {
    id: 'venture_capital',
    label: 'Venture Capital',
    color: 'bg-purple-100 text-purple-800',
    description: 'Funding in exchange for equity in high-growth startups'
  },
  PEER_TO_PEER: {
    id: 'peer_to_peer',
    label: 'Peer to Peer',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Loans funded by individual investors through the platform'
  }
};

/**
 * Learning resource categories
 */
export const LEARNING_CATEGORIES = {
  BASICS: {
    id: 'basics',
    label: 'Financial Basics',
    color: 'bg-blue-100 text-blue-800'
  },
  BUSINESS: {
    id: 'business',
    label: 'Business Finance',
    color: 'bg-green-100 text-green-800'
  },
  INVESTMENT: {
    id: 'investment',
    label: 'Investment',
    color: 'bg-yellow-100 text-yellow-800'
  },
  CREDIT: {
    id: 'credit',
    label: 'Credit Building',
    color: 'bg-purple-100 text-purple-800'
  },
  TAXES: {
    id: 'taxes',
    label: 'Tax Planning',
    color: 'bg-red-100 text-red-800'
  }
};

/**
 * User roles
 */
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

/**
 * API URL
 */
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
