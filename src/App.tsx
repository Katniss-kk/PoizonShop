import './App.css';
import { Header, Footer, Main } from './component/pages/indexPage';
import { useState } from 'react';
import { MainPage } from './component/singlePage';

import { DataProvider } from './component/hooks/dataProvider';

import { DataShoes } from '../public/DataProductShoes';
import { PageItems } from './component/singlePage';

function App() {
  const [page, setPage] = useState(
    <MainPage />
  );

  return (
    <DataProvider>
      <Header setPage={setPage} />
      <Main singlePage={page} />
      <Footer />
    </DataProvider>
  );
}

export default App;