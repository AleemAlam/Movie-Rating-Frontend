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


  movieUpdated=movie =>{
    this.componentDidMount();
    this.setState({selectedMovie:movie});
  }

  movieDeleted=selMovies =>{
    this.setState({selectedMovie:null});
    this.componentDidMount();
  }

  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_URL}/api/movie/`,{
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
              <MovieList movieClicked={(movie)=>{this.movieUpdated(movie)}} movies={this.state.movie} deleteMovie={(movie)=> {this.movieDeleted(movie)}} />
            </div>
            <div className="col-sm-7">
              <MovieDetails movie={this.state.selectedMovie} updateMovie={(movie)=>{this.movieUpdated(movie)}} />
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

export default App;
