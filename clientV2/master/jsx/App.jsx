/*!
 *
 * Angle - Bootstrap Admin App + ReactJS
 *
 * Version: 3.5.2
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, useRouterHistory, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import BaseHorizontal from './components/Layout/BaseHorizontal';

// Main Routes
import Dashboard from './components/Dashboard/Dashboard';
import Clients from './components/Clients/Clients';
import Calendar from './components/Calendar/Calendar';
import Messages from './components/Messages/Messages';
import Invoices from './components/Invoices/Invoices';
import Login from './components/Login/Login';

// Sub Routes
import Survey from './components/Survey/Survey';
import UserProfile from './components/UserProfile/UserProfile';

// test routes


import { browserHistory } from 'react-router';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.async = true;
});

// specify basename below if running in a subdirectory or set as "/" if app runs in root
// const appHistory = useRouterHistory(createHistory)({
//   basename: '/'
// })

const appHistory = useRouterHistory(createHistory)({ queryKey: false, basename: '/' });

ReactDOM.render(
    <Router history={browserHistory}>
        
        <Route path='/login' component={Login}/>

        <Route path='/' component={Base}>

            {/* Default route*/}
            <IndexRoute component={Dashboard} />

            {/* Main routes*/}
            <Route path='dashboard' component={Dashboard}/>
            <Route path='clients' component={Clients}/>
            <Route path='calendar' component={Calendar}/>
            <Route path='messages' component={Messages}/>
            <Route path='invoices' component={Invoices}/>


            {/* Survey user routes */}
            <Route path='survey/:moveId' component={Survey} />

            {/* user routes */}
            <Route path='userProfile/:user_id' component={UserProfile} />

        </Route>

        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}

    </Router>,
    document.getElementById('app')
);

if(module.hot) {
    module.hot.accept();
}

// Auto close sidebar on route changes
// appHistory.listen(function(ev) {
//     $('body').removeClass('aside-toggled');
// });
