// import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import Account from './Account';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// const history = createBrowserHistory();


ReactDOM.render(
    (<Router>
        <Switch>
            <Route exact={true} path="/" component={App} />
            <Route path="/account" component={Account} />
            <Route path="/**" component={App} />
        </Switch>
    </Router>
), document.getElementById('root') as HTMLElement);
registerServiceWorker();
