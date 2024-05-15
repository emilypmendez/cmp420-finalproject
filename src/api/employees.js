import axios from 'axios';

// Set the base URL for the API
const api = axios.create({
    baseURL: '/.netlify/functions/server/api'
});
// http://localhost:8080/api -- DEVELOPMENT URL

// check for data
axios.get('/api/employees')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    if (error.response) {
      console.log('Server responded with status code:', error.response.status);
      console.log('Response data:', error.response.data);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error creating request:', error.message);
    }
  });

// API service for employees
export const fetchEmployees = async () => {
    const response = await api.get('/employees');
    return response.data;
};

export const fetchEmployeeById = async (e_emplid) => {
    const response = await api.get(`/employees/${e_emplid}`);
    return response.data;
};

export const createEmployee = async (employee) => {
    const response = await api.post('/employees', employee);
    return response.data;
};

export const updateEmployee = async (e_emplid, employee) => {
    console.log('I AM HERE - employees.js - updateEmployee - e_emplid:', e_emplid);
    const response = await api.put(`/employees/${e_emplid}`, employee);
    return response.data;
};

export const deleteEmployee = async (e_emplid) => {

    console.log('I AM HERE - employees.js - deleteEmployee - e_emplid:', e_emplid);
    const response = await api.delete(`/employees/${e_emplid}`);
    return response.data;
};