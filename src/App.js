import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm'; 
import ChBuildingInfo from './components/ChBuildingInfo';
import OtpInfo from './components/OtpInfo';
import './App.css';
class App extends Component {
  render() {
    return (
        <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/building-info" element={<ChBuildingInfo/>}/>
        <Route path="/otp-confirmInfo" element={<OtpInfo/>}/>
      </Routes>
    );
  }
}

export default App;
