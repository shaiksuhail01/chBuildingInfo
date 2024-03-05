import React, { useState, useEffect } from 'react';
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
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberFilled, setIsMobileNumberFilled] = useState(true);
  const [sessionId, setSessionId] = useState('');
  const [encodedMobileNum, setEncodedMobileNum] = useState('');
  const [appName, setAppName] = useState('');
  
  useEffect(() => {
   
  }, []);





  const generateSessionId = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  };

  const onClickLoginButton = async () => { // Marking function as async
    if (mobileNumber.trim() !== '') {
      const encodedMobile = btoa(mobileNumber);
      setEncodedMobileNum(encodedMobile);
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setAppName('MM-ESER');
      setIsMobileNumberFilled(true);
     
  
      try {
        const response = await fetch('http://it7863:8080/api/v1/customer/civilauthoncr?crnumber=12345&cvnumber=12345');
        
        if (true) {
       // if (response.ok) {
        //  const responseData = await response.text(); // Get text response
        const responseData = 'Authorized User';
          console.log("Hello");
          if (responseData === 'Authorized User') {
            window.location.href = '/Requests-Form'; 
          } else {
            alert('Un-Authorised User..');
          }
        } else {
         // alert(`Error: ${response.status}`);
        }
      } catch (error) {
        console.log('Error In fetching FlagType:', error);
        alert('Error in fetching data.');
      }
      
    } else {
      setIsMobileNumberFilled(false);
    }
  };
  

  useEffect(() => {
    // You can access encodedMobileNum and sessionId here
    // console.log(encodedMobileNum);
    // console.log(sessionId);
    // console.log(appName);
  }, [encodedMobileNum, sessionId, appName]);

  const isArabic = i18n.language === 'ar';


  return (
    <div className="mainContainer">
      <Header />
      <div className="loginPagesContainer">
        <h1 className="loginHeader">{t('loginHeader')}</h1>
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
                    className={`mb-3 mt-3 ${isArabic ? 'rtl' : ''}`}
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setIsMobileNumberFilled(true);
                    }}
                    onClick={() => setIsMobileNumberFilled(true)}
                  />
                </CacheProvider>
              ) : (
                <>
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
                </>
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
