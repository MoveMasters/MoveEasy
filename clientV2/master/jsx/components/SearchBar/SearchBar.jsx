import React from 'react';
import styles from './styles';

const SearchBar = (props) => {
  return (
    <div>
      <input 
      	type="text" 
      	id="item-search-bar" 
      	onChange={props.updateChoices} 
      	style={styles.searchbar}
      	placeholder={'Search for Items'} />
    </div>
  );
}

export default SearchBar;