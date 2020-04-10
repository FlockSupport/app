import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Page from "./Page";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import { ApolloLink } from "apollo-boost";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const link = createHttpLink({ uri: "http://localhost:8000/query" });

const client = new ApolloClient({
  uri: "http://localhost:8080/query",
  link: ApolloLink.from([errorLink, link])
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Page></Page>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
