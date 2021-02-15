import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserContextProvider( props ) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:5000/admin/loggedIn");
    setLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
