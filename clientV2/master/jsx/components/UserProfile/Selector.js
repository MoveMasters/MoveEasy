import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class Selector extends Component {
	render() {
		return (
			<Col md={3}>
				 <div className="panel b">
						<div className="panel-heading bg-gray-lighter text-bold">Client Details</div>
						<Nav>
								<NavItem eventKey="tabpanel1">Profile</NavItem>
								<NavItem eventKey="tabpanel2">Account</NavItem>
								<NavItem eventKey="tabpanel3">Emails</NavItem>
								<NavItem eventKey="tabpanel4">Notifications</NavItem>
								<NavItem eventKey="tabpanel5">Applications</NavItem>
						</Nav>
				 </div>
			</Col>
		);
	}
}

export default Selector;
