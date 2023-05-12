import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import StopItem from '../../shared/StopItem'
import CustomModal from '../../shared/CustomModal'
import ShowStopContent from '../../shared/ShowStopContent'
import CloseStopsService from '../../services/CloseStopsService'
import { AppContext } from '../../context/AppContext'

const CloseStops = () => {
  const focus = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [stops, setStops] = useState([])
  const { state, getLocation } = useContext(AppContext)

  const handleOpenModal = item => {
    setModalVisible(true)
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const data = await CloseStopsService.getNearStopsList(state.location)
        setStops(data?.records)
      } catch (error) {
        console.error(error)
      }
    }
    if (focus && state.location) {
      fetchStops()
    }
  }, [focus])

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {stops.map((item, index) => (
          <StopItem
            key={index}
            item={item}
            index={index}
            showHeart={false}
            showDistance
            toggleModal={handleOpenModal}
          />
        ))}
      </ScrollView>

      <CustomModal visible={modalVisible} onClose={handleCloseModal}>
        <ShowStopContent item={selectedItem} />
      </CustomModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})

export default CloseStops
