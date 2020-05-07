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


const ADD_USER = gql`
  mutation createUser($input: NewUser!) {
    createUser(input: $input) {
      id
      email
      age
      uid
    }
  }
`;



export default class AddUser extends Component {
  constructor() {
    super();

    this.state = { 
        age: "",
        email: "",
        password:"",
        newUser:null,
        error: ""
    };
    this.firebaseSignUpHandler = this.firebaseSignUpHandler.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  
  
  firebaseSignUpHandler = async (email, password, age) => {
    const {user} = await auth.createUserWithEmailAndPassword(email, password)
    .catch(err => {
      console.log("firebase signup error: ", err)
      this.setState({
        error: "Error registering new account"
      })
    })
    this.addUserToDatabase(user.uid, email, age);
  }
  
  addUserToDatabase = (uid, email, age) => {
    client.mutate({
      variables: { input: { age, email, uid } },
      mutation: ADD_USER
    })
    .then((result) => { this.setState({error: "", newUser: result.data.createUser}) })
    .catch(() => { this.setState({error: "Error registering new account"})});
  
  }


  render() {
    return (
      <>
          <h3>Create User</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.firebaseSignUpHandler(this.state.email, this.state.password, this.state.age)
            this.setState({
              age:"",
              email:"",
              password:""
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
  
          <label>Age</label>
          <input
            type="text"
            email="age"
            value={this.state.age}
            onChange={(event) => this.setState({age: event.target.value})}
          />
          <label>Password</label>
          <input
            type="text"
            email="password"
            value={this.state.password}
            onChange={(event) => this.setState({password: event.target.value})}
          />
          <input type="submit" value="Submit" />
        </form>
        <div>
          {this.state.newUser ? (
            <p>
              user created!: ID: {this.state.newUser.id}, EMAIL: {this.state.newUser.email}, AGE:{" "}
              {this.state.newUser.age}{" "}
            </p>
          ) : (
            <p></p>
          )}
          {this.state.error ? (<p>Error registering new account</p>):(
            <p></p>
          )}
         
        </div>
       
      </>
    );
  }
}
