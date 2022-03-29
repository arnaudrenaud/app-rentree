import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { GET_MY_PROFILE } from "./App";

const SIGN_IN = gql`
  mutation SignIn($emailAddress: String!, $password: String!) {
    signIn(emailAddress: $emailAddress, password: $password) {
      emailAddress
    }
  }
`;

const SignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { data, error }] = useMutation(SIGN_IN);

  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signIn({
            variables: { emailAddress, password },
            refetchQueries: [GET_MY_PROFILE],
          });
        }}
      >
        <label>
          Email :
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={(event) => {
              setEmailAddress(event.target.value);
            }}
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button>Valider</button>
      </form>
      {error ? "Invalid credentials." : null}
    </>
  );
};

export default SignIn;
