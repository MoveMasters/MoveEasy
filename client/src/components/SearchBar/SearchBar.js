import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <input type="text" id="item-search-bar" onChange={props.onChange} />
    </div>
  );
}

export default SearchBar;