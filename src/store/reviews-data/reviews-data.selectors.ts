import { createSelector } from '@reduxjs/toolkit';
import { ReviewsData } from '../../types/reviews-data';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getReviews = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.reviews
);

export const getFetchingStatusReview = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.fetchingStatusReviews
);

export const getSendingStatusReview = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.sendingStatusReview
);


