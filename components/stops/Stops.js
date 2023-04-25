import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../../context/AppContext";

const Stops = () => {
  const { state, getStops } = useContext(AppContext);

  const stops = state.stops.records;

  useEffect(() => {
    getStops();
  }, []);

  console.log(stops);

  return (
    <View>
      {stops?.map((item, index) => (
        <Text key={index}>{item.fields.name}</Text>
      ))}
    </View>
  );
};

export default Stops;
