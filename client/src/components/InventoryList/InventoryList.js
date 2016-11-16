import React from 'react';
import styles from './styles';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const InventoryList = (props) => {
	return (
		<div>
			<ul className='list-group' style={styles.imageContainer}>
				<img style={styles.image} src={props.screenshot} />
			</ul>

		    <ul className='list-group InventoryList'>
		      <li className='list-group-item'>Cras justo odio</li>
		      <li className='list-group-item'>Dapibus ac facilisis in</li>
		      <li className='list-group-item'>Morbi leo risus</li>
		      <li className='list-group-item'>Porta ac consectetur ac</li>
		      <li className='list-group-item'>Vestibulum at eros</li>
		    </ul>
		</div>
	);
}

export default InventoryList;