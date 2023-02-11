import {Spotify} from '../../../src/util/Spotify';
import React from 'react';
//import ReactDOM from 'react-dom/client';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';{/*import logo from './logo.svg';*/}
Spotify.getAccessToken()
let aux=[];
function regularice(objelist){
  return objelist.map((elem) => ({
    name: elem.name,
    artist: elem.artists[0].name,
    album: elem.album.name,
    id: elem.id,
    uri: elem.uri
  }))
}

function fund(array, id) {
  const auiliar=array.find(element => element.id === id);
  return auiliar
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={searchResults: [
      /*{
        name:"num2",
        artist:"hol2o",
        album:"daf22",
        id:"123412"
      },
      {
        name:"num123",
        artist:"holo13",
        album:"daf31",
        id:"1234131"
      }*/
    ],
    playlistName: "New Playlist",
    playlistTracks: [
      /*{
        name:"num",
        artist:"holo",
        album:"daf",
        id:"12341"
      },
      {
        name:"num1",
        artist:"holo1",
        album:"daf1",
        id:"123411"
      }*/
    ]};
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }
  addTrack (track) {
    
    if(!fund(this.state.playlistTracks, track.id)){
      
      //window.alert(this.state.playlistTracks)
      this.setState({playlistTracks: [...this.state.playlistTracks, track]});
      
    }
    //window.alert("hola")
  }
    
  removeTrack (track) {
    const previo = this.state.playlistTracks.filter(track1 => {
      return track1.id !== track.id;
    });
    this.setState({playlistTracks: previo})
    //window.alert(this.state.playlistName)
  }
  
  updatePlaylistName(name){
    this.setState({playlistName: name})
    
  }

  async savePlaylist(){
    const aux = this.state.playlistName;
    //window.alert("hola" + this.state.playlistName)
    const trackURIs = this.state.playlistTracks.map(trac=>trac.uri);
    //window.alert(trackURIs);
    await Spotify.savePlaylist(aux,trackURIs);
    //window.alert("hola " + this.state.playlistName)
    this.setState({playlistName: "New Playlist"})
    this.forceUpdate();
    this.setState({playlistTracks: []})
    //window.alert("hola " + this.state.playlistName)
  }

  async search(term){
    //window.alert(Spotify.search(term))
    //Spotify.search(term).then(data => window.alert(data.tracks.items[0].artists[0].name));
    //this.setState({searchResults: []})
    aux = await Spotify.search(term).then(data => regularice(Object.values(data.tracks.items)))
    //window.alert("aux " + Object.values(aux[0]) +"----" +Object.values(this.state.searchResults[0]))
    this.setState({searchResults: aux})
    //window.alert(Object.values(this.state.searchResults[0]))
    //window.alert("aux2 " + aux)
  }

  


  render (){
    return(
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
          <SearchBar onSearch={this.search} />{/*<!-- Add a SearchBar component -->*/}
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}  />{/*<!-- Add a SearchResults component -->*/}
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}  />{/*<!-- Add a Playlist component -->*/}
        </div>
      </div>
    </div>
  )};
}

export default App;
