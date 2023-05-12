const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c * 1000
  return distance // metros
}

const deg2rad = deg => {
  return deg * (Math.PI / 180)
}

const CloseStopsService = {
  getNearStopsList: async location => {
    try {
      const response = await fetch(
        'https://valencia.opendatasoft.com/api/records/1.0/search/?dataset=valenbisi-disponibilitat-valenbisi-dsiponibilidad&sort=-number&rows=30'
      )
      const data = await response.json()

      for (const record of data.records) {
        const stopLat = record.fields.geo_point_2d[0]
        const stopLng = record.fields.geo_point_2d[1]
        const userLat = location.coords.latitude
        const userLng = location.coords.longitude

        const distance = calculateDistance(userLat, userLng, stopLat, stopLng)
        record.distanceFromUser = distance
      }

      data.records.sort((a, b) => a.distanceFromUser - b.distanceFromUser)

      return data
    } catch (error) {
      console.error(error)
    }
  }
}

export default CloseStopsService
