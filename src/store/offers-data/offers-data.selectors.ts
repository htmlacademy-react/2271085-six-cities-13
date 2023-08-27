import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { OffersData } from '../../types/offers-data';
import { FetchingNameSpace } from '../../const';

export const getOffers = createSelector(
  (state: State) => state[FetchingNameSpace.Offers],
  (state: OffersData) => state.offers
);

export const getFetchingStatusOffers = createSelector(
  (state: State) => state[FetchingNameSpace.Offers],
  (state: OffersData) => state.fetchingStatusOffers
);

export const getActiveCity = createSelector(
  (state: State) => state[FetchingNameSpace.Offers],
  (state: OffersData) => state.city
);

