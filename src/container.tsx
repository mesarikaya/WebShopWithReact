// Import the necessary packages and relevant modules
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { Route, Switch, withRouter } from 'react-router-dom';
import { ImageContent, StoreState } from '.././src/redux/types/storeState';

// Import the presentational components
import Account from './Account';
import App from './App';
import './index.css';
import ProductPage from './ProductPage';
import Signup from './Signup';

export interface Props {
    error: string;
    images: string;
    isLoading: boolean;
    pageData: ImageContent[];
};

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

export function mapStateToProps(state: StoreState, OwnProps: Props & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        images: state.images,
        isLoading: state.isLoading,
        pageData: state.pageData,
    }
}

// const history = createBrowserHistory();
class Container extends React.Component<Props & RouteComponentProps<PathProps>, StoreState> {
    public state: StoreState;

    constructor(props: Props & RouteComponentProps<PathProps>) {
        super(props);

        this.state = {
            error: "",
            images: "",
            isLoading: true,
            pageData: [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: ""}],        
        };
    }

    public render() {

        return (
            <Switch>
            // tslint:disable-next-line jsx-no-lambda
                <Route exact={true} path="/" component={App}/>
                <Route path="/account" component={Account} />
                <Route path="/productPage/:id" component={ProductPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/**" component={App} />
            </Switch>
        );
    }
}
export default withRouter(connect(mapStateToProps)(Container));