import React, { Component} from "react";
import {auth} from "../firebase";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { gql } from "apollo-boost";
import { ApolloClient } from 'apollo-client';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/query',
});


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers:{
    "Access-Control-Allow-Origin":'*'
  }
});



const GET_USER = gql`
query users ($input : UidInput!){
  singleUser(input: $input) {
    id
    age
    email
    uid
  }
}
`;



export default class Login extends Component {
  constructor() {
    super();

    this.state = { 
        loggedIn: false,
        email: "",
        password:"",
        currentUser:{},
        error: ""
    };
    this.firebaseSignInHandler = this.firebaseSignInHandler.bind(this);
    this.retrieveUserFromDatabase = this.retrieveUserFromDatabase.bind(this);
  }

  firebaseSignInHandler = async () => {
    await auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) =>  {
        console.log("onSuccess", result.user.uid);
        
        this.retrieveUserFromDatabase(result.user.uid)
        
      })
      .catch((error) => {
        console.error("Firebase: Error signing in with password and email", error);
        this.setState({
          error: "Invalid user"
        })
      });
  };

  retrieveUserFromDatabase = (uid) => {
    uid = "lala"
    client.query({
      variables: { input: { uid} },
      query: GET_USER
    })
    .then(result => { this.setState({loggedIn: true, currentUser: result.data.singleUser})})
    .catch(error => { 
      console.log(error);
      this.setState({
        error: "Invalid user"
      })
     });
  }
  

  render() {
    return (
        <>
        <h3>User Login</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.firebaseSignInHandler()
              this.setState({
                  password:"",
                  email:""
              })
            }}
          >
            <label>Email</label>
            <input
              type="text"
              email="email"
              value={this.state.email}
              onChange={(event) => this.setState({email: event.target.value})}
            />
    
            <label>Password</label>
            <input
              type="text"
              email="password"
              value={this.state.password}
              onChange={(event) => this.setState({password: event.target.value})}
            />
            <input type="submit" value="Log in" />
          </form>
          {this.state.loggedIn && this.state.currentUser ? (
          <p>
            You are logged in! Retrieved user details - EMAIL: {this.state.currentUser.email} UID: {this.state.currentUser.uid}
          </p>
        ) : (
          <p></p>
        )}
        {this.state.error ? (<p>
            Invalid login credentials
          </p>) : (<p></p>)}

        </>
      );
  }
}
