import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Logo from '../../components/logo/logo';
import { Offer, Offers, City } from '../../types/types';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../../const';

type MainProps = {
  offersCount: number;
  offers: Offers;
  city: City;
}

function Main ({offersCount, offers, city}: MainProps): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const activeCity = useAppSelector((state) => state.city);
  //const sortOffers = useAppSelector((state) => state.sortOffers);
  // console.log(sortOffers);

  const handleListItemHover = (id: string) => {
    const currentPoint = offers.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities.Main page</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList
              cities={CitiesList}
              currentCity={activeCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <OffersList
                offers={offers}
                onListItemHover={handleListItemHover}
                className="cities__places-list places__list tabs__content"
              />
            </section>
            <div className="cities__right-section">
              <Map
                block='cities'
                city={city}
                points={offers}
                selectedPoint={selectedPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default Main;
