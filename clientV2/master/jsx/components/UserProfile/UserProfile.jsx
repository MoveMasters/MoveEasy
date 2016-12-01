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
      userInfo: null,
			inventory: [],
			showModal: false,
			modalItem: null,
      surveyTime: '',
      displayedConvo: []
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
    this.updateConversation(user_id);
		return util.getAllMoves().then( moves => {
			let userInfo = moves.filter( move => move.user_id === user_id )[0];
			return userInfo
		})
	}

	setUserInfoAndInventory() {
		this.getUserInfo().then( userInfo => {
			const { name, phone, currentAddress, futureAddress, _id, surveyTime, username } = userInfo;
			this.setState({ name, phone, currentAddress, futureAddress, _id, userInfo, surveyTime, email:username });
			this.getInventory(_id).then( inventory => {
				this.setState({ inventory })
			})
		})
	}

  updateConversation(user_id) {
    util.getConversation(user_id).then( messages => {
      this.setState({
        displayedConvo: messages
      });
    });
  }

  onMessageSend(event) {
    const text = $('#message-input').val();
    if (!text) { return; }

    const user_id = this.state.userInfo.user_id;
    util.sendNewMessage(user_id, text).then( newMessage => {
      this.updateConversation(user_id);
    });
  }

	onInputChange(e, state) {
    this.setState({ [state]: e.target.value })
  }

  handleUpdateUserProfile() {
    userInfo = this.state.userInfo;
  	if(userInfo) {
  		throw new Error('Error: expected userInfo');
  	}

  	//manually copy properties
  	userInfo.name = this.state.name;
  	userInfo.phone = this.state.phone;
  	userInfo.currentAddress = this.state.currentAddress;
  	userInfo.futureAddress = this.state.futureAddress;
  	userInfo.surveyTime = this.state.surveyTime;

  	util.updateUserMoveInfo(userInfo);

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
			modalItem,
      surveyTime
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
				        	surveyTime={surveyTime}
				        	onInputChange={this.onInputChange.bind(this)}
				        	handleUpdateUserProfile={this.handleUpdateUserProfile.bind(this)}/>
				        <InventoryPane 
				        	inventory={ inventory }
				        	showModal={ this.handleModal.bind(this) }/>
				        <MessagesPane
                  userSelected={this.state.userInfo}
                  displayedConvo={this.state.displayedConvo}
                  onMessageSend={this.onMessageSend.bind(this)}
                />
					    </Tab.Content>
					  </Col>
					</Row>
				</Tab.Container>
				<InventoryModal 
					show={ showModal } 
					onHide={ () => this.handleModal(false) }
					modalItem={ Object.assign({}, modalItem) }
					handleModal={ this.handleModal.bind(this) }
          clientName={ this.state.name}
          />
			</ContentWrapper>
		);
	}
}

export default UserProfile;
