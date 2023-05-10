import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";

const FilterButton = ({ name, cmd, status, setFilters }) => {
  const [isAscending, setIsAscending] = useState(true);
  const { getStops, setState, state } = useContext(AppContext);

  const handlePress = async () => {
    setIsAscending(!isAscending);

    const prefix = isAscending ? "" : "-";
    setState((prevState) => ({ ...prevState, command: prefix + cmd}));
    
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.name !== name) {
          return {
            ...filter,
            status: "unactive"
          };
        }
        return {
          ...filter,
          status: "active"
        }; 
      })
    );
  };

  const buttonStyles = [
    styles.button,
    isAscending ? styles.activeButton : styles.inactiveButton,
  ];

  const textStyles = [
    styles.text,
    isAscending ? styles.activeText : styles.inactiveText,
  ];

  const unactiveBtnStyles = [
    styles.button,
    styles.unactive,
  ];

  const unactiveTextStyles = [
    styles.text,
    styles.activeText,
  ];

  return (
    <TouchableOpacity style={status === "active" ? buttonStyles : unactiveBtnStyles} onPress={handlePress}>
      <Text style={status === "active" ? textStyles : unactiveTextStyles}>
        {name} {status !== "unactive" && (isAscending ? "▲" : "▼")}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  inactiveButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#007AFF",
  },
  unactive: {
    backgroundColor: "#808080",
    borderColor: "#000",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  activeText: {
    color: "#FFFFFF",
  },
  inactiveText: {
    color: "#007AFF",
  },
});

export default FilterButton;
