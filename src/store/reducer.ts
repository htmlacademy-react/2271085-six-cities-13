import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortedOffersCity, filterOffers, loadOffers, loadOffer, loadReviews, loadOffersNearby, setOffersDataLoadingStatus, requireAuthorization } from './action';
import { Offers, DetailedOffer, Comments } from '../types/types';
import { AuthorizationStatus } from '../const';

type InitialState = {
  city: string;
  offers: Offers;
  sortedOffers: Offers;
  filterOffers: Offers;
  currentOffer: DetailedOffer | null;
  reviews: Comments;
  offersNearby: Offers;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  sortedOffers: [],
  filterOffers: [],
  currentOffer: null,
  reviews: [],
  offersNearby: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity,(state, action) => {
      state.city = action.payload;
    })
    .addCase(sortedOffersCity,(state, action) => {
      state.sortedOffers = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(filterOffers, (state, action) => {
      switch (action.payload) {
        case 'high':
          state.sortedOffers.sort((a, b) => a.price - b.price);
          break;
        case 'low':
          state.sortedOffers.sort((a, b) => b.price - a.price);
          break;
        case 'top':
          state.sortedOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffers = state.sortedOffers;
      }
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
