import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add loading state and auth headers
apiClient.interceptors.request.use(
  (config) => {
    // You can add global loading state here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => {
    // Return successful response
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login or clear auth
          console.error('Unauthorized access');
          break;
        case 403:
          // Forbidden
          console.error('Forbidden access');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error(`API Error: ${status}`, data);
      }
      
      // Return structured error
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        data: data,
      });
    } else if (error.request) {
      // Network error
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null,
      });
    } else {
      // Request setup error
      return Promise.reject({
        status: -1,
        message: 'Request failed to initialize',
        data: null,
      });
    }
  }
);

// Helper function to create auth headers
export const createAuthHeaders = (token, type = 'user') => ({
  authorization: `${type} ${token}`,
});

// Helper function for API calls with error handling
export const apiCall = async (requestFn, errorMessage = 'Request failed') => {
  try {
    const response = await requestFn();
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error(errorMessage, error);
    return {
      success: false,
      data: null,
      error: error.message || errorMessage,
    };
  }
};

export default apiClient;
