import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Tab, Row } from 'react-bootstrap';
import util from './../../../util/util';
import Profile from './Profile';
import Selector from './Selector';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: {}
		}
	}

	componentWillMount() {
		this.getUserInfo();
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
		console.log(this.state.userInfo, 'userInfo');
		const { name } = this.state.userInfo;
		return (
			<ContentWrapper>
				<Tab.Container className="container-md" id="settings-tab" defaultActiveKey="tabpanel1">
					<Row>
						<Selector />
					  <Profile />
					</Row>
				</Tab.Container>
			</ContentWrapper>
		);
	}
}

export default UserProfile;
