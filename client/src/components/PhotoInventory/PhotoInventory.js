import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import styles from './styles'


const PhotoInventory = (props) => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2} cellHeight={125}>
      {props.inventory.map((item) => (
        <GridTile
          key={item._id}
          title={item.name}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={item.url} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default PhotoInventory;