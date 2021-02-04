import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import MarsPhoto from './components/MarsPhoto';
//fungerade inte eftersom att den returnerar utan 
//att man kan söka och då får man en 400 bad request
//import Search from './components/Search'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={Home} path='/' exact/>
        <Route component={MarsPhoto} path='/marsphoto'/>
      </div>
    </BrowserRouter>
  );
}

export default App;
