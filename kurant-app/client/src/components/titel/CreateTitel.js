import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user-service";
import { v4 as uuidv4 } from "uuid";
import Nav from "../layout/Nav";

function Titel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [titel, setTitel] = useState({
    titel_1: "",
    titel_2: "",
    titel_3: "",
    titel_4: "",
    titel_5: "",
    titel_6: "",
    titel_7: "",
    titel_8: "",
  });

  //bör kolla så att det inte redan finns ett Titel
  //ska liksom inte gå att lägga till flera lol
  useEffect(() => {
    //todo
  }, []);

  function updateField(e) {
    setTitel({
      ...titel,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      for (const key in titel) {
        await UserService.addUsers(titel[key], uuidv4(), "titel");
      }
    } catch (err) {
      setError(err.response.data.msg);
    }

    setLoading(false);
  }

  return (
      <>
      <Nav />
      
      <div className="h1-parent">
        <h1>Skapa ett Titel </h1>
      </div>

      <div className="block-container">
        {error ? <p>{error}</p> : ''}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label for="titel_1">Titel #1</label>
            <input
              placeholder="Konglig Öfverdrif"
              type="text"
              name="titel_1"
              value={titel.titel_1}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label for="titel_2">Titel #2</label>
            <input
              placeholder="Storasyskon"
              type="text"
              name="titel_2"
              value={titel.titel_2}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label for="titel_3">Titel #3</label>
            <input
              placeholder="Konglig Indrif"
              type="text"
              name="titel_3"
              value={titel.titel_3}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label for="titel_4">Titel #4</label>
            <input
              placeholder="Konglig Direktifdrif"
              type="text"
              name="titel_4"
              value={titel.titel_4}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label for="titel_5">Titel #5</label>
            <input
              placeholder="Samdoquise"
              type="text"
              name="titel_5"
              value={titel.titel_5}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label for="titel_6">Titel #6</label>
            <input
              placeholder="Storquisine"
              type="text"
              name="titel_6"
              value={titel.titel_6}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label for="titel_7">Titel #7</label>
            <input
              placeholder="Småsyskon #1"
              type="text"
              name="titel_7"
              value={titel.titel_7}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label for="titel_8">Titel #8</label>
            <input
              placeholder="Småsyskon #2"
              type="text"
              name="titel_8"
              value={titel.titel_8}
              onChange={updateField}
              required
            />
          </div>

          <button disabled={loading} type="submit">
            Skapa
          </button>
        </form>
        <button>
          <Link to="/"> Tillbaka </Link>
        </button>
      </div>
    </>
  );
}

export default Titel;
