import React, { useState, useEffect } from 'react';
import { fetchDepartments } from '../api/departments';
import { createEmployee } from '../api/employees';

const InsertEmployee = ({ onSaveEmployee }) => {
    const [departments, setDepartments] = useState([]);
    const [employee, setEmployee] = useState({
        fname: '',
        minit: '',
        lname: '',
        ssn: '',
        phone: '',
        email: '',
        department_id: '',
        e_emplid: ''
    });

    useEffect(() => { // Fetch departments from the API
        const loadDepartments = async () => {
            try {
                const data = await fetchDepartments();
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        loadDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target; // Extract name and value from the input element
        setEmployee(prev => ({ // Update the employee state with the new value
            ...prev,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields are filled
        if (!Object.values(employee).every(val => val.trim() !== '')) {
            alert('All fields must be filled out.');
            return;
        }

        // Validate specific fields like SSN, phone, and department_id
        if (!(/^\d{9}$/.test(employee.ssn))) {
            alert('Invalid SSN. Must be 9 digits.');
            return;
        }
        if (!(/^\d{10}$/.test(employee.phone))) {
            alert('Invalid phone number. Must be 10 digits.');
            return;
        }
        if (isNaN(parseInt(employee.department_id, 10))) {
            alert('Invalid department ID.');
            return;
        }

        // Prepare payload with proper types
        const payload = {
            ...employee,
            department_id: parseInt(employee.department_id, 10),
            e_emplid: parseInt(employee.e_emplid, 10)
        };

        try {
            const response = await createEmployee(payload);
            console.log('Employee created:', response);
            onSaveEmployee(response); // Assuming this updates the list or state elsewhere
            // Clear the form fields
            setEmployee({
                fname: '',
                minit: '',
                lname: '',
                ssn: '',
                phone: '',
                email: '',
                department_id: '',
                e_emplid: ''
            });
            alert('Employee created successfully!');
        } catch (error) {
            console.error('Error creating employee:', error.response ? error.response.data : error);
            alert('Failed to create employee. Check console for more details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Insert Employee</h2>
            <input
                name="fname"
                value={employee.fname}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                name="minit"
                value={employee.minit}
                onChange={handleChange}
                placeholder="Middle Initial"
                required
            />
            <input
                name="lname"
                value={employee.lname}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                name="ssn"
                value={employee.ssn}
                onChange={handleChange}
                placeholder="SSN"
                required
            />
            <input
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
            /> 
            <input
                name="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            {/* Department dropdown */}
            <select name="department_id" value={employee.department_id} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map(dept => (
                    <option key={dept.department_id} value={dept.department_id}>
                        {dept.department_id}  {/* Assuming department names are not available */}
                    </option>
                ))}
            </select>
            <input
                name="e_emplid"
                value={employee.e_emplid}
                onChange={handleChange}
                placeholder="e_emplid"
                required
            />
            <button type="submit" className="btn btn-primary">Save Employee</button>
        </form>
    );
};

export default InsertEmployee;
