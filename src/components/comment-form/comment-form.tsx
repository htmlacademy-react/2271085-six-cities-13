import {useState} from 'react';
import RatingStar from '../rating-star/rating-star';

// type CommentFormProps = {
//   rating: number;
//   comment: string;
// }

function CommentForm(): JSX.Element {
  const [form, setForm] = useState({rating: 0, comment: ''});
  const ratingStarsItems = [5,4,3,2,1].map((star) => (
    <RatingStar
      key={star}
      star={star}
      onChange={(evt) => {
        setForm({
          ...form,
          rating: Number(evt.target.value),
        });
      }}
    />
  ));

  return (
    <form className="reviews__form form" action="#" method="post">
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
        value={form.comment}
        onChange={(evt) => {
          setForm({
            ...form,
            comment: evt.target.value
          });
        }}
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
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
