import filterText from "../utils/filter.js"

const filterChannelName = (store) => (next) => (action) => {
  if (action.type === 'channels/executeQuery/fulfilled') {
    const originalPayload = action.payload;
    const decoratedPayload = originalPayload.map((channel) => {
      channel.name = filterText(channel.name);
      return channel;
    });
    const decoratedAction = { ...action, payload: decoratedPayload };

    return next(decoratedAction);
  }

  return next(action);
};

export default filterChannelName;
