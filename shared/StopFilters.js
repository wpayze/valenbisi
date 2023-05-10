import { View, StyleSheet } from "react-native";
import FilterButton from "./FilterButton";
import { useState } from "react";
import FilterButtonBinary from "./FilterButtonBinary";

const StopFilters = () => {
  const [filters, setFilters] = useState([
    {
      name: "Disponibles",
      cmd: "available",
      status: "unactive",
      type: "ascdesc",
    },
    {
      name: "Huecos",
      cmd: "free",
      status: "unactive",
      type: "ascdesc",
    },
    {
      name: "Proximidad",
      cmd: "proximity",
      status: "unactive",
      type: "binary",
    },
  ]);

  return (
    <View style={styles.filters}>
      {filters?.map((f, index) =>
        f.type === "ascdesc" ? (
          <FilterButton key={index} {...f} setFilters={setFilters} />
        ) : (
          <FilterButtonBinary key={index} {...f} setFilters={setFilters} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});

export default StopFilters;
