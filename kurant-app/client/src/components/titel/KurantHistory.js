import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import KurantService from "../../services/KurantService";

import Nav from "../layout/Nav";

function KurantHistory() {
  const [error, setError] = useState("");
  const [kurantHistory, setKurantHistory] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [kurantSum, setKurantSum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setError("");

    async function history() {
      try {
        const kurantRes = await KurantService.getKurant("titel");
        setKurantHistory([...kurantRes].map((kurant) => kurant));
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }

    async function sum() {
      try {
        const kurantRes = await KurantService.getKurant("titel");

        setKurantSum(
          [...kurantRes].reduce((prev, curr) => {
            return prev + curr.money;
          }, 0)
        );
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }

    async function top() {
      try {
        const kurantRes = await KurantService.getKurant("titel");

        setTopUsers(
          [...kurantRes]
            .reduce(function (acc, curr) {
              const found = acc.find((e) => e.id === curr.id);
              if (found) found.money = found.money + curr.money;
              return found ? acc : acc.concat(curr);
            }, [])
            .sort((prev, curr) => {
              return curr.money - prev.money;
            })
            .slice(0, 3)
        );
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }

    history();
    sum();
    top();
  }, [rerender]);

  async function handleDelete(_id) {
    try {
      setLoading(true);
      setError('');
      await KurantService.deleteKurant(_id);
      setRerender(!rerender);
    } catch (err) {
      setError(err);
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <>
      <Nav />
      <div className="h1-parent">
        <h1>Stats - Titel</h1>
      </div>
      {error ? error : ""}
      <hr></hr>
      <div>
        <h2>Total: {loading ? "Loading..." : kurantSum}</h2>
      </div>
      <div>
        <h4>Topplista</h4>
        <div className="top-kurant-history-container">
          {loading
            ? "Loading..."
            : topUsers.map((user) => (
                <div className="top-kurant-history-item">
                  <p>{user.username}</p>
                  <p> {user.money}</p>
                </div>
              ))}
        </div>
      </div>
      <div>
        <hr></hr>

        <div className="kurant-history-container">
          {loading
            ? "Loading..."
            : kurantHistory.map((kurant) => (
                <div className="kurant-history-item">
                  <p>{kurant.username}</p>
                  <p> {kurant.money}</p>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(kurant._id)}>
                    Delete
                  </button>
                </div>
              ))}
        </div>

        <button>
          {" "}
          <Link to="/"> Tillbaka </Link>{" "}
        </button>
      </div>
    </>
  );
}

export default KurantHistory;
