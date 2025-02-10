import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { closeCurrentModal } from '../../hooks/use-modal/useModal';

export interface ConfirmationDialogData {
  title?: string;
  contentText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onClose?: () => void;
  onConfirm: () => void;
}

interface ConfirmDialogProps {
  open: boolean;
  data: ConfirmationDialogData;
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    title = 'Confirm',
    contentText = 'Are you sure?',
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel',
    onClose = closeCurrentModal,
    onConfirm,
  } = props.data;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelButtonText}</Button>
        <Button
          onClick={handleConfirm}
          autoFocus
          color="error"
          variant="contained"
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
