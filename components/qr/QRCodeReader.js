import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import CustomModal from '../../shared/CustomModal'
import ShowStopContent from '../../shared/ShowStopContent'
import { useIsFocused } from '@react-navigation/native'

const QRCodeReader = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const focus = useIsFocused()

  useEffect(() => {
    if (focus) {
      setScanned(false)
    }
  }, [focus])

  const apiUrl =
    'https://valencia.opendatasoft.com/api/records/1.0/search/?dataset=valenbisi-disponibilitat-valenbisi-dsiponibilidad&q=gid='

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleOpenModal = (item) => {
    setSelectedItem(item)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setScanned(false)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    // handleOpenModal()

    console.log(apiUrl + data)

    fetch(apiUrl + data)
      .then((response) => response.json())
      .then((data) => {
        handleOpenModal(data.records[0])
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error)
      })
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
      <CustomModal visible={modalVisible} onClose={handleCloseModal}>
        <ShowStopContent item={selectedItem} />
      </CustomModal>
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
