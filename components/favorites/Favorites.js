import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import FavoriteService from '../../services/FavoriteService'
import StopItem from '../../shared/StopItem'
import CustomModal from '../../shared/CustomModal'
import ShowStopContent from '../../shared/ShowStopContent'

import loadingAnimation from '../../assets/spinner.json'
import AnimatedLottieView from 'lottie-react-native'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const focus = useIsFocused()

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = (item) => {
    setModalVisible(true)
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true)
      const favorites = await FavoriteService.fetchFavorites()
      setFavorites(favorites?.records)

      const delay = new Promise((resolve) => setTimeout(resolve, 500))

      await delay

      setIsLoading(false)
    }

    if (focus) fetchFavorites()
  }, [focus])

  const deleteFav = async (id) => {
    await FavoriteService.toggleFavorite(id)
    const favorites = await FavoriteService.fetchFavorites()
    setFavorites(favorites?.records)
  }

  return (
    <View style={styles.container}>
      {isLoading
        ? (
          <AnimatedLottieView source={loadingAnimation} autoPlay loop />
          )
        : (
          <ScrollView>
            {favorites?.map((item, index) => (
              <StopItem
                key={index}
                item={item}
                index={index}
                showHeart={false}
                deleteFav={deleteFav}
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

export default Favorites
