import React from 'react';
import styles from './styles';

const Screenshot = (props) => {
	return (
		<div>
			<ul className='list-group' style={styles.imageContainer}>
			  <img style={styles.image} src={props.screenshots[0]} />
			</ul>
		</div>
	);
}

export default Screenshot;