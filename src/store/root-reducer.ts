import { combineReducers } from '@reduxjs/toolkit';
import { FetchingNameSpace } from '../const';
import { offersData } from './offers-data/offers-data.slice';
import { userData } from './user-data/user-data.slice';
import { offerData } from './offer-data/offer-data.slice';
import { reviewsData } from './reviews-data/reviews-data.slice';
import { nearbyData } from './nearby-data/nearby-data.slice';
import { favoritesData } from './favorites-data/favorites-data.slice';

export const rootReducer = combineReducers({
  [FetchingNameSpace.User]: userData.reducer,
  [FetchingNameSpace.Offers]: offersData.reducer,
  [FetchingNameSpace.Offer]: offerData.reducer,
  [FetchingNameSpace.Reviews]: reviewsData.reducer,
  [FetchingNameSpace.OffersNearby]: nearbyData.reducer,
  [FetchingNameSpace.Favorites]: favoritesData.reducer,
});
