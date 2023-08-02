import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import detailedOffers from './mocks/detailedOffers';
import comments from './mocks/comments';
import city from './mocks/city';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        detailedOffers={detailedOffers}
        comments={comments}
        city={city}
      />
    </Provider>
  </React.StrictMode>
);
