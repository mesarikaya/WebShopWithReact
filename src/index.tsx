// import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { unregister } from './registerServiceWorker';
unregister();

import {  Route } from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';

import Container from './container';

import './stylesheets/index.css';

import { history, store } from './redux/store';

// import registerServiceWorker from './registerServiceWorker';

// const history = createBrowserHistory();
ReactDOM.render(
    (<Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={Container} store={store}/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root') as HTMLElement);
// registerServiceWorker();
