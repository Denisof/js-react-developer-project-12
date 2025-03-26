const currentVersion = 'v1';
const routes = {
  apiBase: () => `/api/${currentVersion}`,
  loginPath: () => '/login',
  signUpPath: () => 'signup',
  channelsPath: () => '/channels',
  messagesPath: () => '/messages',
};

export default routes;
