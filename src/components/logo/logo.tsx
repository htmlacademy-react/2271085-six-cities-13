import styles from './logo.module.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo (): JSX.Element{
  return(
    <div className="header__left">
      <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
        <img
          className={styles.header__logo}
          src="img/logo.svg"
          alt="6 cities logo"
        />
      </Link>
    </div>
  );
}

export default Logo;
