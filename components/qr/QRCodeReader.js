import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

const QRCodeReader = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [scannedData, setScannedData] = useState('')

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setScannedData(data)
  }

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <View style={styles.scanDataContainer}>
          <Text style={styles.scanDataText}>Scanned Data:</Text>
          <Text style={styles.scanDataValue}>{scannedData}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  scanDataContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    margin: 20,
    borderRadius: 5
  },
  scanDataText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5
  },
  scanDataValue: {
    color: 'white',
    fontSize: 14
  }
})

export default QRCodeReader
