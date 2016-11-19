import React from 'react';
import styles from './styles';
import TrashButton from './../TrashButton/TrashButton';

const Screenshot = (props) => {
  let image = localStorage.getItem(props.queue[0]);

	return (
		<div>
			<ul className='list-group' style={styles.imageContainer}>
        <div style={{display: 'block', maxWidth: '100%', maxHeight: '100%', margin: 10}}>
          <TrashButton dequeueItem={ props.dequeueItem }/>
			   <img style={styles.image} src={image} />
        </div>
			</ul>
		</div>
	);
}

export default Screenshot;