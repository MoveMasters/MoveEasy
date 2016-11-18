import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Landing from './components/Landing/Landing';
import Survey from './components/Survey/Survey';
import Dashboard from './components/Dashboard/Dashboard';


const Greeting = () => (
	<div>Hey there</div>
)

export default (
		<div>
			<Route path='/' component={App}>
				<IndexRoute component={Landing} />
				<Route path='survey' component={Survey} />
				<Route path='dashboard' component={Dashboard}/>
			</Route>
		
		</div>

)