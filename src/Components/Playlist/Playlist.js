import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';
import React from 'react';
//import ReactDOM from 'react-dom/client';
export class Playlist extends React.Component {
    constructor(props){
      super(props)
      this.handleNameChange=this.handleNameChange.bind(this);
    }
    handleNameChange(e){
      this.props.onNameChange(e.target.value)
    }
    
    render() {
      return (
        <div className="Playlist">
            <input defaultValue={this.props.playlistName} onChange={this.handleNameChange} value={this.props.playlistName} />
            {/*<TrackList />{/*<!-- Add a TrackList component -->*/}
            <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
      )
    }
  }