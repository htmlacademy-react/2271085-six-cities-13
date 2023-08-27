import { createSelector } from '@reduxjs/toolkit';
import { NearbyData } from '../../types/nearby-data';
import { State } from '../../types/state';
import { FetchingNameSpace } from '../../const';

export const getNearbyOffers = createSelector(
  (state: State) => state[FetchingNameSpace.OffersNearby],
  (state: NearbyData) => state.nearby
);

export const getFetchingStatusNearby = createSelector(
  (state: State) => state[FetchingNameSpace.OffersNearby],
  (state: NearbyData) => state.fetchingStatusNearby
);
