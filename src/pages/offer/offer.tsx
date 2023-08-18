import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction } from '../../store/api-actions';
import OfferImage from '../../components/offer-image/offer-image';
import OfferInsideItem from '../../components/offer-inside-item/offer-inside-item';
import ReviewItem from '../../components/reviews-item/reviews-item';
import CommentForm from '../../components/comment-form/comment-form';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus, MAX_REVIEWS_COUNT } from '../../const';

function Offer(): JSX.Element {
  const { id } = useParams();
  // const offer = useAppSelector((state) => state.currentOffer);
  // const reviews = useAppSelector((state) => state.reviews);
  // const offersNearby = useAppSelector((state) => state.offersNearby);
  const {offer, reviews, offersNearby} = useAppSelector((state) => ({
    offer: state.currentOffer,
    reviews: state.reviews,
    offersNearby: state.offersNearby
  }));
  const dispatch = useAppDispatch();
  const isDetailedOfferDataLoading = useAppSelector((state) => state.isDetailedOfferDataLoading);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const reviewsToRender = [...reviews]
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0,MAX_REVIEWS_COUNT);


  // useEffect(() => {
  //   dispatch(fetchOfferAction(id as string));
  // }, [id, dispatch]);
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }
  }, [id, dispatch]);

  if(isDetailedOfferDataLoading) {
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
              {offer.images.map((image) => (<OfferImage key={image} imageUrl={image} />))}
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
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${String(offer.rating / 5 * 100)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {offer.maxAdults}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">{offer.price}</b>
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
            points={offersNearby}
            selectedPoint={undefined}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList
              offers={offersNearby}

              className="near-places__list places__list"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
