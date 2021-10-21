import axios from "axios";
import { FormEvent, useState } from "react";
import PropTypes from "prop-types";

import { ToastContainer, toast, ToastContent } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as styled from "./CreateWilderForm.styled";
import { Link } from "react-router-dom";

const CreateWilderForm = ({
  onSuccess,
}: {
  onSuccess: () => Promise<void>;
}) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("Bordeaux");

  const notifyWilderHasBeenCreated = () =>
    toast.success("Wilder has been created");
  const notifyError = (error: ToastContent) => toast.error(error);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("/wilders", { name, city });
      notifyWilderHasBeenCreated();
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notifyError(error.response?.data.result);
      }
    }
  };

  return (
    <styled.Container>
      <>
        <Link to="/">Afficher la liste des wilders</Link>
        <h2>Ajouter un nouveau wilder</h2>
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
        <ToastContainer position="bottom-right" />
      </>
    </styled.Container>
  );
};

CreateWilderForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default CreateWilderForm;
