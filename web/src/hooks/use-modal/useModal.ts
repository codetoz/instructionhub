import { useSearchParams } from 'react-router-dom';
import { Modal } from './types';
import {
  deleteSearchParam,
  getLocation,
  setSearchParam,
} from '../../routes/Router';
import { Action } from '../../utils/Action';
import { useEffect, useState } from 'react';

const Q = 'openedModal';
let modalData: Record<string, any> | undefined = undefined;
const updateModalDataAction = new Action<Record<string, any> | undefined>();

export const openModal = (name: Modal, data?: Record<string, any>) => {
  setSearchParam(Q, name);
  updateModalDataAction.invoke(data);
  modalData = data;
};

export const closeCurrentModal = () => {
  const location = getLocation();
  const searchParams = new URLSearchParams(location.search);
  const openedModal = searchParams.get(Q);
  modalData = undefined;
  if (!openedModal) return;
  if (window.history.length > 2) {
    window.history.back();
    return;
  }
  deleteSearchParam(Q, {
    replace: true,
  });
};

export function useOpenedModal() {
  const [searchParams] = useSearchParams();
  const openedModal = searchParams.get(Q);

  const [data, setData] = useState(modalData);

  useEffect(() => {
    return updateModalDataAction.add(setData);
  }, []);

  return { name: openedModal, data };
}

export const modalApi = { closeCurrentModal, openModal };
