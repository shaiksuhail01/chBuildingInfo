import React, { useState } from 'react';
import './index.css'; // Make sure to create a corresponding CSS file

const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState('omanID');

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
  };

  return (
    <div className='loginPagesContainer'>
      {loginMethod === 'omanID' && (
        <div className='loginContainer'>
          <h1 className='headingOne'>Omani ID / Resident ID</h1>
          <img src="/images/Login.jpg" alt="loginImage" className='imageLogin' />
          <p className='desc'>To use this login method, you need a civil ID card and ID card reader.</p>
          <button className='button'>
            Login 
          </button>
          <div className='transparentButtonCont'>
          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>
          <button className='dynamicParagraph transparentButton'onClick={() => handleLoginMethodChange('mobileNumber')}>Login with Registered Mobile No</button>
        </div>
        </div>
      )}

      {loginMethod === 'mobileNumber' && (
        <div className='loginContainer'>
          <h1 className='headingOne'>Mobile ID</h1>
          <img src="/images/mobile pass.avif" alt="loginImage" className='imageLogin' />
          <div className='mobileContainer'>
            <label htmlFor="mobileNumber" className='labelText'>Mobile Number:</label>
            <br/>
            <input type="tel" id="mobileNumber" name="mobileNumber" className='inputField'/>
            <button className='button' >
              Login
            </button>
           
            <div className='transparentButtonCont'>
            <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>
            <button className='dynamicParagraph transparentButton' onClick={() => handleLoginMethodChange('omanID')}>
              Login with Registered Omani ID
            </button>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
