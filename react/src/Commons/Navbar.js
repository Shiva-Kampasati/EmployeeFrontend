// Navbar.js
import { faHouse, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    const[navClosed, setNavClosed] = useState(props?.navClosed)
    
    useEffect(()=>{
        setNavClosed(props?.navClosed)
    },[props?.navClosed])

    return (
        <>
            <Link to="/" className='nav-icons'>
                <FontAwesomeIcon icon={faHouse} title='Dashboard' className="menu-icon"/>
                <span hidden={navClosed} className="menu-text">Dashboard</span></Link><br /><br />
                         <Link to="/EmployeeList" className='nav-icons' >
                <FontAwesomeIcon icon={faUsers} title='Employee List' className="menu-icon"/>
                <span hidden={navClosed} className="menu-text">EmployeeList</span></Link><br /><br />
            <Link to="/EmployeeAdd" className='nav-icons'>
                <FontAwesomeIcon icon={faUserPlus} title='Empoyee Add' className="menu-icon"/>
                <span hidden={navClosed} className="menu-text">Add Employee</span></Link><br /><br />
        </>
    );
}

export default Navbar;
