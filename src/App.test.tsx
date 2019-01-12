// import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
    // ReactDOM.render(<App error="" images="" isLoading=true pageData= [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }]    />, div);
  ReactDOM.unmountComponentAtNode(div);
});
