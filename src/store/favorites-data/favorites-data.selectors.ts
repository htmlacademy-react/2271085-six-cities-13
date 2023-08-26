import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { FavoritesData } from '../../types/favorites-data';
import { NameSpace } from '../../const';

export const getFavorites = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.favorites
);

export const getFetchingStatusFavorites = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.fetchingStatusFavorites
);
