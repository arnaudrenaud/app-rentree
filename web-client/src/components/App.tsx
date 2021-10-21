import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";

import { WilderType } from "../types";
import "./App.css";
import * as styled from "./App.styled";
import Loader from "./atoms/Loader";
import CreateWilderForm from "./CreateWilderForm";
import Wilder from "./Wilder";

const App = () => {
  const [wilders, setWilders] = useState<WilderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWilders = async () => {
    const response = await axios("/wilders");
    setWilders(response.data.result);
    setLoading(false);
  };

  const removeWilder = (name: string) => {
    setWilders(wilders.filter((wilder) => wilder.name !== name));
  };

  useEffect(() => {
    fetchWilders();
  }, []);

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
              <Loader />
            ) : (
              <section className="card-row">
                {wilders.map((wilder) => {
                  return (
                    <Wilder
                      key={wilder._id}
                      name={wilder.name}
                      city={wilder.city}
                      skills={wilder.skills}
                      onDelete={removeWilder}
                    />
                  );
                })}
              </section>
            )}
          </styled.Container>
        </Route>
        <Route path="/create-wilder">
          <CreateWilderForm onSuccess={fetchWilders} />
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
