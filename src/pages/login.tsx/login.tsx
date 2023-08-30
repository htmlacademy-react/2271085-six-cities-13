import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';
import {useRef, FormEvent, useState } from 'react';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';


const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z-A-Z]).{2,}$/;
const PASSWORD_INVALID_MESSAGE = 'Password must contain 2 chars or more than and at least one letter and one digit';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_INVALID_MESSAGE = 'Please, enter correct email address';

function Login() : JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const clickSubmitButtonHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(loginRef.current) {
      if (!EMAIL_REGEX.test(loginRef.current.value)) {
        setErrorMessage(EMAIL_INVALID_MESSAGE);
        return;
      }
    }

    if(passwordRef.current) {
      if (!PASSWORD_REGEX.test(passwordRef.current.value)) {
        setErrorMessage(PASSWORD_INVALID_MESSAGE);
        return;
      }
    }
    if (loginRef.current && passwordRef.current) {

      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };


  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Six cities.Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              onSubmit={clickSubmitButtonHandler}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              {errorMessage && <div className="login__input-wrapper form__input-wrapper">{errorMessage}</div>}
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
