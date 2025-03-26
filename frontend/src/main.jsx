import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './slices/index.js';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n/i18next.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './config/rollbar.js';

/* eslint-disable functional/no-expression-statement */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18next}>
            <App/>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);
