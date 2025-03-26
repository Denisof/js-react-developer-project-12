import filterText from '../utils/filter.js';

// eslint-disable-next-line no-unused-vars
const filterChannelName = (store) => (next) => (action) => {
  if (action.type === 'channels/executeQuery/fulfilled') {
    const originalPayload = action.payload;
    const decoratedPayload = originalPayload.map(
      (channel) => ({ ...channel, name: filterText(channel.name) }),
    );
    const decoratedAction = { ...action, payload: decoratedPayload };

    return next(decoratedAction);
  }

  return next(action);
};

export default filterChannelName;
