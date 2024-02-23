import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './index.css'; 

const OtpInfo = () => {
    const [countdown, setCountdown] = useState(120);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 0) {
                    clearInterval(timer);
                    setRedirectToLogin(true);
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (redirectToLogin) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="buildingInfoBg d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card bg-white mb-3 shadow rounded border-0 pb-2" style={{ maxWidth: '85%', height: '750px', marginTop: '50px', display: 'flex', padding: '40px' }}>
                <h3 className="subHeadings" style={{ textAlign: 'center', fontSize: '1.8em', marginBottom: '0', marginTop: '5px' }}>Login with Mobile PKI</h3>
                <div className="imageContainer" style={{ width: '25%', borderRight: '1px solid #ccc', padding: '20px', marginTop: '100px', marginLeft: '300px' }}>
                    <img src="/images/mobile.jpg" alt="loginImage" className="imageLogin" style={{ width: '110%', height: 'auto' }} />
                </div>
                <div className="contentContainer" style={{ flex: '1', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                    <div className="p-3" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', marginBottom: '150px', marginTop: '120px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 className='subHeadings' style={{ fontSize: '1.0em', color: '#00004d', marginRight: '10px' }}>Your verification code is:</h3>
                            <TextField
                                id="verification-code"
                                label="verification"
                                defaultValue=""
                                disabled
                                variant="outlined"
                                sx={{ width: '250px', height: '60px', marginTop: '0' }} // Adjust width and marginTop here
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 className='subHeadings' style={{ fontSize: '1.0em', color: '#00004d', marginRight: '10px' }}>Mobile number used for identification is:</h3>
                            <TextField
                                id="mobile-number"
                                label="Mobile Number"
                                defaultValue=""
                                disabled
                                variant="outlined"
                                sx={{ width: '250px', height: '60px', marginTop: '0' }} // Adjust width and marginTop here
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2px' }}>
                        <h3 className='subHeadings' style={{ fontSize: '1.1em', color: '#00004d', marginBottom: '0' }}>Note: " Please make sure that you see the same verification code on your mobile device before entering PIN code. If you see a different verification code, do not enter your PIN code. " </h3>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button className="buttonAdd p-2" style={{ width: '100px', height: '40px' }} onClick=''>
                            Confirm
                        </button>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <strong style={{ color: 'red' }}>Session Expires In: <span>{countdown} seconds</span></strong>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OtpInfo;