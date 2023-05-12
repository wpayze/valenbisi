import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import StopItem from '../../shared/StopItem'
import CustomModal from '../../shared/CustomModal'
import ShowStopContent from '../../shared/ShowStopContent'
import CloseStopsService from '../../services/CloseStopsService'
import { AppContext } from '../../context/AppContext'

import loadingAnimation from '../../assets/spinner.json'
import AnimatedLottieView from 'lottie-react-native'
import FavoriteService from '../../services/FavoriteService'

const CloseStops = () => {
  const focus = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [stops, setStops] = useState([])
  const { state, getLocation } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState([])

  const handleOpenModal = (item) => {
    setModalVisible(true)
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleFavoriteToggle = async (id) => {
    const favorites = await FavoriteService.toggleFavorite(id)
    setFavorites(favorites)
  }

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const data = await CloseStopsService.getNearStopsList(state.location)
        setStops(data?.records)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchFavorites = async () => {
      const favorites = await FavoriteService.getLocalFavorites()
      setFavorites(favorites)
    }

    if (focus && state.location) {
      setIsLoading(true)
      fetchFavorites()
      fetchStops()
    }
  }, [focus])

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <View style={styles.container}>
      {isLoading
        ? (
          <AnimatedLottieView source={loadingAnimation} autoPlay loop />
          )
        : (
          <ScrollView>
            {stops.map((item, index) => (
              <StopItem
                key={index}
                item={item}
                index={index}
                showDistance
                favorites={favorites}
                favTogg={handleFavoriteToggle}
                toggleModal={handleOpenModal}
              />
            ))}
          </ScrollView>
          )}

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
