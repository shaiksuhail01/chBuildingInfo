import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm'; 
import './App.css';
class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    );
  }
}

export default App;
