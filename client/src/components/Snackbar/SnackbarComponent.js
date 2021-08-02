import { React, useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';

function SnackbarComponent({ open, setOpen, message, setMessage }) {

  let vertical = 'bottom';
  let horizontal = 'right';

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={5000}
        key={vertical + horizontal}
      />
    </div>
  )
}

export default SnackbarComponent
