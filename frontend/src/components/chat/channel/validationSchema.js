import * as yup from 'yup';
import i18next from '../../../i18n/i18next.js';

const createValidationSchema = (channelsData, channelContext) => yup.object().shape({
  channelName: yup.string()
    .required(i18next.t('chat.channels.form.errors.validation.nameRequired'))
    .min(3, i18next.t('form.errors.validation.between_length', { min: 3, max: 20 }))
    .max(20, i18next.t('form.errors.validation.between_length', { min: 3, max: 20 }))
    .test(
      'unique',
      i18next.t('chat.channels.form.errors.validation.unique'),
      (value) => (channelContext && channelContext.name === value) || !channelsData.some(
        (channel) => channel.name === value,
      ),
    ),
});

export default createValidationSchema;
