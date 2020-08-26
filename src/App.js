import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CandidatesPage from './Components/Candidates/CandidatesPage';


function setUpAxios(){
  axios.defaults.baseURL = 'http://localhost:3001'; 
  axios.defaults.headers.get['Accept'] = 'application/json';   
  axios.defaults.headers.post['Accept'] = 'application/json';
}


function App() {
  setUpAxios();
  return (
    <div className="App">
       
      <Container>
      <Router>
          <Switch>
              <Route exact path="/candidates" component={CandidatesPage} />
          </Switch>
      </Router>
        {/* <Basic /> */}
        
      </Container>
    </div>
  );
}

export default App;
