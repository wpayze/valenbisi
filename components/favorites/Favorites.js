import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import FavoriteService from "../../services/FavoriteService";
import StopItem from "../../shared/StopItem";
import CustomModal from "../../shared/CustomModal";
import ShowStopContent from "../../shared/ShowStopContent";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const focus = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  const handleOpenModal = (item) => {
    setModalVisible(true);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await FavoriteService.fetchFavorites();
      setFavorites(favorites?.records);
    };

    if (focus) 
      fetchFavorites();
  }, [focus]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {favorites?.map((item, index) => (
          <StopItem
            key={index}
            item={item}
            index={index}
            showHeart={false}
            toggleModal={handleOpenModal}
          />
        ))}
      </ScrollView>

      <CustomModal visible={modalVisible} onClose={handleCloseModal}>
        <ShowStopContent item={selectedItem} />
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Favorites;
