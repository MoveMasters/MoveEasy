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
			userInfo: {}
		}
	}

	componentWillMount() {
		// this.getUserInfo();
	}

	getUserInfo() {
		const { user_id } = this.props.params;

		console.log('callin get all moves')
		util.getAllMoves().then( moves => {
			let userInfo = moves.filter( move => move.user_id === user_id )[0];
			this.setState({ userInfo });
		})
	}

	render() {
		const { name } = this.state.userInfo;
		return (
			<ContentWrapper>
				<Tab.Container className="container-md" id="settings-tab" defaultActiveKey="profilePane">
					<Row>
						<Col md={3}>
							<Selector />
						</Col>

					  <Col md={9}>
					    <Tab.Content animation className="p0 b0">
				        <ProfilePane />
				        <InventoryPane />
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
