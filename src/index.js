import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';

// Render the main component into the dom

let store = createStore(todoApp);
let rootEle = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
        <App />
	</Provider>,
	rootEle
);
