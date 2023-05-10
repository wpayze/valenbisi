import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";

const FilterButtonBinary = ({ name, cmd, status, setFilters }) => {
  const [isActive, setIsActive] = useState(false);
  const { setState } = useContext(AppContext);

  const handlePress = async () => {
    setIsActive(!isActive);

    setState((prevState) => ({
      ...prevState,
      command: isActive ? "" : cmd
    }));

    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.name !== name) {
          return {
            ...filter,
            status: "unactive",
          };
        }
        return {
          ...filter,
          status: isActive ? "unactive" : "active",
        };
      })
    );
  };

  const buttonStyles = [
    styles.button,
    isActive ? styles.activeButton : styles.inactiveButton,
  ];

  const textStyles = [
    styles.text,
    isActive ? styles.activeText : styles.inactiveText,
  ];

  const unactiveBtnStyles = [styles.button, styles.unactive];

  const unactiveTextStyles = [styles.text, styles.inactiveText];

  return (
    <TouchableOpacity
      style={status === "active" ? buttonStyles : unactiveBtnStyles}
      onPress={handlePress}
    >
      <Text style={status === "active" ? textStyles : unactiveTextStyles}>
        {name} {isActive ? "✓" : ""}
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
    color: "#FFFFFF",
  },
});

export default FilterButtonBinary;
