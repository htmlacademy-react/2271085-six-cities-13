import { createSelector } from '@reduxjs/toolkit';
import { NearbyData } from '../../types/nearby-data';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getNearbyOffers = createSelector(
  (state: State) => state[NameSpace.OffersNearby],
  (state: NearbyData) => state.nearby
);

export const getFetchingStatusNearby = createSelector(
  (state: State) => state[NameSpace.OffersNearby],
  (state: NearbyData) => state.fetchingStatusNearby
);
