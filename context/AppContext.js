import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    username: null,
    token: null,
    stops: [],
  });

  //Llamadas a API

  const getStops = async () => {
    try {
      const response = await fetch(
        "https://valencia.opendatasoft.com/api/records/1.0/search/?dataset=valenbisi-disponibilitat-valenbisi-dsiponibilidad"
      );
      const data = await response.json();
      setState((prevState) => ({ ...prevState, stops: data }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider value={{ state, setState, getStops}}>
      {children}
    </AppContext.Provider>
  );
};
