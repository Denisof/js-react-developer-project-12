import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import createValidationSchema from './validationSchema.js';
import { useAddChannelMutation, useGetChannelsQuery, useUpdateChannelMutation } from '../../../slices/channelsApi.js';

const ChannelModal = ({
  channel,
  onClose,
  onSubmit,
  modalTitle,
}) => {
  const [show, setShow] = useState(true);
  const channelNameRef = useRef();
  const { t } = useTranslation();
  const [
    addChannel,
    { error: addChannelError, isLoading: isAddingChannel },
  ] = useAddChannelMutation();
  const { data: channelsData = [] } = useGetChannelsQuery();
  const validationSchema = createValidationSchema(channelsData, channel);
  const [
    updateChannel,
    { error: updateChannelError, isLoading: isUpdatingChannel },
  ] = useUpdateChannelMutation();
  const inProgress = isAddingChannel || isUpdatingChannel;
  const channelFormik = useFormik(
    {
      validationSchema,
      initialValues: {
        channelName: channel ? channel.name : '',
      },
      onSubmit: async (values) => {
        try {
          const updatedChannel = await (channel
            ? updateChannel({ id: channel.id, name: values.channelName })
            : addChannel({ name: values.channelName })
          );
          onSubmit(updatedChannel);
        } catch (err) {
          console.error(err);
        }
      },
    },
  );
  const handleClose = () => {
    setShow(false);
    channelFormik.resetForm();
    onClose();
  };
  const error = addChannelError || updateChannelError || channelFormik.errors.channelName;
  useEffect(() => {
    if (show) {
      channelNameRef.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={channelFormik.handleSubmit}>
          <Form.Group>
            <Form.Label visuallyHidden htmlFor="channelName">
              {t('chat.channels.form.fields.name')}
            </Form.Label>
            <Form.Control
              ref={channelNameRef}
              required
              type="text"
              id="channelName"
              isInvalid={error}
              placeholder={t('chat.channels.form.fields.name')}
              autoComplete="channelName"
              name="channelName"
              onChange={channelFormik.handleChange}
              value={channelFormik.values.channelName}
            />
            <Form.Control.Feedback type="invalid" isInvalid={error}>
              {error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end mt-1">
            <Button
              ype="button"
              className="me-2 btn btn-secondary"
              onClick={handleClose}
              disabled={inProgress}
            >
              {t('form.fields.cancel')}
            </Button>
            <Button type="submit" disabled={inProgress}>{t('form.fields.submit')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ChannelModal;
