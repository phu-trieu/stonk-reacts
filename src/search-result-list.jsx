import React, { Component } from 'react';

class SearchResultList extends Component {
  constructor(props) {
    super(props);
    this.state = null
  }

  render() {
    const searchResults = this.props.searchResults
    return (
      <div>
        {
          searchResults.map(searchResult => {
            return (
              <SearchResultListItem />
            )
          })
        }
      </div>
    )
  }
}

export default SearchResultList;
