import React from 'react';
import styles from './styles';
import TrashButton from './../TrashButton/TrashButton';

const Screenshot = (props) => {
  const handleClick = () => {
    props.dequeueItem();
    console.log('calling render renderNextItem')
    props.renderNextItem();
    props.setSelectedItem(null);
  }

	return (
		<div onClick={() => handleClick()}>
			<ul className='list-group' style={styles.imageContainer}>
        <div style={{display: 'block', maxWidth: '100%', maxHeight: '100%', margin: 10}}>
        <TrashButton />
			   <img style={styles.image} src={localStorage.getItem(props.screenshots[0])} />
        </div>
			</ul>
		</div>
	);
}

export default Screenshot;