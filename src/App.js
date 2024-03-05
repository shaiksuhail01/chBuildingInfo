import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm'; 
import ChBuildingInfo from './components/ChBuildingInfo';
import OtpInfo from './components/OtpInfo';
import RequestsInfo from './components/RequestsForm';
import PdfReport from './components/Reports';



import './App.css';
class App extends Component {
  render() {
    return (
        <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/building-info" element={<ChBuildingInfo/>}/>
        <Route path="/otp-confirmInfo" element={<OtpInfo/>}/>
        <Route path="/Requests-Form" element={<RequestsInfo/>}/>
        <Route path="/reports" element={<PdfReport/>}/>
      </Routes>
    );
  }
}

export default App;
