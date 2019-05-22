import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';
import axios from "axios";

import web3 from "./web3";
import token from "./token";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      login:false,
      register:false,
      logged:false,
      airlines:[],
      myairline:[]
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.showlogin = this.showlogin.bind(this);
    this.showregister = this.showregister.bind(this);

  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }


  register = event => {
    let username = this.state.username;
    let password= this.state.password;
    var self = this;

  axios.post("http://localhost:3001/api/register", {username: username,password: password})
    .then(function (response) {
            if (response.data.redirect == '/') {
                self.setState({
                  logged:true,
                  myairline:response.data.airline
                })
    axios.post("http://localhost:3001/api/getAirlines", {flight:self.state.myairline})
    .then(function (response) {
            self.setState({
              airlines:response.data
            })
            console.log(self.state.airlines)


        })

            } 
            else {
                window.alert('Wrong Password or Username');

            } 
        })
  };
  regiairy = event => {
    let username = this.state.username;
    let password= this.state.password;
    var self = this;

  axios.post("http://localhost:3001/api/regiairy", {username: username,password: password})
    .then(function (response) {
            if (response.data.redirect == '/') {
               self.setState({
                  logged:true
                })
            } 
            else {
                window.alert('Wrong Password or Username');

            } 
        })
  };
showlogin(event){
      this.setState({
      login:true
    });
}

showregister(event){
      this.setState({
      register:true
    });
}

  login = event => {
    let username = this.state.username;
    let password= this.state.password;
    var self = this;
    axios.post("http://localhost:3001/api/login", {username: username,password: password})
    .then(function (response) {
            if (response.data.redirect == '/') {
                self.setState({
                  logged:true,
                  myairline:response.data.airline
                })
    axios.post("http://localhost:3001/api/getAirlines", {flight:self.state.myairline})
    .then(function (response) {
            self.setState({
              airlines:response.data
            })
            console.log(self.state.airlines)


        })

            } 
            else {
                window.alert('Wrong Password or Username');

            } 
        })



};


  transfer = async event => {
    event.preventDefault();
    this.setState({ status: "Transfer in progress..." });

    try {
      const accounts = await web3.eth.getAccounts();
      const tx = await token.methods
        .transfer(this.state.address, this.state.amount)
        .send({ from: accounts[0] });
      const balance = await token.methods.balanceOf(accounts[0]).call();
      this.setState({
        status: "TxHash: " + tx.transactionHash,
        balance
      });
    } catch (error) {
      this.setState({ status: error.message });
    }
  };


  render() {
        const { data } = this.state;

    return (

      <Router>
      <div className="App">


        <Route path="/register" exact render={
          ()=> {

                if (this.state.logged) {
    return <Redirect to={{
      pathname: '/Airline',
      state: { username: this.state.username}
    }} />;
                  }
            return (
              <div>
 <form ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit}>
<h1>Register Airline Account</h1>
  <div className="container">
    <input type="text" placeholder="Enter Airline Name" onChange={e => this.setState({ username: e.target.value })} required />
    <input type="password" placeholder="Enter Password"  onChange={e => this.setState({ password: e.target.value })} required />
    <button onClick={() => this.regiairy()} type="submit">Register</button>

  </div>

</form>
<Link to='/'>Back</Link>


      </div>

     

);
          }

         }/>


        <Route path="/Airline" exact render={
          ()=> {
    return(
 <div>
          <h1>Welcome</h1>
          <h1>{this.state.username}</h1>
           <div>


        </div>
          </div>

      )
     

}
          

         }/>        
        <Route path="/" exact render={
          ()=> {
     
    if (this.state.logged) {
        return(
          <div>
          <h1>Welcome</h1>
          <h1>{this.state.username}</h1>
           <div>
          <h1>Your Airline:</h1>
          <h1>{this.state.myairline}</h1>
           <h1>Airlines:</h1>
          

        {
          this.state.airlines.map((airlines, index)=>{
                                return (
                                  <div>
                                    <button id={index}>{airlines}</button>
                                    </div>
                                  )
                            })
        }
        </div>
          </div>

          )

                  }


    if(this.state.login){
            return (
              <div>
<h1>Login</h1>
  <div className="container">

 <form ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label>User Name</label>
          <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

          <label>Password</label>
          <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <input type="submit" onClick={() => this.login()} value="Log In" data-test="submit" />
        </form>
  </div>

      </div>

     

);

}
    if (this.state.register) {

            return (
              <div>
 <form ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit}>
<h1>Register Account</h1>
  <div className="container">
    <input type="text" placeholder="Enter Username" onChange={e => this.setState({ username: e.target.value })} required />
    <input type="password" placeholder="Enter Password"  onChange={e => this.setState({ password: e.target.value })} required />
    <button onClick={() => this.register()} type="submit">Register</button>

  </div>

</form>

      </div>

          )

                  }
return (
  <div>

<h1>Welcome</h1>
<button onClick={this.showlogin}>Login</button>
<button onClick={this.showregister}>Register</button>
<div>
<Link to='/register'>Airline Register </Link>
</div>
  </div>


)

          }

         }/>








      </div>
      </Router>

    );
  }
}

export default App;
