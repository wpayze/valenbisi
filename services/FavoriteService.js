import AsyncStorage from '@react-native-async-storage/async-storage'

const FavoriteService = {
  getLocalFavorites: async () => {
    const stops = await AsyncStorage.getItem('favoriteStops')
    return JSON.parse(stops)
  },
  fetchFavorites: async () => {
    try {
      const favorites = await FavoriteService.getLocalFavorites()

      if (!favorites || favorites.length === 0) return []

      const conditions = favorites.map((id) => `gid=${id}`)
      const query = conditions.join(' OR ')

      const response = await fetch(
        `https://valencia.opendatasoft.com/api/records/1.0/search/?dataset=valenbisi-disponibilitat-valenbisi-dsiponibilidad&sort=-number&q=${query}`
      )
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  },
  toggleFavorite: async (id) => {
    let favorites = await FavoriteService.getLocalFavorites()

    if (favorites && favorites.includes(id)) {
      favorites = favorites.filter((favorite) => favorite !== id)
    } else {
      favorites = favorites ? [...favorites, id] : [id]
    }

    await AsyncStorage.setItem('favoriteStops', JSON.stringify(favorites))
    return favorites
  }
}

export default FavoriteService
