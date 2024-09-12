// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/EmployeeList">Employee List</Link></li>
            <li><Link to="/EmployeeAdd">Empoyee Add</Link></li>
        </>
    );
}

export default Navbar;
