import { Comment } from '../../types/types';
import { months } from '../../const';

function ReviewItem({comment, avatarUrl}: {comment: Comment; avatarUrl: string}): JSX.Element {

  const date = new Date(comment.date);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return(
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width:`${String(comment.rating / 5 * 100)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={comment.date}>
          {`${month} ${year}`}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
