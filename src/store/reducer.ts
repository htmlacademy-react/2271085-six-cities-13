import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers, sortedOffersCity, filterOffers } from './action';
import { Offers } from '../types/types';

type InitialState = {
  city: string;
  offers: Offers;
  sortedOffers: Offers;
  filterOffers: Offers;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  sortedOffers: [],
  filterOffers: [],
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers,(state, action) => {
      state.offers = action.payload;
    })
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
    });
});

export {reducer};
