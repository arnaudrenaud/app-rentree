import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const SIGN_IN = gql`
  mutation SignIn($emailAddress: String!, $password: String!) {
    signIn(emailAddress: $emailAddress, password: $password) {
      id
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
          signIn({ variables: { emailAddress, password } });
        }}
      >
        <label>
          Email :
          <input
            type="email"
            onChange={(event) => {
              setEmailAddress(event.target.value);
            }}
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
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
