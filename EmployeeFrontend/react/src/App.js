import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeAdd from './Empoyee/EmployeeAdd';
import EmployeeList from './Empoyee/EmployeList';
import Navbar from './Commons/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/EmployeeList' element={<EmployeeList />} />
          <Route path='/EmployeeAdd' element={<EmployeeAdd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
