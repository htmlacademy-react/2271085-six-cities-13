import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction } from '../api-actions';
import { NameSpace, CityMap, RequestStatus } from '../../const';
import { OffersData } from '../../types/offers-data';
import { City } from '../../types/offer-data';

const initialState: OffersData = {
  offers: [],
  fetchingStatusOffers: RequestStatus.Unsent,
  city: CityMap.Paris,
  filterOffers: [],
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers:{
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.fetchingStatusOffers = RequestStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.fetchingStatusOffers = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.fetchingStatusOffers = RequestStatus.Error;
      });
  },
});

export const { changeCity } = offersData.actions;
