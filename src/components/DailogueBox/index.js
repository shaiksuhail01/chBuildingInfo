import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = ({ open, onClose, allFieldsFilled }) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubscribe = () => {
    // Implement the logic for handling the subscription or saving changes
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
      {allFieldsFilled ? (
        <>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to save the changes..?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubscribe}>Yes</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            All the fields are required
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill all the given fields to proceed next.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default DraggableDialog;
