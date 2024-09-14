import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './Commons/Navbar';
import Dashboard from "./Dashboard.jsx";
import EmployeeAdd from "./Employee/EmployeeAdd";
import EmployeeList from "./Employee/EmployeeList";

const Layout = () => {
    const[navClosed, setNavClosed] =useState(false)
    return <div className="container">
        <header className="header">

            {/* Header */}
        </header>
        <div className="main-content">
            <aside className={`left-panel ${navClosed?"w-5":""}`}>
                <div className={`close-icon ${!navClosed?"flex-end":""}`} >
                   {navClosed?
                    <FontAwesomeIcon icon={faBars} title="OPEN" onClick={()=>{setNavClosed(false)}} />
                    :
                    <FontAwesomeIcon icon={faClose} title="CLOSE" onClick={()=>{setNavClosed(true)}} />
                   }
                </div>
                
                <Navbar navClosed={navClosed}/>
            </aside>
            <section className="right-panel">
                
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/EmployeeList' element={<EmployeeList />} />
                    <Route path='/EmployeeAdd' element={<EmployeeAdd />} />
                </Routes>
            </section>
        </div>
    </div>

}
export default Layout;