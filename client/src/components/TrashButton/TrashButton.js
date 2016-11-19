import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete-forever';

const style = {
  position: 'absolute',
  display: 'block',
  marginTop: '1vh',
  marginLeft: '1vw',
};

const TrashButton = (props) => {
  return (
    <div onClick={ props.dequeueItem }>
      <FloatingActionButton mini={true} secondary={true} style={style}>
        <Delete />
      </FloatingActionButton>
    </div>
  )
  
};

export default TrashButton;