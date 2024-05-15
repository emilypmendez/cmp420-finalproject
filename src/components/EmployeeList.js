import React, { useState, useEffect } from 'react';

import { fetchEmployees, deleteEmployee } from '../api/employees';

// Component to display a list of employees
const EmployeeList = ({ onSelectEmployee, onEditEmployee }) => {

    // State to hold the employee data
    const [employees, setEmployees] = useState([ fetchEmployees() ]);

    // Fetch all employees when the component mounts
    useEffect(() => {
        const loadEmployees = async () => {
            const data = await fetchEmployees(employees);
            setEmployees(data);
        };
        loadEmployees();
    }, [employees]); // Empty dependency array ensures this runs only once

    // Function to handle deleting an employee
    const handleDelete = async (e_emplid) => {
        if (!window.confirm('Are you sure you want to delete this employee?', e_emplid)) {
                window.alert('Employee NOT deleted:', e_emplid);
                console.log('Employee NOT deleted:', e_emplid);
        } else {
            window.alert('Employee deleted:', e_emplid);
            console.log('Employee deleted:', e_emplid);
        }
        await deleteEmployee(e_emplid);
        setEmployees(employees.filter((employee) => employee.e_emplid !== e_emplid));
    };

    // Display a loading message while the data is being fetched
    useEffect(() => {
        if (!Array.isArray(employees)) {
            return <div>Loading...</div>; // or handle the error appropriately
        }
    }, [employees]);

    return (
        
        <div>
            <h2>Employee List</h2>
            <p>
                <strong>NOTE:</strong>
                {" "} You may select the View or Edit button twice to close the Action functionality.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Initial</th>
                        <th>Last Name</th>
                        <th>SSN</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Department ID</th>
                        <th>e_EMPLID</th>
                        <th>Actions</th>
                    </tr>
                </thead> 
                <tbody>
                    {employees.map((employee, id) => (
                        <tr key={id}>
                            <td>{employee.fname}</td>
                            <td>{employee.minit}</td>
                            <td>{employee.lname}</td>
                            <td>{employee.ssn}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department_id}</td>
                            <td>{employee.e_emplid}</td>
                            <td><button className="btn btn-info" onClick={() => onSelectEmployee(employee)}>View</button></td>
                            <td><button className="btn btn-primary" onClick={() => onEditEmployee(employee)}>Edit</button></td>
                            <td><button className="btn btn-danger" onClick={() => handleDelete(employee.e_emplid)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
