import React from "react";
//import { ApolloLink } from 'apollo-link';
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Users from './components/users'
import UserProvider from './providers/UserProvider'

// import { onError } from "apollo-link-error";
// import { createHttpLink } from "apollo-link-http";

// const errorLink = onError(({ graphQLErrors }) => {
//   if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
// });

// const link = createHttpLink({ uri: "http://localhost:8000/query" });

const client = new ApolloClient({
  uri: "http://localhost:8080/query",
  // link: ApolloLink.from([errorLink, link])
});


function App() {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Users></Users>
        </div>
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;
