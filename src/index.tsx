// import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import Account from './Account';
import App from './App';
import './index.css';
import ProductPage from './ProductPage';

import registerServiceWorker from './registerServiceWorker';

// const history = createBrowserHistory();
ReactDOM.render(
    (<Router>
        <Switch>
            // tslint:disable-next-line jsx-no-lambda
            <Route exact={true} path="/" render={(props) => (<App error={null} images={""} isLoading={false} pageData={""} {...props}/>)} />
            <Route path="/account" component={Account} />
            <Route path="/productPage/:id" component={ProductPage} />
            <Route path="/**" component={App} />
        </Switch>
    </Router>
), document.getElementById('root') as HTMLElement);
registerServiceWorker();
