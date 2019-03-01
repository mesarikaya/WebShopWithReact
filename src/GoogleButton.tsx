// Import necessary packages
import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';

import * as actions from './redux/actions/PageContentActions';
import { ImageContent } from './redux/types/storeState';

import { Dispatch } from 'redux';

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
interface GoogleButtonProps {
    pageData: ImageContent[];
    signInSocialUser(response: any, pageData: ImageContent[], caller: string): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

interface GoogleButtonState {
    pageData: ImageContent[];
};

class GoogleButton extends React.Component<GoogleButtonProps, GoogleButtonState> {

    constructor(props: GoogleButtonProps) {
        super(props);
    }

    public render() {
        const responseGoogle = (response: any) => {
            // tslint:disable-next-line:no-console
            // console.log(response.profileObj);
            this.props.signInSocialUser(response, this.props.pageData, "google");
        };

        const responseGoogle2 = (response: any) => {
            // tslint:disable-next-line:no-console
            console.log(response);
        };

        // tslint:disable-next-line:no-console
        console.log(`${process.env.REACT_APP_GOOGLE_CLIENTID}`);

        // Send the Image List items to the Image component
        return (
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
                buttonText="Login"
                render={(renderProps:any) => (
                    <button className="btn btn-sm btn-social btn-google" onClick={renderProps.onClick}>
                        <i className="fab fa-google" aria-hidden="true" />
                        <a className="sign-in-letter">  Login</a>
                    </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle2}
            />
        );
    }
}


export function mapDispatchToProps(dispatch: any) {
    return {
        signInSocialUser: (response: any, pageData: ImageContent[], caller: string) => dispatch(actions.signInSocialUser(response, pageData,caller))
    }
}

export default connect(null, mapDispatchToProps)(GoogleButton);