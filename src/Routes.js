import React, { PureComponent } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import App from "./containers/App";
import chat from "./containers/chats/Chat"
import {onEnterHome, onEnterApp} from "./utils/app"
import {onEnterChats} from "./actions/chats/chat"


class Routes extends PureComponent {
    render() {
        const store = this.props.store;
        return (
            <Router history={this.props.history} >
                <Route path="/"/*{process.env.PUBLIC_URL}*/ component={App}>
                    <IndexRoute component={Home}/>
                    <Route onEnter={onEnterChats(store)}>
                        <Route path="/chat" component={chat}/>
                        <Route path="/chatList" component={chat}/>
                    </Route>
                </Route>
                <Route path="*" component={NotFound}/>

            </Router>
        );
    }
}

export default Routes;