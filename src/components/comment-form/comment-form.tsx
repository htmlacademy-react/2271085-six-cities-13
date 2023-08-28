import {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import RatingStar from '../rating-star/rating-star';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { postReview } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { getSendingStatusReview } from '../../store/reviews-data/reviews-data.selectors';
import { dropSendingStatusReview } from '../../store/reviews-data/reviews-data.slice';
import { toast } from 'react-toastify';


const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

type CommentFormProps = {
  id: string;
}

function CommentForm({ id }: CommentFormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getSendingStatusReview);

  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleTextCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>){
    evt.preventDefault();
    dispatch(
      postReview({reviewData: {comment, rating: Number(rating)}, id})
    );
    setRating('0');
  }

  const ratingStarsItems = [5,4,3,2,1].map((star) => (
    <RatingStar
      key={star}
      star={star}
      disabled={isSubmitting}
      onChange={handleRatingChange}
      checked={Number(rating) === star}
    />
  ));

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      switch (sendingStatus) {
        case RequestStatus.Success:
          setComment('');
          setRating('');
          dispatch(dropSendingStatusReview());
          setIsSubmitting(false);
          break;
        case RequestStatus.Pending:
          setIsSubmitting(true);
          break;
        case RequestStatus.Error:
          toast.warn('Комментарий не отправлен');
          setIsSubmitting(false);
          break;
        default:
          setIsSubmitting(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [sendingStatus, dispatch]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingStarsItems}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={isSubmitting}
        onChange={handleTextCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
