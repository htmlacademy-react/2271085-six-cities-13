import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer-data';
import Bookmark from '../bookmark/bookmark';
import { useState } from 'react';

type FavoriteOffersProps = {
  offer: Offer;
}

function FavoriteCard ({offer}: FavoriteOffersProps): JSX.Element {
  const {isFavorite} = offer;

  const [activeFavorite, setActiveFavorite] = useState(isFavorite);
  return (
    <article className="favorites__card place-card">
      <div className={`place-card__mark ${offer.isPremium ? '' : 'visually-hidden'}`}>
        <span>Premium</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offer.price}</b>
            <span className="place-card__price-text">
              /&nbsp;night
            </span>
          </div>
          <Bookmark id={offer.id} type='place-card' isFavorite={activeFavorite} onClick={() => setActiveFavorite((prev) => !prev)}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${String(offer.rating / 5 * 100)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
