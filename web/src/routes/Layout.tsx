import { Outlet } from 'react-router-dom';
import TheHeader from '../components/layout/TheHeader';
import ConfirmDialog, {
  ConfirmationDialogData,
} from '../components/modals/ConfirmDialog';
import { useOpenedModal } from '../hooks/use-modal/useModal';
import { Modal } from '../hooks/use-modal/types';

export default function Layout() {
  const { name: openedModalName, data: openedModalData } = useOpenedModal();
  return (
    <>
      {openedModalName === Modal.CONFIRMATIONMODAL && (
        <ConfirmDialog open data={openedModalData as ConfirmationDialogData} />
      )}
      <TheHeader />
      <Outlet />
    </>
  );
}
