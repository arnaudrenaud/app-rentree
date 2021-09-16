import * as styled from "./App.styled";

import "./App.css";
import Wilder from "./Wilder";

const App = () => {
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
          <Wilder />
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
