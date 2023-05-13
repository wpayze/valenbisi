import React, { useContext, useEffect, useState } from 'react'
import FavoriteService from '../../services/FavoriteService'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { AppContext } from '../../context/AppContext'
import StopItem from '../../shared/StopItem'
import CustomModal from '../../shared/CustomModal'
import ShowStopContent from '../../shared/ShowStopContent'
import { useIsFocused } from '@react-navigation/native'
import StopFilters from '../../shared/StopFilters'
import StopPagination from '../../shared/StopPagination'
import StopSearch from '../../shared/StopSearch'

const Stops = () => {
  const { state, getStops } = useContext(AppContext)
  const [favorites, setFavorites] = useState([])
  const stops = state.stops.records
  const focus = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [fireReset, setFireReset] = useState(false)

  const handleOpenModal = (item) => {
    setModalVisible(true)
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await FavoriteService.getLocalFavorites()
      setFavorites(favorites)
    }

    if (focus) {
      fetchFavorites()
      getStops()
    }
  }, [focus])

  const handleFavoriteToggle = async (id) => {
    const favorites = await FavoriteService.toggleFavorite(id)
    setFavorites(favorites)
  }

  return (
    <View style={styles.container}>
      <StopSearch fireReset={fireReset} />
      <StopFilters fireReset={fireReset} setFireReset={setFireReset} />
      <StopPagination />
      {stops?.length === 0 && <Text>NO SE ENCONTRARON PARADAS.</Text>}
      <ScrollView>
        {stops?.map((item, index) => (
          <StopItem
            key={index}
            item={item}
            index={index}
            favorites={favorites}
            favTogg={handleFavoriteToggle}
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

export default Stops
