import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class Selector extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { updateNav } = this.props;
		return (
			<div className="panel b">
				<div className="panel-heading bg-gray-lighter text-bold">Client Details</div>
				<Nav>
						<NavItem onClick={ updateNav }eventKey="profilePane">Profile</NavItem>
						<NavItem onClick={ updateNav }eventKey="inventoryPane">Inventory</NavItem>
						<NavItem onClick={ updateNav }eventKey="messagesPane">Messages</NavItem>
				</Nav>
			</div>
		);
	}
}

export default Selector;
