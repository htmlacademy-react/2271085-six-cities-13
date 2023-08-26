import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferAction } from '../api-actions';
import { NameSpace, RequestStatus } from '../../const';
import { OfferData } from '../../types/offer-data';

const initialState: OfferData = {
  offer: null,
  fetchingStatusOffer: RequestStatus.Unsent
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.fetchingStatusOffer = RequestStatus.Pending;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.fetchingStatusOffer = RequestStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.fetchingStatusOffer = RequestStatus.Error;
      });
  }
});
