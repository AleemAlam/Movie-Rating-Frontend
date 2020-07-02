import React, { Component } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  appStyle = {
    textAlign: 'center'
  }
  
  state = {
    movie:[],
    selectedMovie:null
  }


  movieClick=(movie)=>{
    this.setState({selectedMovie:movie})
  }

  componentDidMount(){
    fetch('http://127.0.0.1:8000/api/movie/',{
      method: 'GET',
      headers: {
        'Authorization': 'Token 996df406ea6d010db63de0a8c1893ab0e6261948'
      }
    }).then( resp => resp.json()).then( resp =>this.setState({movie:resp})).catch(error => console.log(error))
  }
  
  render(){
    return (
      <div className="App">
        <div className="row-header">
          <h1>Movie Rater</h1>
        </div>
        <div className="container">
          <div className="row row-content">
            <div className="col-sm-5">
              <MovieList onClick={(movie)=>{this.movieClick(movie)}} movies={this.state.movie}/>
            </div>
            <div className="col-sm-7">
              <MovieDetails movie={this.state.selectedMovie}/>
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

export default App;
