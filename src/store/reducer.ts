import { createReducer } from '@reduxjs/toolkit';
import {loadOffer, loadReviews, addReview, loadOffersNearby, setOffersDataLoadingStatus, setDetailedOfferDataLoadingStatus, dropSendingStatus } from './action';
import { Offers, DetailedOffer, Comments } from '../types/types';
import { RequestStatus } from '../const';
import { postReview } from './api-actions';

type InitialState = {

  currentOffer: DetailedOffer | null;
  reviews: Comments;
  offersNearby: Offers;
  isOffersDataLoading: boolean;
  isDetailedOfferDataLoading: boolean;

  sendingReviewStatus: string;
}

const initialState: InitialState = {

  currentOffer: null,
  reviews: [],
  offersNearby: [],
  isOffersDataLoading: false,
  isDetailedOfferDataLoading: true,
  sendingReviewStatus: RequestStatus.Unsent,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setDetailedOfferDataLoadingStatus,(state, action) =>{
      state.isDetailedOfferDataLoading = action.payload;
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
    });
});

export {reducer};
