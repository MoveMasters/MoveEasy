import React from 'react';
import MobileTearSheet from './MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import styles from './styles';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const InventoryList = (props) => {
	return (
		<div>
			<div style={styles.image}>
				<img width='75' height='175' src={props.screenshot} />
			</div>

		    <ul class="list-group">
		      <li class="list-group-item">Cras justo odio</li>
		      <li class="list-group-item">Dapibus ac facilisis in</li>
		      <li class="list-group-item">Morbi leo risus</li>
		      <li class="list-group-item">Porta ac consectetur ac</li>
		      <li class="list-group-item">Vestibulum at eros</li>
		    </ul>
		</div>
	);
}

export default InventoryList;