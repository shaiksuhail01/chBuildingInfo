import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import "./index.css"

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = ({ open, onClose, allFieldsFilled }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const handleClose = () => {
    onClose();
  };

  const handleSubscribe = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title" className={`${isArabic ? 'rtl' : ''}`}>
      {allFieldsFilled ? (
        <>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            {t('confirmationTitle')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={isArabic ? 'rtl' : ''}>
              {t('confirmationText')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              {t('cancelButton')}
            </Button>
            <Button onClick={handleSubscribe}>{t('yesButton')}</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            {t('requiredFieldsTitle')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={isArabic ? 'rtl' : ''}>
              {t('requiredFieldsText')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              {t('okButton')}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default DraggableDialog;
