import { Comments } from './types';
import { RequestStatus } from '../const';

export type ReviewsData = {
  reviews: Comments;
  fetchingStatusReviews: RequestStatus;
  sendingStatusReview: RequestStatus;
};
