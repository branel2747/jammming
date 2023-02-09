import './TrackList.css';
import React from 'react';
import { Track } from '../Track/Track';
import ReactDOM from 'react-dom/client';

export class TrackList extends React.Component {
    render() {
      return (
        <div className="TrackList">
          {this.props.tracks.map((one)=>{
          return <Track key={one.id} track={one} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />} )}
          
          {/* <!-- You will add a map method that renders a set of Track components  -->*/}
        </div>
      )
    }
}