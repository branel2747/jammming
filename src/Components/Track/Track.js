import './Track.css';
import React from 'react';
//import ReactDOM from 'react-dom/client';
export class Track extends React.Component {
    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
    }

    renderAction(){
        if (!this.props.isRemoval){
            //window.alert("hola")
            return <button className="Track-action" onClick={this.addTrack} >+</button>
        }else {
            return <button className="Track-action" onClick={this.removeTrack} >-</button> ;
        }
    }

    addTrack = () => {
        this.props.onAdd(this.props.track)
        
    }
    removeTrack = () => {
        this.props.onRemove(this.props.track)
        
    }

    


    render() {
      return (
        <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            {this.renderAction()}{/*+ o -  ira aqui*/}
        </div>
      )
    }
  }