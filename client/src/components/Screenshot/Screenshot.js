import React from 'react';
import styles from './styles';
    // let image = localStorage.getItem(props.screenshots[0]);

const Screenshot = (props) => {
	return (
		<div>
			<ul className='list-group' style={styles.imageContainer}>
			  <img style={styles.image} src={localStorage.getItem(props.screenshots[0])} />
			</ul>
		</div>
	);
}

export default Screenshot;