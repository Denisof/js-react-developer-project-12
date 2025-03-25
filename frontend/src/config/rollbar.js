const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: import.meta.env.VITE_ENV || 'development',
  code_version: import.meta.env.VITE_CODE_VERSION,
  server: {
    root: import.meta.env.VITE_SERVER_ROOT,
    branch: import.meta.env.VITE_BRANCH,
  },
};

export default rollbarConfig;
