import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import * as styled from "./App.styled";
import Wilder from "./Wilder";

const App = () => {
  const [wilders, setWilders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("/wilders");
      setWilders(response.data.result);
    };

    fetchData();
  }, []);

  console.log(`rendering App with wilders: ${wilders}`);

  return (
    <div>
      <styled.Header>
        <styled.Container>
          <h1>Wilders Book</h1>
        </styled.Container>
      </styled.Header>
      <styled.Container>
        <h2>Wilders</h2>
        <section className="card-row">
          {wilders.map((wilder) => {
            return (
              <Wilder
                key={wilder._id}
                name={wilder.name}
                city={wilder.city}
                skills={wilder.skills}
              />
            );
          })}
        </section>
      </styled.Container>
      <footer>
        <styled.Container>
          <p>&copy; 2020 Wild Code School</p>
        </styled.Container>
      </footer>
    </div>
  );
};

export default App;
