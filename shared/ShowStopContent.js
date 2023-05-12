import { View, Text, StyleSheet } from 'react-native'

const ShowStopContent = ({ item }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{item.fields.address}</Text>
      <Text style={styles.subtitle}>ID: {item.fields.gid}</Text>
      <Text style={styles.subtitle}>Disponibles: {item.fields.available}</Text>
      <Text style={styles.subtitle}>Libres: {item.fields.free}</Text>
      <Text style={styles.subtitle}>Total: {item.fields.total}</Text>
      <Text style={styles.subtitle}>Actualizado: {item.fields.updated_at}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 2
  }
})

export default ShowStopContent
