import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  open: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
  onAbort: () => void;
}

export default function AlertDialog(props: AlertDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onConfirm}>Confirm</Button>
        <Button onClick={props.onAbort} autoFocus>
          Abort
        </Button>
      </DialogActions>
    </Dialog>
  );
}
