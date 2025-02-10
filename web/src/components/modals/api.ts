import { Modal } from '../../hooks/use-modal/types';
import { openModal } from '../../hooks/use-modal/useModal';
import { ConfirmationDialogData } from './ConfirmDialog';

export function openConfirmationDialog(data: ConfirmationDialogData) {
  openModal(Modal.CONFIRMATIONMODAL, data);
}
