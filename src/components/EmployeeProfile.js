import React from 'react';

const EmployeeProfile = ({ employee }) => {
    // If no employee is selected, display a message
    if (!employee) return <p>Select an employee to view details</p>;

    return (
        <div>
            <h2>Employee Details</h2>
            <p><strong>First Name:</strong> {employee.fname}</p>
            <p><strong>Middle Initial:</strong> {employee.minit}</p>
            <p><strong>Last Name:</strong> {employee.lname}</p>
            <p><strong>SSN:</strong> {employee.ssn}</p>
            <p><strong>Phone Number:</strong> {employee.phone}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Department ID:</strong> {employee.department_id}</p>
            <p><strong>EMPLID:</strong> {employee.e_emplid}</p>
        </div>
    );
};

export default EmployeeProfile;
