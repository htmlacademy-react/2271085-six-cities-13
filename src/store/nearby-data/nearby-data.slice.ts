import { createSlice } from '@reduxjs/toolkit';
import { FetchingNameSpace, RequestStatus } from '../../const';
import { fetchOfferNearbyAction} from '../api-actions';
import { NearbyData } from '../../types/nearby-data';

const initialState: NearbyData = {
  nearby: [],
  fetchingStatusNearby: RequestStatus.Unsent,
};

export const nearbyData = createSlice({
  name: FetchingNameSpace.Offer,
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferNearbyAction.pending, (state) => {
        state.fetchingStatusNearby = RequestStatus.Pending;
      })
      .addCase(fetchOfferNearbyAction.fulfilled, (state, action) => {
        state.fetchingStatusNearby = RequestStatus.Success;
        state.nearby = action.payload;
      })
      .addCase(fetchOfferNearbyAction.rejected, (state) => {
        state.fetchingStatusNearby = RequestStatus.Error;
      });
  }
});

