import axios from 'axios';

// Set the base URL for the API
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});
// 'http://localhost:8080/api' -- DEVELOPMENT URL

// API service for departments

// Fetch all departments
export const fetchDepartments = async () => {
    try {
        const response = await api.get('/departments'); // Ensure this path matches server endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        return []; // Return empty array on error
    }
};