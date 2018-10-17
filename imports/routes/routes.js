import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
// Components Files
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';
const unAuthPages = ['/', '/signup'];
const authPages = ['/links'];
const onEnterPublicPage = () => {
    if (Meteor.userId()){
        browserHistory.replace('/links')
    }
}
const onEnterPrivatePage = () => {
    if (!Meteor.userId()){
        browserHistory.replace('/')
    }
}
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnAuthPage = unAuthPages.includes(pathname);
    const isAuthPage = authPages.includes(pathname);
    if (isUnAuthPage && isAuthenticated) {
        browserHistory.replace('/links')
    } else if (isAuthPage && !isAuthenticated) {
        browserHistory.replace('/')
    }
};
export const routes = (
    <Router history={browserHistory}>
            <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
            <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
            <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
            <Route path="*" component={NotFound}/>
    </Router>
);