import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MainLayout } from './layouts/mainLayout';
import { routes } from './routes';
import { Link } from 'react-router-dom';
import { store, useAppSelector } from './redux/store';

import styles from './App.module.css';

const App: FC = () => {
  const state = useAppSelector((state) => state);
  console.log(state);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={styles.wrapper}>
          <nav>
            <ul style={{ display: 'none', gap: '30px' }}>
              {routes.map((route) => (
                <li key={route.id}>
                  <Link key={route.id} to={route.path}>
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <MainLayout>
            <main className={styles.main}>
              <Routes>
                {routes.map((route) => (
                  <Route key={route.id} path={route.path} element={<route.element />} />
                ))}
              </Routes>
            </main>
          </MainLayout>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
