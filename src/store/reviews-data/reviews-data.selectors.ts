import { createSelector } from '@reduxjs/toolkit';
import { ReviewsData } from '../../types/reviews-data';
import { State } from '../../types/state';
import { FetchingNameSpace } from '../../const';

export const getReviews = createSelector(
  (state: State) => state[FetchingNameSpace.Reviews],
  (state: ReviewsData) => state.reviews
);

export const getSendingStatusReview = createSelector(
  (state: State) => state[FetchingNameSpace.Reviews],
  (state: ReviewsData) => state.sendingStatusReview
);


