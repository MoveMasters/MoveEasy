import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Tab, Row, Col, Modal, Button } from 'react-bootstrap';
import util from './../../../util/util';
import Selector from './Selector';
import { browserHistory } from 'react-router';

// Pane views
import ProfilePane from './ProfilePane';
import InventoryPane from './InventoryPane';
import MessagesPane from './MessagesPane';
import TimelinePane from './TimelinePane';
import ClientCard from './ClientCard';

// modal
import InventoryModal from './InventoryModal';

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
			inventory: [],
			showModal: false,
			modalItem: null
		}
	}

	componentWillMount() {
		this.setUserInfoAndInventory();
	}

	handleModal(showModal, modalItem) {
		this.setState({ showModal, modalItem });
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
    return util.getInitialInventory( _id ).then( inventory => {
      return inventory;
    })
  }

  onClickVideoCall() {
    const { _id } = this.state;
    const path = `/survey/${_id}`
    browserHistory.push(path);
  }

  getModalItem() {
  	return Object.assign({}, this.state.modalItem);
  }

	render() {
		const { 
			name, 
			phone, 
			email, 
			currentAddress, 
			futureAddress, 
			moveDate, 
			_id, 
			inventory, 
			showModal, 
			modalItem 
		} = this.state;
		return (
			<ContentWrapper>
				<Tab.Container className="container-md" id="settings-tab" defaultActiveKey="profilePane">
					<Row>
						<Col md={3}>
							<Selector />
							<ClientCard 
							name={name}
							phone={phone}
							email={email}
							onClickVideoCall={this.onClickVideoCall.bind(this)}/>
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
				        <InventoryPane 
				        	inventory={ inventory }
				        	showModal={ this.handleModal.bind(this) }/>
				        <MessagesPane />
				        <TimelinePane />
					    </Tab.Content>
					  </Col>
					</Row>
				</Tab.Container>
				<InventoryModal 
					show={ showModal } 
					onHide={ () => this.handleModal(false) }
					modalItem={ Object.assign({}, modalItem) }
					handleModal={ this.handleModal.bind(this) }/>
			</ContentWrapper>
		);
	}
}

export default UserProfile;
