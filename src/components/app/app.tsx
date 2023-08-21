import Main from '../../pages/main/main';
import Login from '../../pages/login.tsx/login';
import FavoritePage from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';
import { Route, Routes} from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  // const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  // if(isOffersDataLoading === RequestStatus.Pending) {
  //   return (
  //     <LoadingScreen />
  //   );
  // }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={ <Main/>}
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritePage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer}>
            <Route
              path=':id'
              element={
                <Offer />
              }
            />
          </Route>
          <Route
            path='not-found'
            element={<Page404 />}
          />
          <Route
            path='*'
            element={<Page404 />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
