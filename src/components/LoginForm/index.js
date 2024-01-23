// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useTranslation } from 'react-i18next';
import './index.css';

const LoginForm = () => {
  const { t } = useTranslation();
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
    <div className="mainContainer">
      <Header/>
      <div className="loginPagesContainer">
        <h1 className="loginHeader">{t('loginHeader')}</h1>
        <div className="loginfullPageContainer">
          <div className="loginContainer">
            <h1 className="headingOne">{t('loginMethodOne')}</h1>
            <img src="/images/Login.jpg" alt="loginImage" className="imageLogin" />
            <p className="desc">{t('loginMethodOneDescription')}</p>
            <button className="button mt-2">{t('loginButton')}</button>
          </div>

          <div className="loginContainer">
            <h1 className="headingOne">{t('loginMethodTwo')}</h1>
            <img src="/images/mobile.jpg" alt="loginImage" className="imageLogin" />
            <div className="mobileContainer">
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder={t('loginMethodTwoDescription')}
                className="form-control mb-3 mt-3 p-2"
                value={mobileNumber}
                required
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  setIsMobileNumberFilled(true);
                }}
              />
              {!isMobileNumberFilled && <p style={{ color: 'red' }}>{t('mobileNumberRequired')}</p>}
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
