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
                'Authorization': 'Token 996df406ea6d010db63de0a8c1893ab0e6261948'
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
                'Authorization': 'Token 996df406ea6d010db63de0a8c1893ab0e6261948'
            },
            }).then( resp => resp.json())
            .then( res => this.props.updateMovie(res))
            .catch(error => console.log(error))        
    }
    
    render(){
        const movie = this.props.movie;        
        return(
            <div>
                {movie ? (
                    <div>
                        <h2>{movie.title}</h2>
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
