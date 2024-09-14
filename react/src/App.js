import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Layout from './Layout';

function App() {
  const [logId, setLogId] = useState(localStorage.getItem('user_id'))
  const updateLogStatus =()=>{
    let logStatus = localStorage.getItem('user_id')
    setLogId(logStatus)
  }
  return (
    <Router>
        {logId ?<Layout />:
        <Routes>
          <Route path='/' element={<Login updateLogStatus={updateLogStatus}/>} />
          <Route path='/Register' element={<Register />} />
        </Routes>
        }
    </Router>
  );
}

export default App;
