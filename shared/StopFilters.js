import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import FilterButton from './FilterButton'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const StopFilters = ({ fireReset, setFireReset }) => {
  const { setState } = useContext(AppContext)
  const [filters, setFilters] = useState([
    {
      name: 'Disponibles',
      cmd: 'available',
      status: 'unactive'
    },
    {
      name: 'Huecos',
      cmd: 'free',
      status: 'unactive'
    }
  ])

  useEffect(() => {
    resetFilters()
    setState((prevState) => ({ ...prevState, command: null, start: 0 }))
  }, [fireReset])

  const resetFilters = () => {
    const updatedFilters = filters.map((filter) => ({
      ...filter,
      status: 'unactive'
    }))

    setFilters(updatedFilters)
  }

  return (
    <View style={styles.filters}>
      {filters?.map((f, index) => (
        <FilterButton key={index} {...f} setFilters={setFilters} />
      ))}
      <TouchableOpacity style={styles.button} onPress={() => setFireReset(prev => !prev)}>
        <Text style={styles.buttonText}>Borrar Filtros</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  button: {
    borderRadius: 4,
    padding: 8,
    borderWidth: 1
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16
  }
})

export default StopFilters
