import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import EmployeeList from './components/EmployeeList';
import EmployeeProfile from './components/EmployeeProfile';
import EditEmployee from './components/EditEmployee';
import InsertEmployee from './components/InsertEmployee';
import { fetchEmployees, createEmployee, updateEmployee } from './api/employees';

const App = () => {

    const iframe = document.getElementById('myIframe');
    if (iframe && document.contains(iframe)) {
        try {
            // Example of safely accessing iframe content
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            console.log(iframeDoc.body.innerHTML);
        } catch (error) {
            console.error("Error accessing iframe contents:", error);
        }
    }

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editingEmployee, setEditingEmployee] = useState(null);

    // Load all employees initially
    useEffect(() => {
        const loadEmployees = async () => {
            const data = await fetchEmployees();
            setEmployees(data);
        };
        loadEmployees();
    }, []);

    // Add a new employee
    const handleAddEmployee = async (employee) => {
        const newEmployee = await createEmployee(employee);
        setEmployees([...employees, newEmployee]);
    };

    // Save or update an employee
    const handleSaveEmployee = async (employee) => {
        if (employee.id) {
            // Editing an existing employee
            const updatedEmployee = await updateEmployee(employee.id, employee);
            setEmployees(employees.map(emp => (emp.id === employee.id ? updatedEmployee : emp)));
        } else {
            // Adding a new employee
            handleAddEmployee(employee);
        }
        setEditingEmployee(null);
    };

    // Select an employee for detailed viewing
    const handleSelectEmployee = (employee) => {
        // Check if the currently selected employee is clicked again
        if (selectedEmployee && selectedEmployee.e_emplid === employee.e_emplid) {
            setSelectedEmployee(null); // If clicked again, clear the selection
        } else {
            setSelectedEmployee(employee); // Otherwise, set the new employee as selected
        }
    };    

    // Select an employee for editing
    const handleEditEmployee = (employee) => {
        // Check if the currently editing employee is clicked again
        if (editingEmployee && editingEmployee.e_emplid === employee.e_emplid) {
            setEditingEmployee(null); // If clicked again, clear the editing mode
        } else {
            setEditingEmployee(employee); // Otherwise, set the new employee as editing
        }
    };
    

    return (
        <>
        <div>
            <strong><h1>Employee Management System</h1></strong>
            <p>
                <strong>INSTRUCTIONS: Please remember to scroll down as you interact with this app.</strong>
            </p>
            <EmployeeList
                onSelectEmployee={handleSelectEmployee}
                onEditEmployee={handleEditEmployee}
            />
            <InsertEmployee
                onSaveEmployee={handleSaveEmployee}
            />
            <EmployeeProfile employee={selectedEmployee} />
            {editingEmployee && (
                <EditEmployee
                    employee={editingEmployee}
                    onSave={handleSaveEmployee}
                />
            )}
        </div>
        </>
    );
};

export default App;
