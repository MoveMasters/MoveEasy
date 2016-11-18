import React from 'react';
import styles from './styles';

const InventoryList = (props) => {
	
	const handleItemClick = (item) => {
		props.handleNext();
		props.setSelectedItem(item);
	}


	const listItems = props.currentItems.map( (item, index) => {
		return (
			<li 
				className='list-group-item' 
				key={index} 
				onClick={() => handleItemClick(item)}>
				{item}
				<span className="fa fa-angle-right fa-2x pull-right" aria-hidden="true"></span>
			</li>
		)
	});

	return (
		<div>
		    <ul className='list-group InventoryList'>
		    	{listItems}
		    </ul>
		</div>
	);
}

export default InventoryList;