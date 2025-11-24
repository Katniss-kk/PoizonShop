import './App.css';
import { Header, Footer } from './component/pages/indexPage';
import { useEffect } from 'react';
import {
  MainPage,
  PageItems,
  QuestionsPage,
  DeliveryPage,
  ReturnPage,
  PersonalDataPage,
  ConditionsPage,
  MobileMenuPage,
} from './component/singlePage';

import store from './service/store';
import { Provider } from 'react-redux';

// МЕНЯЕМ BrowserRouter на HashRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './service/store';
import { fetchProductsThunk } from './service/slices/productsSlice';
import type { RootState } from './service/store';
import { CardOrder, CardSelected } from './component/UI';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();
  const { productsShoes, productsCloth, productsAcs, loading } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/cloth"
          element={
            <PageItems
              items={productsCloth}
              title={'Одежда'}
              catalog={'Главная / Одежда'}
              loading={loading}
            />
          }
        />
        <Route
          path="/shoes"
          element={
            <PageItems
              items={productsShoes}
              title={'Обувь'}
              catalog={'Главная / Обувь'}
              loading={loading}
            />
          }
        />
        <Route
          path="/accessories"
          element={
            <PageItems
              items={productsAcs}
              title={'Аксессуары'}
              catalog={'Главная / Аксессуары'}
              loading={loading}
            />
          }
        />
        <Route path="/product/:productTitle" element={<CardSelected />} />
        <Route path="/mobilemenu" element={<MobileMenuPage />} />
        <Route path="/order" element={<CardOrder />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/return" element={<ReturnPage />} />
        <Route path="/personal" element={<PersonalDataPage />} />
        <Route path="/conditions" element={<ConditionsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
