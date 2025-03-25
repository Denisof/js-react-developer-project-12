import * as yup from "yup";
import i18next from "../../../i18n/i18next.js";


const createValidationSchema = (channelsData, channelContext) => {

  return yup.object().shape({
    channelName: yup.string()
      .required(i18next.t('chat.channels.form.errors.validation.nameRequired'))
      .min(3, i18next.t('form.errors.validation.min_length', { count: 3 }))
      .max(20, i18next.t('form.errors.validation.min_length', { count: 20 }))
      .test('unique', i18next.t('chat.channels.form.errors.validation.unique'),
        (value) => (channelContext && channelContext.name === value) ||
          !channelsData.some(channel => channel.name === value)
      )
  })
};  // eslint-disable-line

export default createValidationSchema;
