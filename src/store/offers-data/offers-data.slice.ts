import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction, addFavorite, deleteFavorite } from '../api-actions';
import { FetchingNameSpace, RequestStatus, CityMap } from '../../const';
import { OffersData } from '../../types/offers-data';
import { City } from '../../types/offer-data';

const initialState: OffersData = {
  offers: [],
  fetchingStatusOffers: RequestStatus.Unsent,
  city: CityMap.Paris,
};

export const offersData = createSlice({
  name: FetchingNameSpace.Offers,
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
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const updateOffer = action.payload;
        const currentOffer = state.offers.findIndex((offer) => offer.id === updateOffer.id);
        if (currentOffer > -1) {
          state.offers[currentOffer].isFavorite = true;
        }
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const updateOffer = action.payload;
        const currentOffer = state.offers.findIndex((offer) => offer.id === updateOffer.id);

        if (currentOffer > -1) {
          state.offers[currentOffer].isFavorite = false;
        }
      });
  },
});

export const { changeCity } = offersData.actions;
