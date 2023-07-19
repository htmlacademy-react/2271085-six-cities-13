import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Settings } from './const';
import offers from './mocks/offers';
import detailedOffers from './mocks/detailedOffers';
import comments from './mocks/comments';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={Settings.Offers} offers={offers} detailedOffers={detailedOffers} comments={comments}/>
  </React.StrictMode>
);
