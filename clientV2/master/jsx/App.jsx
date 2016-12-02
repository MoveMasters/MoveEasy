import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, useRouterHistory, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import cookie from 'react-cookie';

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
import Signup from './components/Signup/Signup';


// Sub Routes
import Survey from './components/Survey/Survey';
import UserProfile from './components/UserProfile/UserProfile';

import { browserHistory } from 'react-router';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.async = true;
});


const isAuthorized = () => {
	const authorized = document.cookie.includes('x-access-token');
	return authorized;
}


const appHistory = useRouterHistory(createHistory)({ queryKey: false, basename: '/' });

class Authorize extends Component {
	constructor(props) {
		super(props);

		this.state = {
				isAuthorized: false,
				view: 'login'
		}
	}

	componentWillMount() {
		if (isAuthorized()) {
			this.setAuthorization(true);
		}

	}

	setAuthorization(isAuthorized) {
		console.log('setting authorization:', isAuthorized)
		this.setState({ isAuthorized })
	}

	changeView(view) {
		this.setState({ view });
	}

	render() {
			const { isAuthorized, view } = this.state;
			
			if (!isAuthorized) {
				return (
					<div>
						{view === 'login' && 
						<Login 
							setAuthorization={ this.setAuthorization.bind(this) } 
							changeView={ this.changeView.bind(this) }/>}

						{view === 'signup' && 
						<Signup 
							setAuthorization={ this.setAuthorization.bind(this) } 
							changeView={ this.changeView.bind(this) } />}
					</div>
				)
			} else {
				return (
					<Router history={browserHistory}>
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

					</Router>
				)
			}
		}
}

ReactDOM.render(<Authorize />, document.getElementById('app'));

if(module.hot) {
    module.hot.accept();
}

// Auto close sidebar on route changes
// appHistory.listen(function(ev) {
//     $('body').removeClass('aside-toggled');
// });

