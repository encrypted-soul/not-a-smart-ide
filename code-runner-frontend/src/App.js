import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { EXECUTE_CODE_QUERY, INSTALL_LIBRARY_MUTATION } from "./graphql.ts";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function CodeRunner() {
  const [code, setCode] = useState("");
  const [executeCode, { data, loading, error }] =
    useLazyQuery(EXECUTE_CODE_QUERY);

  const [installLibrary] = useMutation(INSTALL_LIBRARY_MUTATION);

  const handleRunCode = () => {
    executeCode({ variables: { code } });
  };
  const [library, setLibrary] = useState("");

  const handleInstallLibrary = () => {
    installLibrary({ variables: { library } });
    setLibrary("");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        type="text"
        value={library}
        onChange={(e) => setLibrary(e.target.value)}
        placeholder="Enter library name"
      />
      <button onClick={handleInstallLibrary}>Install Library</button>
      <h1>Python Code Runner</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your Python code here"
        style={{ width: "400px", height: "200px", marginBottom: "10px" }}
      ></textarea>
      <button onClick={handleRunCode} style={{ marginBottom: "10px" }}>
        Run
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{data.executeCode}</pre>}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <CodeRunner />
    </ApolloProvider>
  );
}

export default App;
