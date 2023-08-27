import { createSlice } from '@reduxjs/toolkit';
import { FetchingNameSpace, RequestStatus } from '../../const';
import { fetchReviewsAction, postReview } from '../api-actions';
import { ReviewsData } from '../../types/reviews-data';

const initialState: ReviewsData = {
  reviews: [],
  fetchingStatusReviews: RequestStatus.Unsent,
  sendingStatusReview: RequestStatus.Unsent,
};

export const reviewsData = createSlice({
  name: FetchingNameSpace.Reviews,
  initialState,
  reducers: {
    dropSendingStatusReview(state) {
      state.sendingStatusReview = RequestStatus.Unsent;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.fetchingStatusReviews = RequestStatus.Pending;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.fetchingStatusReviews = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.fetchingStatusReviews = RequestStatus.Error;
      })
      .addCase(postReview.pending, (state) => {
        state.sendingStatusReview = RequestStatus.Pending;
      })
      .addCase(postReview.fulfilled, (state,action) => {
        state.sendingStatusReview = RequestStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.sendingStatusReview = RequestStatus.Error;
      });
  }
});

export const { dropSendingStatusReview} = reviewsData.actions;

