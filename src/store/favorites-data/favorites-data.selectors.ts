import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { FavoritesData } from '../../types/favorites-data';
import { FetchingNameSpace } from '../../const';

export const getFavorites = createSelector(
  (state: State) => state[FetchingNameSpace.Favorites],
  (state: FavoritesData) => state.favorites
);
