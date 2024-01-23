import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
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
    <React.Fragment>
     <AppBar sx={{ 
        backgroundColor:'#e6f7ff',height:'100px'}}>
        <Toolbar>
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
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
