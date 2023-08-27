import { createSelector } from '@reduxjs/toolkit';
import { UserData } from '../../types/user-data';
import { State } from '../../types/state';
import { FetchingNameSpace } from '../../const';

export const getUser = createSelector(
  (state: State) => state[FetchingNameSpace.User],
  (state: UserData) => state.user
);

export const getAuthorizationStatus = createSelector(
  (state: State) => state[FetchingNameSpace.User],
  (state: UserData) => state.authorizationStatus
);
