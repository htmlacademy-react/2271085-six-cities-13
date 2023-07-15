import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './page404.module.css';

function Page404(): JSX.Element{
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>Six cities.Not found page</title>
      </Helmet>
      <h1>Страница не найдена</h1>
      <p>Извините, нам не удается найти такую страницу</p>
      <Link to='/'>
            Вернуться на главную
      </Link>
    </div>
  );
}

export default Page404;
