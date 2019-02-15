// Import necessary packages
import * as React from 'react';

import { ImageContent} from './redux/types/storeState';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
interface ImageListProps {
    pageData: ImageContent[];
    rows: any;
    history: any;
};

interface ImageListState {
    pageData: ImageContent[];
    rows: any;
    history: any;
};

class ImageList extends React.Component<ImageListProps, ImageListState> {

    constructor(props: ImageListProps) {
        super(props);
    }

    public render() {

        // Send the Image List items to the Image component
        return (
            <div className="row images" >{this.props.rows}</div>
        );
    }
}

export default ImageList;