import './App.css';
import { Header, Footer, Main } from './component/pages/indexPage';
import { useEffect } from 'react';
import { MainPage } from './component/singlePage';

import { DataProvider } from './component/hooks/dataProvider';
import { useData } from './component/hooks/dataProvider';

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

function AppContent() {
  const { setPage } = useData();

  useEffect(() => {
    setPage(<MainPage />);
  }, [setPage]);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
