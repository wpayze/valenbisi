import { View, StyleSheet } from 'react-native'
import FilterButton from './FilterButton'
import { useState } from 'react'

const StopFilters = () => {
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
    // {
    //   name: "Proximidad",
    //   cmd: "proximity",
    //   status: "unactive",
    // },
  ])

  return (
    <View style={styles.filters}>
      {filters?.map((f, index) => (
        <FilterButton key={index} {...f} setFilters={setFilters} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  }
})

export default StopFilters
