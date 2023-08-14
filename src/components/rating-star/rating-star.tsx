import {Fragment} from 'react';
import { Stars } from '../../const';

type RatingStarProps = {
  star: number;
  disabled: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function RatingStar({star, disabled, onChange}: RatingStarProps): JSX.Element{
  return (
    <Fragment>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={star}
        id={`${star}-stars`}
        type="radio"
        disabled={disabled}
        onChange={(evt) => onChange(evt)}
      />
      <label
        htmlFor={`${star}-stars`}
        className="reviews__rating-label form__rating-label"
        title={Stars[star - 1]}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </Fragment>
  );
}

export default RatingStar;
