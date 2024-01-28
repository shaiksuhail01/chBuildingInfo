// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import './index.css';
import Header from '../Header';

const LoginForm = () => {
  const { t, i18n } = useTranslation();
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

  const isArabic = i18n.language === 'ar';

  return (
    <div className='mainContainer'>
      <Header />
      <div className="loginPagesContainer">
        <h1 className='loginHeader'>{t('loginHeader')}</h1>
        <div className="loginfullPageContainer">
          <div className={`loginContainer ${isArabic ? 'rtl' : ''}`}>
            <h1 className={`headingOne ${isArabic ? 'rtl' : ''}`}>{t('loginMethodOne')}</h1>
            <img src="/images/Login.jpg" alt="loginImage" className="imageLogin" />
            <p className={`desc ${isArabic ? 'rtl' : ''}`}>{t('loginMethodOneDescription')}</p>
            <button className="button mt-2">{t('loginButton')}</button>
          </div>
          <div className={`loginContainer ${isArabic ? 'rtl' : ''}`}>
            <h1 className={`headingOne ${isArabic ? 'rtl' : ''}`}>{t('loginMethodTwo')}</h1>
            <img src="/images/mobile.jpg" alt="loginImage" className="imageLogin" />
            <div className="mobileContainer">
              <TextField
                id="mobileNumber"
                name="mobileNumber"
                label={isMobileNumberFilled ? t('loginMethodTwoDescription') : <span className="error-text">{t('Required')}</span>}
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                className={`mb-3 mt-3 ${isArabic ? 'rtl' : ''}`}
                value={mobileNumber}
  
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  setIsMobileNumberFilled(true);
                }}
                onClick={() => setIsMobileNumberFilled(true)}
              />
              <button className="button" onClick={onClickLoginButton}>
                {t('loginButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
