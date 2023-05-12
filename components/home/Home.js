import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout, Circle } from 'react-native-maps'
import { AppContext } from '../../context/AppContext'

const Home = () => {
  const { getStops, state, getLocation, getNearStops } = useContext(AppContext)
  const [mapRef, setMapRef] = useState(null)
  const { location } = state

  const handleReposition = () => {
    if (mapRef) {
      mapRef.animateCamera(
        {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          zoom: 15
        },
        1000
      )
    }
  }

  const handleSearchStopsInArea = async () => {
    const boundaries = await mapRef.getMapBoundaries()
    const centerLat =
      (boundaries.northEast.latitude + boundaries.southWest.latitude) / 2
    const centerLng =
      (boundaries.northEast.longitude + boundaries.southWest.longitude) / 2
    // const latDelta =
    //   boundaries.northEast.latitude - boundaries.southWest.latitude;
    // const lngDelta =
    //   boundaries.northEast.longitude - boundaries.southWest.longitude;

    getNearStops(centerLat, centerLng)
  }

  useEffect(() => {
    getLocation()
    getStops()
  }, [])

  const markers = state.stops?.records?.map((r) => ({
    lat: r.fields.geo_point_2d[0],
    lon: r.fields.geo_point_2d[1],
    address: r.fields.address,
    available: r.fields.available,
    free: r.fields.free
  }))

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={(ref) => setMapRef(ref)}
        initialRegion={{
          latitude: 39.4699,
          longitude: -0.3763,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {location && (
          <Circle
            center={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            radius={50} // Radio en metros del círculo
            strokeColor='rgba(0, 0, 255, 0.5)'
            fillColor='rgba(0, 0, 255, 0.1)'
          />
        )}

        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lon }}
            title={`Marker ${index + 1}`}
            description={`Lat: ${marker.lat}, Lon: ${marker.lon}`}
          >
            <Callout>
              <View>
                <Text>Dirección: {marker.address}</Text>
                <Text>Bicis disponibles: {marker.available}</Text>
                <Text>Huecos: {marker.free}</Text>
              </View>
            </Callout>
          </Marker>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  repositionButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#e6e6e6',
    borderWidth: 1,
    borderColor: '#999999',
    padding: 10,
    borderRadius: 5
  },
  repositionButtonText: {
    color: '#333333',
    fontWeight: 'bold'
  },
  searchButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#e6e6e6',
    borderWidth: 1,
    borderColor: '#999999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  searchButtonText: {
    color: '#333333',
    fontWeight: 'bold'
  }
})

export default Home
