import React from 'react';
import styles from './styles';

const InventoryList = (props) => {
	const listItems = props.currentItems.map( (item) => {
		return (
			<li className='list-group-item'>
				<span onClick={props.onItemSelection}>{item}</span>
				<span className="fa fa-angle-right fa-2x pull-right" aria-hidden="true"></span>
			</li>
		)
	});
	console.log('listItems', listItems);
	return (
		<div>
		    <ul className='list-group InventoryList'>
		    	{listItems}
		    </ul>
		</div>
	);
}

export default InventoryList;