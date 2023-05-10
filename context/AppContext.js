import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    stops: [],
    records: 0,
    itemsPerPage: 30,
    command: null,
    start: 0,
    location: null
  });

  const apiUrl = `https://valencia.opendatasoft.com/api/records/1.0/search/?dataset=valenbisi-disponibilitat-valenbisi-dsiponibilidad&`;

  //Llamadas a API

  const getNearStops = async (latitude, longitude) => {
    try {
      const proximity = `${latitude},${longitude},2000`;
      const response = await fetch(
        `${apiUrl}&geofilter.distance=${proximity}&rows=300`
      );
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        stops: data
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const getStops = async () => {
    try {
      const proximity = state.command === "proximity" && state.location ? `${state.location.coords.latitude},${state.location.coords.longitude},1000` : "";
      let sort = state.command ? state.command : "-number";

      if (state.command === "proximity") {
        sort = "-number";
      }
      const response = await fetch(
        `${apiUrl}rows=${state.itemsPerPage}&sort=${sort}&start=${state.start}&geofilter.distance=${proximity}`
      );
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        stops: data,
        records: data.nhits,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setState((prevState) => ({
      ...prevState,
      location
    }));
  };

  useEffect(() => {
    getStops();
  }, [state.command])

  useEffect(() => {
    getStops();
  }, [state.start]);

  return (
    <AppContext.Provider value={{ state, setState, getStops, getLocation, getNearStops }}>
      {children}
    </AppContext.Provider>
  );
};
