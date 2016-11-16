import React from 'react';
import styles from './styles';

const InventoryList = (props) => {
	return (
		<div>
		    <ul className='list-group InventoryList'>
		      <li className='list-group-item'>Cabinet - Curio Utility
		      	<span className="fa fa-angle-right fa-2x pull-right" aria-hidden="true"></span>
		      </li>
		      <li className='list-group-item'>
		      	<h2><a href=""><i className="fa fa-angle-right fa-2x pull-right" style={styles.fa}></i> test link</a></h2>
		      </li>
		      <li className='list-group-item'>Morbi leo risus</li>
		      <li className='list-group-item'>Porta ac consectetur ac</li>
		      <li className='list-group-item'>Vestibulum at eros</li>
		      <li className='list-group-item'>Porta ac consectetur ac</li>
		      <li className='list-group-item'>Vestibulum at eros</li>
		      <li className='list-group-item'>Porta ac consectetur ac</li>
		      <li className='list-group-item'>Vestibulum at eros</li>
		      <li className='list-group-item'>Vestibulum at eros</li>
		      <li className='list-group-item'>Porta ac consectetur ac</li>
		      <li className='list-group-item'>Vestibulum at eros</li>
		      <li className='list-group-item'>Porta ac consectetur ac</li>
		      <li className='list-group-item'>Vestibulum at eros</li>
		    </ul>
		</div>
	);
}

export default InventoryList;