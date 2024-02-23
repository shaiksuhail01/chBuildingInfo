
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import './index.css';
import Header from '../Header';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberFilled, setIsMobileNumberFilled] = useState(true);
  const [sessionId, setSessionId] = useState('');
  const [encodedMobileNum, setEncodedMobileNum] = useState('');
  const [appName, setAppName] = useState('');

  const generateSessionId = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  };

  const onClickLoginButton = () => {
    if (mobileNumber.trim() !== '') {
      const encodedMobile = btoa(mobileNumber);
      setEncodedMobileNum(encodedMobile);
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setIsMobileNumberFilled(true);
      setAppName('NEWCP');
      const formData = new FormData();
      formData.append('hPKI0', encodedMobile);
      formData.append('hPKI1', newSessionId);
      formData.append('hPKI2', 'NEWCP'); // Replace with actual value for appName

      fetch('https://isupport2.mm.gov.om/MMMobSecurity/syncClient', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            // Handle success
            console.log('Request successful');

          } else {
            // Handle error
            console.error('Request failed');
          }
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
        navigate('/otp-confirmInfo');
    }

  else {
      setIsMobileNumberFilled(false);
    }
  };

  useEffect(() => {
    // You can access encodedMobileNum and sessionId here
    console.log(encodedMobileNum);
    console.log(sessionId);
  }, [encodedMobileNum, sessionId]);

  const isArabic = i18n.language === 'ar';

  return (
    <div className='mainContainer'>
      <Header />
      <div className="loginPagesContainer">
        <h1 className='loginHeader'>{t('loginHeader')}</h1>
        <div className="loginfullPageContainer">
          <div className={`loginContainer ${isArabic ? 'rtl' : ''}`}>
            <h1 className={`${isArabic ? 'rtl' : ''}`}>{t('loginMethodOne')}</h1>
            <img src="/images/Login.jpg" alt="loginImage" className="imageLogin" />
            <p className={`${isArabic ? 'rtl' : ''}`}>{t('loginMethodOneDescription')}</p>
            <button className="button mt-2">{t('loginButton')}</button>
          </div>
          <div className={`loginContainer ${isArabic ? 'rtl' : ''}`}>
            <h1 className={`${isArabic ? 'rtl' : ''}`}>{t('loginMethodTwo')}</h1>
            <img src="/images/mobile.jpg" alt="loginImage" className="imageLogin" />
            <input type="hidden" name="hPKI0" value={encodedMobileNum} />
            <input type="hidden" name="hPKI1" value={sessionId} />
            <input type="hidden" name="hPKI2" value={appName} />
            <div className="mobileContainer">
              {i18n.language === 'ar' ? (
                <CacheProvider value={cacheRtl}>
                  <TextField
                    id="mobileNumber"
                    name="mobileNumber"
                    label={isMobileNumberFilled ? t('loginMethodTwoDescription') : <span className="error-text">{t('Required')}</span>}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    size="small"
                    className={`${isArabic ? 'rtl' : ''} mb-3 mt-3`}
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setIsMobileNumberFilled(true);
                    }}
                    onClick={() => setIsMobileNumberFilled(true)}
                  />
                </CacheProvider>
              ) : (
                <TextField
                  id="mobileNumber"
                  name="mobileNumber"
                  label={isMobileNumberFilled ? t('loginMethodTwoDescription') : <span className="error-text">{t('Required')}</span>}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  className={`${isArabic ? 'rtl' : ''} mb-3 mt-3`}
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    setIsMobileNumberFilled(true);
                  }}
                  onClick={() => setIsMobileNumberFilled(true)}
                />
              )}
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
