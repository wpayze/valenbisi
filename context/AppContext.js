import React, { createContext, useEffect, useState } from 'react'
import * as Location from 'expo-location'
export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    stops: [],
    records: null,
    itemsPerPage: 15,
    command: null,
    search: '',
    start: 0,
    location: null,
    nearStopsRange: 2000
  })

  const apiUrl =
    'https://valencia.opendatasoft.com/api/records/1.0/search/?dataset=valenbisi-disponibilitat-valenbisi-dsiponibilidad&'

  // Llamadas a API

  const getNearStops = async (latitude, longitude) => {
    try {
      const proximity = `${latitude},${longitude},${state.nearStopsRange}`
      const response = await fetch(
        `${apiUrl}&geofilter.distance=${proximity}&rows=${
          state.records ? state.records : '300'
        }`
      )
      const data = await response.json()
      setState(prevState => ({
        ...prevState,
        stops: data
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const getStops = async () => {
    try {
      const search =
        state.search.trim() !== '' ? `&q=address=${state.search}` : ''
      const sort = state.command ? state.command : '-number'
      const response = await fetch(
        `${apiUrl}rows=${state.itemsPerPage}&sort=${sort}&start=${state.start}${search}`
      )
      const data = await response.json()
      setState(prevState => ({
        ...prevState,
        stops: data,
        records: data.nhits
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    setState(prevState => ({
      ...prevState,
      location
    }))
  }

  useEffect(() => {
    getStops()
  }, [state.command, state.start, state.search])

  return (
    <AppContext.Provider
      value={{ state, setState, getStops, getLocation, getNearStops }}
    >
      {children}
    </AppContext.Provider>
  )
}
