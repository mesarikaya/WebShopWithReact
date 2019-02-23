// Import the necessary packages and relevant modules
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { Route, Switch, withRouter } from 'react-router-dom';
import { Dispatch } from "redux";
import * as actions from './redux/actions/PageContentActions';
import { ImageContent, StoreState } from './redux/types/storeState';

// Import the presentational components for this container
import Account from './Account';
import App from './App';
import Favorites from './Favorites';
import ProductPage from './ProductPage';   
import ShoppingBasket from './ShoppingBasket'; 
import Signup from './Signup';
import './stylesheets/index.css';
import VerifyUser from './VerifyUser';

// Import the final set store shape from Redux
import { store } from './redux/store';

export interface Props {
    error: {
        message: string,
        status: string
    };
    favorites: ImageContent[];
    isLoading: boolean;
    pageData: ImageContent[];
    shoppingBasket: ImageContent[];
    onRefresh(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

class Container extends React.Component<Props & RouteComponentProps<PathProps>, StoreState> {
    public state: StoreState;

    constructor(props: Props & RouteComponentProps<PathProps>) {
        super(props);
        const currAppState = store.getState();
        this.state = {
            error: currAppState.error,
            favorites: currAppState.favorites,
            isLoading: true,
            pageData: currAppState.pageData,    
            redirect: false,
            shoppingBasket: currAppState.shoppingBasket,
            userAuthorized: false,
            username: "guest"
        };
    }

    public componentDidMount() {
        // update login status on page refresh
        this.props.onRefresh(this.state.pageData);
    }

    public render() {

        return (
            <Switch>
                <Route exact={true} path="/" component={App}/>
                <Route path="/account" component={Account} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/productPage/:id" component={ProductPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/shoppingBasket" component={ShoppingBasket} />
                <Route path="/user/profile" component={App} />
                <Route path="/verify/:email/:token" component={VerifyUser} />
                <Route path="/**" component={App} />
            </Switch>
        );
    }
}

export function mapStateToProps(state: StoreState, OwnProps: Props & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        favorites: state.favorites,
        isLoading: state.isLoading,
        pageData: state.pageData,
        shoppingBasket: state.shoppingBasket
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        onRefresh: (pageData: ImageContent[]) => dispatch(actions.refreshPage(pageData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));