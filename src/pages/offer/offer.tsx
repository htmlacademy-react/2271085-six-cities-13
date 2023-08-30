import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction, fetchOfferNearbyAction, fetchReviewsAction, fetchFavoritesAction } from '../../store/api-actions';
import OfferImage from '../../components/offer-image/offer-image';
import OfferInsideItem from '../../components/offer-inside-item/offer-inside-item';
import ReviewItem from '../../components/reviews-item/reviews-item';
import CommentForm from '../../components/comment-form/comment-form';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus, MAX_REVIEWS_COUNT, MAX_RENDER_OFFER_IMAGES_COUNT } from '../../const';
import { getFetchingStatusOffer, getOffer } from '../../store/offer-data/offer-data.selectors';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';
import { getReviews } from '../../store/reviews-data/reviews-data.selectors';
import { getNearbyOffers } from '../../store/nearby-data/nearby-data.selectors';
import { getOffers } from '../../store/offers-data/offers-data.selectors';
import Bookmark from '../../components/bookmark/bookmark';
import { capitalizedString } from '../../utils';

function Offer(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isDetailedOfferDataLoading = useAppSelector(getFetchingStatusOffer);
  const offer = useAppSelector(getOffer);
  const offers = useAppSelector(getOffers);
  const reviews = useAppSelector(getReviews);
  const offersNearby = useAppSelector(getNearbyOffers);
  const currentOffer = offers.find((item) => item.id === id);
  const randomNearbyOffers = offersNearby.slice(0, 3);
  const randomNearbyMap = offersNearby.slice(0,3);
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchReviewsAction(id));
      dispatch(fetchOfferNearbyAction(id));
      dispatch(fetchFavoritesAction());
    }
  }, [id, dispatch]);

  const [activeFavorite, setActiveFavorite] = useState(currentOffer?.isFavorite);


  if (currentOffer) {
    randomNearbyMap.push(currentOffer);
  }


  const reviewsToRender = [...reviews]
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0,MAX_REVIEWS_COUNT);


  if(isDetailedOfferDataLoading !== 'SUCCESS') {
    return (
      <LoadingScreen />
    );
  }

  if (!offer){
    return <Navigate to='/not-found'/>;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Six cities.Offers</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.slice(0,MAX_RENDER_OFFER_IMAGES_COUNT).map((image) => (<OfferImage key={image} imageUrl={image} />))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className={`offer__mark ${offer.isPremium ? '' : 'visually-hidden'}`}>
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <Bookmark
                  id={offer.id}
                  isFavorite={activeFavorite}
                  type='offer'
                  large
                  onClick={() => setActiveFavorite((prev) => !prev)}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${String(offer.rating / 5 * 100)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{capitalizedString(offer.type)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (<OfferInsideItem key={good} item={good} />))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ul className="reviews__list">
                  {reviewsToRender.map((comment) => (<ReviewItem key={comment.id} comment={comment} />))}
                </ul>
                {isAuthorizationStatus === AuthorizationStatus.Auth &&
                <CommentForm id={id ?? ''} />}
              </section>
            </div>
          </div>
          <Map
            block='offer'
            city={offer.city}
            points={randomNearbyMap}
            selectedPoint={currentOffer}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList
              offers={randomNearbyOffers}

              className="near-places__list places__list"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
