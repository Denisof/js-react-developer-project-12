import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useGetMessagesQuery, useAddMessageMutation} from "../../slices/messagesApi.js";
import {useEffect} from "react";
import {setChatMessages} from "../../slices/chatMessages.js";
import * as yup from 'yup';
import { io } from "socket.io-client";
import {_} from 'lodash';
import { useTranslation } from 'react-i18next';



export default function ChannelChat() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chantMessages = useSelector(state => state.chatMessages.value);
  const {data: messagesData, error: messagesError, isLoading: messagesIsLoading, refetch: messagesRefetch} =
    useGetMessagesQuery();
  const [addMessage, { error: addMessageError, isLoading: isAddingMessage }] = useAddMessageMutation();
  const openChannel = useSelector(state => state.openChannel.value);
  const username = useSelector(state => state.user.value.username);
  useEffect(() => {
    if (openChannel !== null && messagesData && messagesData.length > 0) {
      dispatch(setChatMessages(messagesData.filter(message => message.channelId === openChannel.id)));
    }
  }, [messagesData, openChannel]);

  useEffect(() => {
    const socketInstance = io();
    socketInstance.on('newMessage', async (message) => {
      await messagesRefetch();
    });
    return () => {
      socketInstance.disconnect();
    }
  }, []);

  const schema = yup.object().shape({
    body: yup.string().required()
  });
  const submitMessageFormik = useFormik({
    validationSchema: schema,
    initialValues: {
      body: ''
    },
    onSubmit: async (values) => {
      try {
        await addMessage({ channelId: openChannel.id, body: values.body, username: username });
        submitMessageFormik.resetForm();
      } catch (err) {
        submitMessageFormik.setSubmitting(false);
      }
    },
  });
  return openChannel && messagesData && (
    <Row className="d-flex align-items-center justify-content-center h-100">
      <Row className="d-flex align-items-center justify-content-center h-100">
        <b>#{openChannel.name}</b>
        <br/>
        <span>{t('chat.active_chat.message_count', {count: chantMessages.length})}</span>
        <ul>
          {chantMessages.map(message => <li key={message.id}>{_.isObject(message.username) ? message.username.username : message.username}:{message.body}</li>)}
        </ul>
      </Row>
      <Row className="d-flex align-items-center justify-content-center h-100">
        <Form noValidate onSubmit={submitMessageFormik.handleSubmit}>
          <Form.Group>
            <Form.Control aria-label={t('chat.active_chat.form.fields.message_label')} required isInvalid={!!submitMessageFormik.errors.body} type="text" id="body"
                          autoComplete="body" name="body" onChange={submitMessageFormik.handleChange}
                          value={submitMessageFormik.values.body} placeholder={t('chat.active_chat.form.fields.message')}/>
            <Form.Control.Feedback type="invalid" tooltip isInvalid={submitMessageFormik.errors.body !== null}>
              {submitMessageFormik.errors.body}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" disabled={isAddingMessage}>{t('form.fields.submit')}</Button>
        </Form>
      </Row>
    </Row>
  );
}
