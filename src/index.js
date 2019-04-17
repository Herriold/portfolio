import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import moment from 'moment';
import {browserHistory} from 'react-router';
import {reducer as formReducer} from 'redux-form';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';

import createThunk from './reduxThunkError';
import reduxDevToolsComposeEnhancer from './reduxDevTools';
import appReducers from './reducers';

const init = async () => {

    const location = window.location;
    // LOCAL can also mean "accessed by a remote machine (like a Mac) on the local dev network"
    const hostName = location.hostname;
    window.LOCAL = hostName.indexOf('localhost') !== -1;

    //---- local init ----//
    moment.locale('fr-FR');

    //---- reducer ----//
    const reducer = combineReducers({
        ...appReducers,
        routing: routerReducer,
        form: formReducer,
    });

    const reportError = (error, state, action, dispatch) => {
        console.log('================ error caught =====================');
    };

    const store = createStore(reducer, reduxDevToolsComposeEnhancer(
        applyMiddleware(createThunk(reportError), routerMiddleware(browserHistory))
    ));

    const history = syncHistoryWithStore(browserHistory, store);

    //---- showBackButton ----//
    let firstDone = false; // the first action is a POP (why?)
    const internalHistory = [];
    browserHistory.listen(nextLocation => {
        const action = nextLocation.action;
        if (!firstDone || action === "PUSH") {
            firstDone = true;
            internalHistory.push(nextLocation.pathname);
        } else if (action === "POP") {
            internalHistory.pop();
        } else if (action === "REPLACE") {
            internalHistory.pop();
            internalHistory.push(nextLocation.pathname);
        } else {
            throw new Error("Unknown location action: " + action);
        }
    });

    const renderApp = () => {
        const Routes = require('./Routes').default;
        render(
            <Provider store={store}>
                <Routes history={history} store={store}/>
            </Provider>,
            document.getElementById('root')
        )
    };

    renderApp();

};

init();


