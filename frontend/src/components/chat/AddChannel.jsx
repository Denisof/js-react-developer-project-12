import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ChannelModal from './channel/ChannelModal.jsx';
import { setCreatingChannel } from '../../slices/creatingChannel.js';

const AddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const onSubmit = (channel) => {
    if (channel?.data?.id) {
      dispatch(setCreatingChannel(channel.data.id));
    }
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="light" size="xs" onClick={handleShow}>+</Button>
      {show && <ChannelModal modalTitle={t('chat.channels.action_add')} onSubmit={onSubmit} onClose={handleClose} />}
    </>

  );
};
export default AddChannel;
