import './App.css';
import { Header, Footer, Main } from './component/pages/indexPage';
import { useState } from 'react';
import { MainPage } from './component/singlePage';

import { DataShoes } from '../public/DataProductShoes';
import { PageItems } from './component/singlePage';

function App() {
  const [page, setPage] = useState(
    <MainPage />
  );

  return (
    <>
      <Header setPage={setPage} />
      <Main singlePage={page} />
      <Footer />
    </>
  );
}

export default App;
