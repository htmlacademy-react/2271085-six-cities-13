import { createSlice } from '@reduxjs/toolkit';
import { FetchingNameSpace, RequestStatus } from '../../const';
import { FavoritesData } from '../../types/favorites-data';
import { fetchFavoritesAction, addFavorite, deleteFavorite } from '../api-actions';
import { clearFavoriteAction } from '../action';

const initialState: FavoritesData = {
  favorites: [],
  fetchingStatusFavorites: RequestStatus.Unsent
};

export const favoritesData = createSlice({
  name: FetchingNameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.fetchingStatusFavorites = RequestStatus.Pending;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.fetchingStatusFavorites = RequestStatus.Success;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.fetchingStatusFavorites = RequestStatus.Error;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const updateOffer = action.payload;
        state.favorites = state.favorites.filter((offer) => offer.id !== updateOffer.id);
      })
      .addCase(clearFavoriteAction, (state) => {
        state.favorites = [];
      });
  },
});
