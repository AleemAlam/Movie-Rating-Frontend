import React, { Component } from 'react';
let FontAwesome = require('react-fontawesome');

class MovieDetails extends Component{

    state = {
        highlight:-1
    }

    highlightRate = high =>{
        this.setState({highlight:high});
    }
    ratedClicked = star =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/${this.props.movie.id}/rate_movie/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify({rating:star+1})
            }).then( resp => resp.json())
            .then( resp =>this.getUpdate())
            .catch(error => console.log(error))    
    }

    getUpdate = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/${this.props.movie.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            }).then( resp => resp.json())
            .then( res => this.props.updateMovie(res))
            .catch(error => console.log(error))        
    }
    removeClick = (movie) =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/${movie.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            }).then( res => this.props.deleteMovie(movie))
            .catch(error => console.log(error));
    }
    editClick = (movie) =>{
        this.props.editMovie(movie)
    }
    
    render(){
        const movie = this.props.movie;        
        return(
            <div>
                {movie ? (
                    <div>
                        <h2>{movie.title}</h2>
                        <div className="row">
                            <div className="col-sm-2">
                                <FontAwesome className="click" name="edit" onClick={()=>{this.editClick(movie)}}/>
                            </div>
                            <div className="col-sm-2">
                                <FontAwesome className="click" name="trash" onClick={()=>{this.removeClick(movie)}}/>
                            </div>
                        </div>                        
                        {[...Array(5)].map((e,i) => {
                            return <FontAwesome name="star" key={i} className={movie.avg_rating>i ? "orange":"" }/>
                        })}
                        
                        ({movie.no_of_ratings})
                        <p>{movie.description}</p>

                        <div className="movie-rate" >
                            <h2>Rate It Now</h2>
                                {[...Array(5)].map((e,i) => {
                                    return (
                                        
                                            <FontAwesome name="star" key={i} className={this.state.highlight > i-1 ? "orange click":"" }
                                            onMouseEnter={()=>{this.highlightRate(i)}} onMouseLeave={()=>{this.highlightRate(-1)}} onClick={()=>{this.ratedClicked(i)}}/> 
                                    );
                                })}
                        </div> 
                        
                    </div>
                    
                ):null }
            </div>
        );
    }
}

export default MovieDetails;
