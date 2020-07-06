import React, { Component } from 'react';

class MovieEdited extends Component{

    state = {
        editedMovie:this.props.selMovie
    }

    changeDetails = (evt)=>{
        let movie = this.state.editedMovie
        movie[evt.target.name] = evt.target.value
        this.setState({editedMovie:movie})
    }

    updateClick = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/${this.props.selMovie.id}/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
            }).then( res => res.json())
            .then(res => this.props.updateMovie(res))
            .catch(error => console.log(error));
    }

    saveClick =()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedMovie)
            }).then( res => res.json())
            .then(res => this.props.newMovie(res))
            .catch(error => console.log(error));
    }


    render(){ 
        let disable = this.props.selMovie.title.length===0 || this.props.selMovie.description.length===0
        return(
            <React.Fragment>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" name="title" type="text" value={this.props.selMovie.title} onChange={this.changeDetails} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" name="description" value={this.props.selMovie.description} onChange={this.changeDetails} />
                </div>
                {this.props.selMovie.id ? 
                    <button className="btn btn-primary" disabled={disable} onClick={this.updateClick}>Update</button>
                    :
                    <button className="btn btn-primary" disabled={disable} onClick={this.saveClick}>Save</button>
                }
                &nbsp;
                <button className="btn btn-secondary" onClick={this.props.cancelClick}>Cancel</button>
            </React.Fragment>
        );
    }
}

export default MovieEdited;
