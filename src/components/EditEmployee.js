import React, { useState, useEffect } from 'react';

const EditEmployee = ({ onSave, employee }) => {
    const [employeeData, setEmployeeData] = useState({
        fname: '',
        minit: '',
        lname: '',
        ssn: '',
        phone: '',
        email: '',
        department_id: '',
        e_emplid: ''
    });

    // Populate the form when the component receives the employee data
    useEffect(() => {
        if (employee) {
            setEmployeeData({
                fname: employee.fname || '',
                minit: employee.minit || '',
                lname: employee.lname || '',
                ssn: employee.ssn || '',
                phone: employee.phone || '',
                email: employee.email || '',
                department_id: employee.department_id || '',
                e_emplid: employee.e_emplid || ''
            });
        }
    }, [employee]);

    const handleChange = (e) => { // Function to handle form input changes
        const { name, value } = e.target;
        setEmployeeData(prev => ({ ...prev, [name]: value }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating employee:', employeeData);
        // Check if the employee ID exists
        if (employeeData.e_emplid) {
            onSave({
                ...employeeData,
                id: employeeData.e_emplid // Ensure you send the ID as the API might be expecting an 'id' field
            });
            alert('Employee updated!');
        } else {
            alert('Employee ID is missing!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Employee</h2>
            <input
                name="fname"
                value={employeeData.fname}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                name="minit"
                value={employeeData.minit}
                onChange={handleChange}
                placeholder="Middle Initial"
                required
            />
            <input
                name="lname"
                value={employeeData.lname}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                name="ssn"
                value={employeeData.ssn}
                onChange={handleChange}
                placeholder="SSN"
                required
            />
            <input
                name="phone"
                value={employeeData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
            /> 
            <input
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                name="department_id"
                value={employeeData.department_id}
                onChange={handleChange}
                placeholder="Department ID"
                required
            />
            <input
                name="e_emplid"
                value={employeeData.e_emplid}
                onChange={handleChange}
                placeholder="e_emplid"
                required
            />
            <button type="submit" className="btn btn-secondary">Update Employee</button>
        </form>
    );
};

export default EditEmployee;
