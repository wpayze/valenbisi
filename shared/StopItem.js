import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const StopItem = ({
  index,
  item,
  favorites,
  showHeart = true,
  favTogg,
  toggleModal,
}) => {
  return (
    <View key={index} style={styles.stop}>
      <TouchableOpacity
        style={styles.stopText}
        onPress={() => toggleModal(item)}
      >
        <Text style={styles.stopTitle}>{item.fields.address}</Text>
        <Text style={styles.availableText}>
          Bicis disponibles: {item.fields.available}
        </Text>
        <Text style={styles.availableText}>Huecos: {item.fields.free}</Text>
      </TouchableOpacity>
      {showHeart && (
        <TouchableOpacity
          style={styles.heart}
          onPress={() => favTogg(item.fields.gid)}
        >
          <Icon
            name={favorites?.includes(item.fields.gid) ? "heart" : "heart-o"}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stop: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stopText: {
    width: "80%"
  },
  stopTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  availableText: {
    fontSize: 16,
    color: "#777",
  },
  icon: {
    fontSize: 24,
    color: "red",
  },
  heart: {
    paddingRight: 20,
  },
});

export default StopItem;
