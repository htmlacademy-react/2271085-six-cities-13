import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { OfferData } from '../../types/offer-data';
import { FetchingNameSpace } from '../../const';

export const getOffer = createSelector(
  (state: State) => state[FetchingNameSpace.Offer],
  (state: OfferData) => state.offer
);

export const getFetchingStatusOffer = createSelector(
  (state: State) => state[FetchingNameSpace.Offer],
  (state: OfferData) => state.fetchingStatusOffer
);
