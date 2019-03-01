// Import necessary packages
import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';

import * as actions from './redux/actions/PageContentActions';
import { ImageContent } from './redux/types/storeState';

import { Dispatch } from 'redux';

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
interface FacebookButtonProps {
    pageData: ImageContent[];
    signInSocialUser(response: any, pageData: ImageContent[], caller: string): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

interface FacebookButtonState {
    pageData: ImageContent[];
};

class FacebookButton extends React.Component<FacebookButtonProps, FacebookButtonState> {

    constructor(props: FacebookButtonProps) {
        super(props);
    }

    public render() {
        const responseFacebook = (response: any) => {
            // tslint:disable-next-line:no-console
            console.log(response);

            // tslint:disable-next-line:no-console
            // console.log(response.profileObj);
            this.props.signInSocialUser(response, this.props.pageData,"fb");
        };

        // tslint:disable-next-line:no-console
        console.log(`${process.env.REACT_APP_FACEBOOK_CLIENTID}`);

        // Send the Image List items to the Image component
        return (
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_CLIENTID}`}
                callback={responseFacebook}
                cssClass="btn btn-sm btn-social btn-facebook"
                icon="fa-facebook"
                textButton=" Login"
            />
        );
    }
}


export function mapDispatchToProps(dispatch: any) {
    return {
        signInSocialUser: (response: any, pageData: ImageContent[], caller: string) => dispatch(actions.signInSocialUser(response, pageData, caller))
    }
}

export default connect(null, mapDispatchToProps)(FacebookButton);