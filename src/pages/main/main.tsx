import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useCallback, useEffect } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer-data';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import { useAppSelector, useAppDispatch} from '../../hooks';
import { CitiesList } from '../../const';
import { MainEmptyPage } from '../main-empty/main-empty';
import FilterOffers from '../../components/filter-offers/filter-offers';
import { getActiveCity, getOffers} from '../../store/offers-data/offers-data.selectors';
import { sorting } from '../../utils';
import { fetchFavoritesAction } from '../../store/api-actions';


function Main (): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);

  const sortedOffers = useMemo(
    () => offers.slice().filter((item) => item.city.name === activeCity.name),[activeCity,offers]);

  const [currentSort, setCurrenSort] = useState('popular');

  const handleListItemHover = useCallback((id: string) => {
    const currentPoint = sortedOffers.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  }, [sortedOffers]);

  const handleFilterOffersChange = useCallback((newSort: string) => setCurrenSort(newSort), []);

  const offersList = useMemo(() => sorting[currentSort](sortedOffers), [currentSort, sortedOffers]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities.Main page</title>
      </Helmet>
      <Header />
      {
        sortedOffers.length ?
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CityList
                  cities={CitiesList}
                  currentCity={activeCity.name}
                />
              </section>
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortedOffers.length} places to stay in {activeCity.name}</b>
                  <FilterOffers onChange={handleFilterOffersChange} />
                  <OffersList
                    offers={offersList}
                    onListItemHover={handleListItemHover}
                    className="cities__places-list places__list tabs__content"
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    block='cities'
                    city={activeCity}
                    points={sortedOffers}
                    selectedPoint={selectedPoint}
                  />
                </div>
              </div>
            </div>
          </main>
          :
          <main className="page__main page__main--index page__main--index-empty">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CityList
                  cities={CitiesList}
                  currentCity={activeCity.name}
                />
              </section>
            </div>
            <MainEmptyPage />
          </main>
      }
    </div>

  );
}

export default Main;
