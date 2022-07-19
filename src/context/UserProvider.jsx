import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userRegistre, setUserRegistre] = useState();

  const dataFetch = async () => {
    await fetch(
      "https://my-json-server.typicode.com/mirkoperamas/rimac-vehicle-insurance/dates"
    )
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <UserContext.Provider value={{ users, userRegistre, setUserRegistre }}>
      {children}
    </UserContext.Provider>
  );
};
