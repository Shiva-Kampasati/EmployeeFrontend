import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <div className="App">
          <Layout />
      </div>
    </Router>
  );
}

export default App;
