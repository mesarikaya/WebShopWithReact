// Import the necessary packages and relevant modules
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { Route, Switch, withRouter } from 'react-router-dom';
import { Dispatch } from "redux";
import * as actions from './redux/actions/PageContentActions';
import { ImageContent, StoreState } from './redux/types/storeState';

// Import the presentational components
import Account from './Account';
import App from './App';
import ProductPage from './ProductPage';    
import Signup from './Signup';
import './stylesheets/index.css';
import VerifyUser from './VerifyUser';

export interface Props {
    error: string;
    images: string;
    isLoading: boolean;
    pageData: ImageContent[];
    onRefresh(): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

export function mapDispatchToProps(dispatch: any) {
    return {
        onRefresh: () => dispatch(actions.refreshPage()),
    }
}

class Container extends React.Component<Props & RouteComponentProps<PathProps>, StoreState> {
    public state: StoreState;

    constructor(props: Props & RouteComponentProps<PathProps>) {
        super(props);

        this.state = {
            error: "",
            images: "",
            isLoading: true,
            pageData: [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }],    
            redirect: false,
            userAuthorized: false,
            username: "guest"
        };
    }

    public componentDidMount() {
       // update login status on page refresh
       this.props.onRefresh();
    }

    public render() {

        return (
            <Switch>
                <Route exact={true} path="/" component={App}/>
                <Route path="/account" component={Account} />
                <Route path="/productPage/:id" component={ProductPage} />
                <Route path="/signup" component={Signup} />
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
        images: state.images,
        isLoading: state.isLoading,
        pageData: state.pageData,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));