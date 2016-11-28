import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class Selector extends Component {
	render() {
		return (
			<div className="panel b">
				<div className="panel-heading bg-gray-lighter text-bold">Client Details</div>
				<Nav>
						<NavItem eventKey="profilePane">Profile</NavItem>
						<NavItem eventKey="inventoryPane">Inventory</NavItem>
						<NavItem eventKey="messagesPane">Messages</NavItem>
						<NavItem eventKey="timelinePane">Timeline</NavItem>
				</Nav>
			</div>
		);
	}
}

export default Selector;
