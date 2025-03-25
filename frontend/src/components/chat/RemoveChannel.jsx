import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useRemoveChannelMutation} from "../../slices/channelsApi.js";
import {useSelector, useDispatch} from "react-redux";
import {setRemovingChannel} from "../../slices/removingChannel.js";
import { useTranslation } from 'react-i18next';

export default function RemoveChannel() {

  const removingChannelId = useSelector(state => state.removingChannel.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(setRemovingChannel(null));
  }
  const handleSubmit = async () => {
    try {
      await removeChannel(removingChannelId);
      dispatch(setRemovingChannel(null));
    } catch (e) {
      console.error('Failed to remove channel', e);
    }
  };

  const [
    removeChannel,
    {error: removeChannelError, isLoading: isRemovingChannel},
  ] = useRemoveChannelMutation();

  return (
    <Modal show={removingChannelId !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.channels.form.title_remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button type="button" className={"me-2 btn btn-secondary"} onClick={handleClose} disabled={isRemovingChannel}>
          {t('form.fields.cancel')}
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isRemovingChannel}>{t('form.fields.submit')}</Button>
      </Modal.Body>
    </Modal>
  );
}
