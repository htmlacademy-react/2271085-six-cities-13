import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers as setOffers,sortedOffersCity } from './action';
import { Offers } from '../types/types';

type InitialState = {
  city: string;
  offers: Offers;
  sortedOffers: Offers;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  sortedOffers: [],
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
    });
});

export {reducer};
