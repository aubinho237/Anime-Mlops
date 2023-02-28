import Form from '../Form/Form';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Test } from '../Component/Test';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import Prediction from '../Prediction/Prediction';

function App() {
  // const [initState, setState] = useState([])
  // const url = "http://127.0.0.1:5000/api"

  // useEffect(()=>{
  //   fetch(url).then(response => {
  //     if(response.status ==200){
  //       return response.json()
  //     }
  //   }).then(data => setState(data))
  // }, [])

  // return (
  //   <div className="App">
  //     <Test data = {initState}/>
  //   </div>
  // );
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Form/>}/>
          <Route path="/prediction/:title" element={<Prediction/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
