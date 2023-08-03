import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { filterOffers } from '../../store/action';

const filterList = [
  {
    name: 'Popular',
    type: 'popular'
  },
  {
    name: 'Price: low to high',
    type: 'high'
  },
  {
    name: 'Price: high to low',
    type: 'low'
  },
  {
    name: 'Top rated first',
    type: 'top'
  },
];

function FilterOffers() {
  const [active, setActive] = useState(false);
  const [currentFilter, setCurrenFilter] = useState('Popular');

  const dispatch = useAppDispatch();

  const filterOfferClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': active,
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setActive((prev) => !prev)}
      >
        {currentFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={filterOfferClass}>
        {filterList.map((item, i) => {
          const keyValue = `filter-${i}`;
          return (
            <li
              key={keyValue}
              className={classNames({
                'places__option': true,
                'places__option--active': currentFilter === item.name
              })}
              tabIndex={0}
              onClick={() => {
                setCurrenFilter(item.name);
                setActive((prev) => !prev);
                dispatch(filterOffers(item.type));
              }}
            >{item.name}
            </li>
          );
        })}
      </ul>
    </form>
  );
}


export default FilterOffers;
