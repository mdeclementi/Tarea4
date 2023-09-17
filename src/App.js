import './index.css';
import React, { useEffect, Fragment } from 'react';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';

import { RouterProvider } from "react-router-dom";
import router from './Router';

function App() {

  useEffect(() => {
    if (localStorage.getItem('token')) {
      //console.log("Si hay token");

    } else {
      //console.log('no hay otken');
    }
  }, []);

  return (
    <Fragment>
        <main>
          <RouterProvider router={router} />
        </main>
    </Fragment>
  );

}

export default App;
