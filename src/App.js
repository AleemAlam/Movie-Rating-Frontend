import React, { Component } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieEdited from './components/MovieEdited';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { withCookies } from 'react-cookie';
let FontAwesome = require('react-fontawesome');

class App extends Component {
  appStyle = {
    textAlign: 'center'
  }
  
  state = {
    movie:[],
    selectedMovie:null,
    editedMovie:null,
    token: this.props.cookies.get('token'),
    user: this.props.cookies.get('user')
  }


  movieUpdated=movie =>{
    this.setState({selectedMovie:movie, editedMovie:null});
    this.componentDidMount();
  }

  movieDeleted=()=>{
    this.setState({selectedMovie:null});
    this.componentDidMount();
  }

  movieEdit = selMovie =>{
    this.setState({editedMovie:selMovie})
  }
  movieAdd = () =>{
    this.setState({editedMovie:{title:'', description:''}})
  }

  componentDidMount(){
    if (this.state.token){
      fetch(`${process.env.REACT_APP_API_URL}/api/movie/`,{
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      }).then( resp => resp.json()).then( resp =>this.setState({movie:resp})).catch(error => console.log(error))
    }
    else{
      window.location.href="/";
    }
  }
  
  formCancel =()=>{
    this.setState({editedMovie:null })
  }

  newMovie=(movie)=>{
    console.log(movie)
    this.setState({selectedMovie:movie, editedMovie:null})
    this.componentDidMount()
  }
  logout = ()=>{
    localStorage.clear();
    this.props.cookies.remove('token');
    this.props.cookies.remove('user');
    window.location.href="/";
  }

  render(){
    return (
      <div className="App">
        <div className="row-header">
        <br/>
          <h1><FontAwesome name="film"/><span>Movie Rater</span></h1>
        </div>
        <div className="container">
          <div style={{float:'right'}}>
            <p onClick={this.logout} className="click">Logout: {this.state.user}</p>
          </div>
        </div>
        <div className="container">
          <div className="row row-content">
            <div className="col-sm-8">  
              <h2 style={{marginBottom:'5%'}}>&nbsp;Movie List:</h2>
              <MovieList movieClicked={(movie)=>{this.movieUpdated(movie)}} movies={this.state.movie}
              addMovie={()=>{this.movieAdd()}} />
            </div>
            <div className="col-sm-4">
              {!this.state.editedMovie ?
                <MovieDetails movie={this.state.selectedMovie} updateMovie={(movie)=>{this.movieUpdated(movie)}} 
                deleteMovie={()=> {this.movieDeleted()}} editMovie = {(movie)=>{this.movieEdit(movie)}} token={this.state.token}/>
              :
              <MovieEdited selMovie={this.state.editedMovie} updateMovie={(movie)=>{this.movieUpdated(movie)}}
               newMovie={(movie)=>{this.newMovie(movie)}} cancelClick={this.formCancel} token={this.state.token}/>
              }
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

export default withCookies(App);
