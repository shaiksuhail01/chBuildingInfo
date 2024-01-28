// ButtonLanguage.js
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Toolbar from '@mui/material/Toolbar';


function ButtonLanguage() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);

  const changeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    console.log(`Changing language to: ${newLanguage}`);
    i18n.changeLanguage(newLanguage)
      .then(() => {
        console.log('Language changed to:', newLanguage);
        setCurrentLanguage(newLanguage);
      })
      .catch((err) => console.error('Error changing language:', err));
  };

  return (
     
    <Toolbar >
    <Box sx={{ display: 'flex', justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-end', flexGrow: 1 }}>


      <Button
         sx={{
          color: '#ffffff',backgroundColor:'#001f3f'}}
        onClick={changeLanguage}
        
      >
       {(currentLanguage === 'en' ? 'العربية' : 'English')}
     
      </Button>
    </Box>
  </Toolbar>
  );
}

export default ButtonLanguage; // Export ButtonLanguage separately
