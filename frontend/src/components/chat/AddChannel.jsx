import {useAddChannelMutation, useGetChannelsQuery} from "../../slices/channelsApi.js";
import {useState, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import Button from 'react-bootstrap/Button';
import {setCreatingChannel} from "../../slices/creatingChannel.js";
import ChannelModal from "./channel/ChannelModal.jsx";
import { useTranslation } from 'react-i18next';

export default function AddChannel() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const onSubmit = (channel) => {
    if (channel?.data?.id) {
      dispatch(setCreatingChannel(channel.data.id));
    }
    setShow(false);
  }
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="light" size="xs" onClick={handleShow}>+</Button>
      {show && <ChannelModal modalTitle={t('chat.channels.action_add')} onSubmit={onSubmit} onClose={handleClose} />}
    </>

  );
}
