import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import styles from './styles'


const PhotoInventory = (props) => (
  <div className="panel panel-default" style={{height: '18vh'}}>

    <div style={styles.root}>
      <GridList style={styles.gridList} cols={2.2}>
        {props.inventory.map((item) => (
          <GridTile
            key={item._id}
            title={item.name}
            titleStyle={styles.titleStyle}
            style={{width: '100%', height: '100%', maxHeight: '100%'}}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={item.url} style={{maxHeight: '100%'}}/>
          </GridTile>
        ))}
      </GridList>
    </div>

  </div>
);

export default PhotoInventory;