import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from "react-router";
import { withRouter} from 'react-router-dom';

// Import bootstrap css
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import Logo from '.././src/images/Logo.png';
import './stylesheets/Signup.css';

// import * as queryString from 'query-string';

import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/";

library.add(faUser);
library.add(faKey);

// Import necessary code from other modules
// import { store } from './redux/store';

import * as actions from './redux/actions/PageContentActions';
import { ImageContent, StoreState } from './redux/types/storeState';

// import createBrowserHistory from 'history/createBrowserHistory';
import { Dispatch } from 'redux';

// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory({ forceRefresh: true });

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

export interface VerifyUserPageProps {
    redirect: boolean,
    synchronizePageData(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    updateLocalUserAuthenticationStatus(e: any, formFields: any): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

interface VerifUserPageState {
    redirect: boolean;
};

// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState & VerifUserPageState, OwnProps: VerifyUserPageProps & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        favorites: state.favorites,
        isLoading: state.isLoading,
        pageData: state.pageData,
        redirect: state.redirect,
        shoppingBasket: state.shoppingBasket,
        userAuthorized: state.userAuthorized,
        username: state.username,
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
        updateLocalUserAuthenticationStatus: (e: any, formFields: any) => dispatch(actions.UpdateLocalUserAuthenticationStatus(e, formFields))
    }
}

class VerifyUser extends React.Component<VerifyUserPageProps & RouteComponentProps<PathProps>, VerifUserPageState> {
    public state: VerifUserPageState & StoreState;

    constructor(props: VerifyUserPageProps & RouteComponentProps<PathProps>) {
        super(props);
        this.state = {
            error: {
                message: '',
                status: '',
            },
            favorites: [{
                Author: '',
                Description: '',
                Group: '',
                Image: '',
                ImageId: '',
                Name: '',
                Reserved: '',
                Reserved_Until: '',
                Type: ''
            }],
            isLoading: true,
            pageData:[{ Author: "", Description: "", Group: "", Image: "", ImageId: "", Name: "", Reserved: "", Reserved_Until: "", Type: "" }],
            redirect: false,
            shoppingBasket: [{
                Author: '',
                Description: '',
                Group: '',
                Image: '',
                ImageId: '',
                Name: '',
                Reserved: '',
                Reserved_Until: '',
                Type: ''
            }],
            userAuthorized: false,
            username: 'guest'
        };
    }

    public componentDidMount() {
        
        // tslint:disable-next-line:no-console  
        console.log("Location parsing for verification: ", this.props.match.params);
        const params = JSON.parse(JSON.stringify(this.props.match.params));
        // tslint:disable-next-line:no-console  
        console.log("Location parsing for verification: ", params);

        // Send all the data on component load
        this.verifyUser(params);
    }

    public verifyUser = (params:any) => {
        // tslint:disable-next-line:no-console
        console.log("GET METHOD VERIFY TOKEN:");

        return (axios.get(`${url}verify`, {
            params
        }).then((response) => {
            // handle success
            if (response.status) {
                this.setRedirect();
            }
        }).catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in get verify is:", error.response);
            throw (error);
        }));
    };

    public setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    public renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        } else {
            return <Redirect to='/account' />
        }
    }

    public render() {
        return (
            <div>
                {this.renderRedirect()}
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyUser));