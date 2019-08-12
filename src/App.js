import React from 'react';

import 'normalize.css/normalize.css';
import './sass/app.scss';

import Header from './components/header';
import Catalog from './components/catalog';

function App() {
    return (
        <React.Fragment>
            <Header/>
            <Catalog/>
        </React.Fragment>
    );
}
    
export default App;
