import { WebSocketLink } from "@apollo/client/link/ws";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";

import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { getMainDefinition } from "@apollo/client/utilities";

const GRAPHQL_ENDPOINT = "/graphql";
const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

// TODO: query origin server in production
const webSocketProtocolAndHost = `ws://localhost:3004`;
const wsLink = new WebSocketLink({
  uri: `${webSocketProtocolAndHost}${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
