import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Tab, Row, Col } from 'react-bootstrap';
import util from './../../../util/util';
import Selector from './Selector';

// Pane views
import ProfilePane from './ProfilePane';
import InventoryPane from './InventoryPane';
import MessagesPane from './MessagesPane';
import TimelinePane from './TimelinePane';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			phone: '',
			email: '',
			currentAddress: '',
			futureAddress: '',
			moveDate: '',
			_id: '',
			inventory: []
		}
	}

	componentWillMount() {
		this.setUserInfoAndInventory();
	}

	getUserInfo() {
		const { user_id } = this.props.params;
		return util.getAllMoves().then( moves => {
			let userInfo = moves.filter( move => move.user_id === user_id )[0];
			return userInfo
		})
	}

	setUserInfoAndInventory() {
		this.getUserInfo().then( userInfo => {
			const { name, phone, currentAddress, futureAddress, _id } = userInfo;
			this.setState({ name, phone, currentAddress, futureAddress, _id });
			this.getInventory(_id).then( inventory => {
				console.log('inventory', inventory)
				this.setState({ inventory })
			})
		})
	}

	onInputChange(e, state) {
    this.setState({ [state]: e.target.value })
  }

  handleUpdateUserProfile() {
    console.log('SEND UPDATED USER PROFILE INFO TO SERVER');
    console.log(this.state);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

  }

  getInventory() {
  	const { _id } = this.state;
    console.log('getting inventory with ', _id);
    return util.getInitialInventory( _id ).then( inventory => {
      console.log(inventory, 'inventory')
      return inventory;
    })
  }

	render() {
		const { name, phone, email, currentAddress, futureAddress, moveDate, _id, inventory } = this.state;
		return (
			<ContentWrapper>
				<Tab.Container className="container-md" id="settings-tab" defaultActiveKey="profilePane">
					<Row>
						<Col md={3}>
							<Selector />
						</Col>

					  <Col md={9}>
					    <Tab.Content animation className="p0 b0">
				        <ProfilePane 
				        	name={name}
				        	phone={phone}
				        	email={email}
				        	currentAddress={currentAddress}
				        	futureAddress={futureAddress}
				        	moveDate={moveDate}
				        	onInputChange={this.onInputChange.bind(this)}
				        	handleUpdateUserProfile={this.handleUpdateUserProfile.bind(this)}/>
				        <InventoryPane inventory={ inventory }/>
				        <MessagesPane />
				        <TimelinePane />
					    </Tab.Content>
					  </Col>
					</Row>
				</Tab.Container>
			</ContentWrapper>
		);
	}
}

export default UserProfile;
