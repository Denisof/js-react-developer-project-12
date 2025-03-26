import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useRemoveChannelMutation } from '../../slices/channelsApi.js';
import { setRemovingChannel } from '../../slices/removingChannel.js';

const RemoveChannel = () => {
  const removingChannelId = useSelector((state) => state.removingChannel.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = () => {
    dispatch(setRemovingChannel(null));
  };
  const [
    removeChannel,
    { isLoading: isRemovingChannel },
  ] = useRemoveChannelMutation();
  const handleSubmit = async () => {
    try {
      await removeChannel(removingChannelId);
      dispatch(setRemovingChannel(null));
    } catch (e) {
      console.error('Failed to remove channel', e);
    }
  };
  return (
    <Modal show={removingChannelId !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.channels.form.title_remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          type="button"
          variant="secondary"
          className="me-2 btn btn-secondary"
          onClick={handleClose}
          disabled={isRemovingChannel}
        >
          {t('form.fields.cancel')}
        </Button>
        <Button
          type="submit"
          variant="danger"
          onClick={handleSubmit}
          disabled={isRemovingChannel}
        >
          {t('form.fields.submit')}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
