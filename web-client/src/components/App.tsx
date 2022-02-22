import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { Link, Route, Switch } from "react-router-dom";
import { GetWilders } from "../schemaTypes";

import "./App.css";
import * as styled from "./App.styled";
import Loader from "./atoms/Loader";
import CreateWilderForm from "./CreateWilderForm";
import Wilder from "./Wilder";

export const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      name
      city
      skills {
        title
        votes
      }
      missingSignatureCount
    }
  }
`;

export const ON_WILDER_UPDATE = gql`
  subscription OnWilderUpdate {
    onWilderUpdate {
      id
      missingSignatureCount
    }
  }
`;

const App = () => {
  const { loading, data } = useQuery<GetWilders>(GET_WILDERS);

  useSubscription(ON_WILDER_UPDATE);

  const removeWilder = (name: string) => {
    // TODO: optimistic update of wilders after removing wilder
    // setWilders(wilders.filter((wilder) => wilder.name !== name));
  };

  return (
    <div>
      <styled.Header>
        <styled.Container>
          <h1>Wilders Book</h1>
        </styled.Container>
      </styled.Header>

      <Switch>
        <Route exact path="/">
          <styled.Container>
            <h2>Wilders</h2>
            <Link to="/create-wilder">Ajouter un nouveau wilder</Link>
            {loading ? (
              <Loader role="progressbar" />
            ) : (
              <section
                className="card-row"
                role="list"
                data-testid="wilderList"
              >
                {data?.wilders.map((wilder) => {
                  return (
                    <Wilder
                      key={wilder.id}
                      id={wilder.id}
                      name={wilder.name}
                      city={wilder.city}
                      skills={wilder.skills}
                      onDelete={removeWilder}
                      missingSignatureCount={wilder.missingSignatureCount}
                    />
                  );
                })}
              </section>
            )}
          </styled.Container>
        </Route>
        <Route path="/create-wilder">
          <CreateWilderForm />
        </Route>
      </Switch>

      <footer>
        <styled.Container>
          <p>&copy; 2020 Wild Code School</p>
        </styled.Container>
      </footer>
    </div>
  );
};

export default App;
