import React, { useContext, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import { AppContext } from '../context/AppContext'

const StopSearch = () => {
  const [searchText, setSearchText] = useState('')
  const { setState } = useContext(AppContext)

  const handleSearch = () => {
    setState((prevState) => ({ ...prevState, search: searchText }))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Buscar...'
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default StopSearch
