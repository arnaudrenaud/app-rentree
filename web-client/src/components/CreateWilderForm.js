import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

import * as styled from "./CreateWilderForm.styled";

const CreateWilderForm = ({ onSuccess }) => {
  const [shown, setShown] = useState(true);
  const [name, setName] = useState("");
  const [city, setCity] = useState("Bordeaux");
  const [status, setStatus] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/wilders", { name, city });
      setStatus({
        success: true,
        message: "Wilder successfully created.",
      });
      onSuccess();
    } catch (error) {
      setStatus({
        success: false,
        message: error.response.data.result,
      });
    }
  };

  return (
    <styled.Container>
      <button
        onClick={() => {
          setShown(!shown);
        }}
      >
        {shown ? "Cacher le formulaire" : "Afficher le formulaire"}
      </button>
      {shown && (
        <>
          <form onSubmit={submitForm}>
            <label>
              Name:{" "}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <label>
              City :{" "}
              <input
                type="text"
                name="city"
                value={city}
                onChange={(event) => {
                  setCity(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
          {status && (
            <styled.StatusMessage success={status.success}>
              {status.message}
            </styled.StatusMessage>
          )}
        </>
      )}
    </styled.Container>
  );
};

CreateWilderForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default CreateWilderForm;
