import style from './Main.module.css';
import { MainPage } from '../../singlePage/index';
import { useState, type ReactElement } from 'react';


interface MainProps {
  singlePage: ReactElement
}

export default function Main({singlePage}: MainProps) {

  return (
    <main>
      {singlePage}
    </main>
  );
}
