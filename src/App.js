import React from 'react';

import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import './sass/app.scss';

import { ToastContainer } from 'react-toastify';

import Header from './components/header';
import Catalog from './components/catalog';

function App() {
    return (
        <React.Fragment>
            <ToastContainer autoClose={5000}/>
            <Header/>
            <Catalog/>
        </React.Fragment>
    );
}
    
export default App;
