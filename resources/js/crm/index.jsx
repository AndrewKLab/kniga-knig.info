import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import App from './App';


if (document.getElementById('app')) {
    ReactDOM.render(<React.StrictMode><Provider store={store}><App /></Provider></React.StrictMode>, document.getElementById('app'));
}
