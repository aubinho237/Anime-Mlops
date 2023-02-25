import Form from '../Form/Form';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import Prediction from '../Prediction/Prediction';
import NavBar from '../NavBar';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Form/>}/>
          <Route path="/prediction" element={<Prediction/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
