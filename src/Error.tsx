// Import necessary packages
import * as React from 'react';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
interface ErrorProps {
    hasError: boolean;
    error: {
        message: string,
        status: string
    };
};

/**
 * This is a presentational component that provides
 * error or success feedback to the user on the
 * main components where this kind of communications
 * is seen as useful
 */
class Error extends React.Component<ErrorProps> {

    constructor(props: ErrorProps) {
        super(props);
    }

    public render() {

        if (this.props.hasError) {
            if ( this.props.error.status === "Error" ) {
                return (
                    <div className="row" style={{ color: 'red' }}> Error: {this.props.error.message}</div>
                );
            } else if (this.props.error.status === "Success" ) {
                return (
                    <div className="row" style={{ color: 'green' }}> Success: {this.props.error.message}</div>
                );
            } else {
                return (<div>{null}</div>);
            }
            
        } else {
            return (<div>{null}</div>);
        }
        
    }
}

export default Error;