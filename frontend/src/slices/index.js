import { configureStore } from '@reduxjs/toolkit';
import jwtToken from './jwt.js';
import user from './user.js';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';
import openChannel from './openChannel.js';
import chatMessages from './chatMessages.js';
import RemovingChannel from './removingChannel.js';
import RenamingChannel from './renamingChannel.js';
import CreatingChannel from './creatingChannel.js';

export default configureStore({
  reducer: {
    jwtToken,
    user,
    openChannel,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    chatMessages,
    removingChannel: RemovingChannel,
    renamingChannel: RenamingChannel,
    creatingChannel: CreatingChannel,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware).concat(messagesApi.middleware),
});
