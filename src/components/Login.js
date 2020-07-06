import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component{
    state={
        userLogin:{
            username:'',
            password:'',
            cPassword:''
        },
        userError: null,
        passError: null,
        isLogin: false,
        usernameError: null
    }

    changeDetails = (evt)=>{
        let loginUser = this.state.userLogin
        loginUser[evt.target.name] = evt.target.value
        this.setState({user:loginUser})
    }

    loginClick = ()=>{
        fetch(`${process.env.REACT_APP_API_URL}/auth/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.userLogin)
            }).then( res => res.json())
            .then(res => {
                this.props.cookies.set('token', res.token);
                if(res.token){
                    window.location.href = '/movies';
                    this.props.cookies.set('user', res.name)
                }
                else{
                    this.setState({userError:'error'})
                }
            })
            .catch(error => console.log(error));
    }
    toggleLogin=()=>{
        this.setState({isLogin: !this.state.isLogin, userError:null, usernameError:null,passError:null});        
    }
    registerClick = ()=>{
        this.setState({userError:null, usernameError:null,passError:null});
        if(this.state.userLogin.password!==this.state.userLogin.cPassword){
            this.setState({passError:'error'})
        }
        else{
            fetch(`${process.env.REACT_APP_API_URL}/api/user/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.userLogin)
                }).then( res => res.json())
                .then(res => {
                    this.setState({usernameError:res})
                    console.log(this.state.usernameError)
                })
                .catch(error => {
                    console.log(error)
                });
                if(this.state.usernameError){
                    window.location.href='/';
                }
        }
    }

    render(){
        return(
            <div className="App">
                <div className="container login">
                <br/>
                    {this.state.isLogin ? <h1 align="center">Register</h1>:<h1 align="center">Login</h1>}
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" name="username" type="text" value={this.state.userLogin.username} onChange={this.changeDetails} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.userLogin.password} onChange={this.changeDetails} />
                    </div>
                    {this.state.isLogin ? (
                        <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" name="cPassword" value={this.state.userLogin.cPassword} onChange={this.changeDetails} />
                        </div>
                    ):null}
                    {this.state.isLogin ? <button className="btn btn-secondary" onClick={this.registerClick}>Register</button>
                    : <button className="btn btn-secondary" onClick={this.loginClick}>Login</button>}
                    {this.state.isLogin ? <p className="click" onClick={this.toggleLogin}>Back To Login</p>
                    : <p onClick={this.toggleLogin} className="click">Create a Account</p>}
                    {this.state.userError ? <p style={{color:'red'}}>Please Enter Correct Username and Password</p>:null}
                    {this.state.passError ? <p style={{color:'red'}}>Password should be match</p>:null}
                    {this.state.usernameError ? <p style={{color:'red'}}>A user with that username already exists</p>:null}
                </div>                
            </div>
        );
    }
}

export default withCookies(Login);
