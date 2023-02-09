import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';
import React from 'react';
import ReactDOM from 'react-dom/client';
export class SearchResults extends React.Component {
  
    render() {
      return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} /> 
            {/*<!-- Add a TrackList component -->*/}
        </div>
      )
    }
}