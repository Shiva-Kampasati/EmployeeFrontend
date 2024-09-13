import { Route, Routes } from "react-router-dom";
import EmployeeList from "./Empoyee/EmployeList";
import Navbar from './Commons/Navbar';
import EmployeeAdd from "./Empoyee/EmployeeAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
                <Route path='/EmployeeList' element={<EmployeeList />} />
                <Route path='/EmployeeAdd' element={<EmployeeAdd />} />
                </Routes>
            </section>
        </div>
    </div>

}
export default Layout;