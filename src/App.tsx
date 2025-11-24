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

import { DataProvider } from './component/hooks/dataProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './service/store';
import { fetchProductsThunk } from './service/slices/productsSlice';
import type { RootState } from './service/store';
import { CardOrder, CardSelected } from './component/UI';

function App() {
  return (
    <Provider store={store}>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
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
        <Route path="PoizonShop/" element={<MainPage />} />
        <Route
          path="/PoizonShop/cloth"
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
          path="/PoizonShop/shoes"
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
          path="/PoizonShop/accessories"
          element={
            <PageItems
              items={productsAcs}
              title={'Аксессуары'}
              catalog={'Главная / Аксессуары'}
              loading={loading}
            />
          }
        />
        <Route
          path="PoizonShop/product/:productTitle"
          element={<CardSelected />}
        />
        <Route path='/PoizonShop/mobilemenu' element={<MobileMenuPage />}/>
        <Route path="/PoizonShop/order" element={<CardOrder />} />
        <Route path="PoizonShop/questions" element={<QuestionsPage />} />
        <Route path="PoizonShop/delivery" element={<DeliveryPage />} />
        <Route path="PoizonShop/return" element={<ReturnPage />} />
        <Route path="PoizonShop/personal" element={<PersonalDataPage />} />
        <Route path="PoizonShop/conditions" element={<ConditionsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
