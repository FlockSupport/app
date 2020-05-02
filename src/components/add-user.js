import React, { useState} from "react";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { gql } from "apollo-boost";
import {auth} from "../firebase";

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8080/query',
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  email: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
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


const firebaseSignUpHandler = async (email, password, age) => {
  const {user} = await auth.createUserWithEmailAndPassword(email, password)
  addUserToDatabase(user.uid, email, age);
}

const addUserToDatabase = (uid, email, age) => {
  client.mutate({
    variables: { input: { age, email, uid } },
    mutation: ADD_USER
  })
  .then(result => { console.log(result) })
  .catch(error => { console.log(error) });

}

export default function AddUser() {
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({});

  // const [addUser, { loading, error, data }] = useMutation(ADD_USER, {
  //   update: (proxy, result) => {
  //     setNewUser(result.data.createUser);
  //     firebaseSignUpHandler(email, password, age)
  //   },
  // });

  // if (loading) {
  // } else if (error) {
  //   console.log(error);
  // }

  return (
    <>
        <h3>Create User</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // addUser({
          //   variables: { input: { age, email } },
          // });
          firebaseSignUpHandler(email, password, age)
          setAge("");
          setEmail("");
          setPassword("");
        }}
      >
        <label>Email</label>
        <input
          type="text"
          email="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label>Age</label>
        <input
          type="text"
          email="age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          email="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      {/* <div>
        {data ? (
          <p>
            {" "}
            user created!: ID: {newUser.id}, NAME: {newUser.email}, AGE:{" "}
            {newUser.age}{" "}
          </p>
        ) : (
          <p></p>
        )}
      </div> */}
    </>
  );
}
