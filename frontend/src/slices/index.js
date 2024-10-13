import { configureStore } from '@reduxjs/toolkit';
import jwtToken from './jwt.js';
import user from './user.js';

export default configureStore({
    reducer: {
        jwtToken: jwtToken,
        user: user,
    },
});
