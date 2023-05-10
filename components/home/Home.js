import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AppContext } from "../../context/AppContext";

const Home = () => {
  const { getStops, state, getLocation, getNearStops } = useContext(AppContext);
  const [mapRef, setMapRef] = useState(null);
  const { location } = state;

  const handleReposition = () => {
    if (mapRef) {
      mapRef.animateCamera(
        {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 15,
        },
        1000
      );
    }
  };

  const handleSearchStopsInArea = async () => {
    const boundaries = await mapRef.getMapBoundaries();
    const centerLat =
      (boundaries.northEast.latitude + boundaries.southWest.latitude) / 2;
    const centerLng =
      (boundaries.northEast.longitude + boundaries.southWest.longitude) / 2;
    // const latDelta =
    //   boundaries.northEast.latitude - boundaries.southWest.latitude;
    // const lngDelta =
    //   boundaries.northEast.longitude - boundaries.southWest.longitude;
    
    getNearStops(centerLat, centerLng);
  };

  useEffect(() => {
    getLocation();
    getStops();
  }, []);

  const markers = state.stops?.records?.map((r) => ({
    lat: r.fields.geo_point_2d[0],
    lon: r.fields.geo_point_2d[1],
  }));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={(ref) => setMapRef(ref)}
        initialRegion={{
          latitude: 15.4989,
          longitude: -88.0353,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lon }}
            title={`Marker ${index + 1}`}
            description={`Lat: ${marker.lat}, Lon: ${marker.lon}`}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.repositionButton}
        onPress={handleReposition}
      >
        <Text style={styles.repositionButtonText}>Reposicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearchStopsInArea}
      >
        <Text style={styles.searchButtonText}>Buscar paradas en esta área</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  repositionButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#e6e6e6",
    borderWidth: 1,
    borderColor: "#999999",
    padding: 10,
    borderRadius: 5,
  },
  repositionButtonText: {
    color: "#333333",
    fontWeight: "bold",
  },
  searchButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#e6e6e6",
    borderWidth: 1,
    borderColor: "#999999",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#333333",
    fontWeight: "bold",
  },
});

export default Home;
