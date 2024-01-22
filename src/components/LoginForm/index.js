import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css'; 


const LoginForm = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberFilled, setIsMobileNumberFilled] = useState(true); 
  const onClickLoginButton = () => {
    if (mobileNumber.trim() !== '') {
      
      setIsMobileNumberFilled(true);
     
      navigate('/building-info');
    } else {
      
      setIsMobileNumberFilled(false);
    }
  };

  return (
    <div className='mainContainer'>
    <div className='loginPagesContainer'>
      <div className='loginContainer'>
        <h1 className='headingOne'>Omani ID / Resident ID</h1>
        <img src="/images/Login.jpg" alt="loginImage" className='imageLogin' />
        <p className='desc'>To use this login method, you need a civil ID card and ID card reader.</p>
        <button className='button mt-2'>
          Login 
        </button>
      </div>
    
      <div className='loginContainer'>
        <h1 className='headingOne'>Mobile ID</h1>
        <img src="/images/mobile.jpg" alt="loginImage" className='imageLogin' />
        <div className='mobileContainer'>
        
          <input
        type='tel'
        id='mobileNumber'
        name='mobileNumber'
        placeholder='Enter Your Mobile Number'
        className='form-control mb-3 mt-3 pb-3'
        value={mobileNumber}
        required
        onChange={(e) => {
          setMobileNumber(e.target.value);
          setIsMobileNumberFilled(true); 
        }}
      />
      {!isMobileNumberFilled && <p style={{ color: 'red' }}>Mobile number is required.</p>}
      <button className='button' onClick={onClickLoginButton}>
        Login
      </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
