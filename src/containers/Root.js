import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../store'
import MainContent from "./MainContent";
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';

// const history = syncHistoryWithStore(createBrowserHistory(), store);

class RootContainer extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Provider store = {store}>
                <ConnectedRouter history={createBrowserHistory()}>
                    <MainContent/>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default RootContainer