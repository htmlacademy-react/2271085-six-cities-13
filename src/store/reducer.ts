import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortedOffersCity, filterOffers, loadOffers, loadOffer, loadReviews, addReview, loadOffersNearby, setOffersDataLoadingStatus, setDetailedOfferDataLoadingStatus, requireAuthorization, dropSendingStatus } from './action';
import { Offers, DetailedOffer, Comments } from '../types/types';
import { AuthorizationStatus, RequestStatus } from '../const';
import { postReview } from './api-actions';

type InitialState = {
  city: string;
  offers: Offers;
  sortedOffers: Offers;
  filterOffers: Offers;
  currentOffer: DetailedOffer | null;
  reviews: Comments;
  offersNearby: Offers;
  isOffersDataLoading: boolean;
  isDetailedOfferDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  sendingReviewStatus: string;
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
  isDetailedOfferDataLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  sendingReviewStatus: RequestStatus.Unsent,
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
    .addCase(setDetailedOfferDataLoadingStatus,(state, action) =>{
      state.isDetailedOfferDataLoading = action.payload;
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
    .addCase(postReview.pending, (state) => {
      state.sendingReviewStatus = RequestStatus.Pending;
    })
    .addCase(postReview.fulfilled, (state) => {
      state.sendingReviewStatus = RequestStatus.Success;
    })
    .addCase(postReview.rejected, (state) => {
      state.sendingReviewStatus = RequestStatus.Error;
    })
    .addCase(dropSendingStatus, (state) => {
      state.sendingReviewStatus = RequestStatus.Unsent;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
