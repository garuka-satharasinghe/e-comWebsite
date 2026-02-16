// Default configuration for local development
// This file will be replaced by Choreo file mount in production
window.configs = {
    // For local development, use environment variable or localhost
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
};
