import styles from './logo.module.css';

function Logo (): JSX.Element{
  return(
    <div className="header__left">
      <a className="header__logo-link header__logo-link--active">
        <img
          className={styles.header__logo}
          src="img/logo.svg"
          alt="6 cities logo"
        />
      </a>
    </div>
  );
}

export default Logo;
