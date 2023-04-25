import React, { useContext } from 'react';
import LoggedInTab from "./navigations/LoggedInTab";
import NotLoggedStack from "./navigations/NotLoggedStack";

import { AppContext } from '../context/AppContext';

const Tabs = () => {
  const usuario = true;
  const { state } = useContext(AppContext);
  const isLoggedIn = state.isLoggedIn;

  return (
    <>
      {isLoggedIn ? (
        <LoggedInTab />
      ) : (
        <NotLoggedStack />
      )}
    </>
  );
};

export default Tabs;
