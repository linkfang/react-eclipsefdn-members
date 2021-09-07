import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function ModalWindow({ title, content, handleProceed, shouldOpen, setShouldOpen, cancelText, yesText }) {
  return (
    <Dialog
      open={shouldOpen}
      onClose={() => setShouldOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShouldOpen(false)}>{cancelText || 'Cancel'}</Button>
        <Button onClick={handleProceed} color="primary" autoFocus>
          {yesText || 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
