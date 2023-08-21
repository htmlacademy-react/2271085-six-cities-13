import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';
import { changeCity } from '../../store/offers-data/offers-data.slice';
import { CityMap } from '../../const';


type CityListProps = {
  cities: string[];
  currentCity: string;
}
function CityList({ cities, currentCity}: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => {
        const keyValue = `${city}-${i}`;
        return (
          <li className="locations__item" key={keyValue}>
            <a
              className={classNames({
                'locations__item-link': true,
                'tabs__item': true,
                'tabs__item--active': currentCity === city
              })}
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changeCity(CityMap[city]));
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default CityList;
