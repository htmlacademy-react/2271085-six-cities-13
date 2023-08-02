import { createReducer, current } from '@reduxjs/toolkit';
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
      console.log('setOffers', current(state));
    })
    .addCase(changeCity,(state, action) => {
      state.city = action.payload;
      console.log('changeCity', current(state));
    })
    .addCase(sortedOffersCity,(state, action) => {
      state.sortedOffers = state.offers.filter((item) => item.city.name === action.payload);
      console.log('sortedOffers', current(state));
    });
});

export {reducer};
