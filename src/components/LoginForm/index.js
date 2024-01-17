import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css'; 




const LoginForm = () => {


  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');

  const onClickLoginButton = () => {
    if (mobileNumber.trim() === '') {
      alert('Mobile number is required!');
    } else {
     
      navigate('/building-info');
    }
  };

  return (
    <div className='loginPagesContainer'>
    
        <div className='loginContainer'>
          <h1 className='headingOne'>Omani ID / Resident ID</h1>
          <img src="/images/Login.jpg" alt="loginImage" className='imageLogin' />
          <p className='desc'>To use this login method, you need a civil ID card and ID card reader.</p>
          <button className='button'>
            Login 
          </button>
        </div>
        <hr style={{ borderColor: "black" }} />
          
        <div className='loginContainer'>
          <h1 className='headingOne'>Mobile ID</h1>
          <img src="/images/mobile pass.avif" alt="loginImage" className='imageLogin' />
          <div className='mobileContainer'>
            <label htmlFor="mobileNumber" className='labelText'>Mobile Number:</label>
            <br/>
            <input
          type='tel'
          id='mobileNumber'
          name='mobileNumber'
          className='inputField'
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
            <button className='button' onClick={onClickLoginButton}>
              Login
            </button>
          </div>
        </div>
   
    </div>
  );
};

export default LoginForm;
