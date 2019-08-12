import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NoToken from './NoToken';
// import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

import axios from 'axios';

let apiToken = process.env.REACT_APP_API_TOKEN || false;


const ConnectedApp = () => {

    if(apiToken && apiToken.trim() !== '') {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${apiToken.trim()}` }
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    } else {
        return <NoToken/>
    }

}

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
