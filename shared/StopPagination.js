import React, { useState, useContext } from 'react'
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { AppContext } from '../context/AppContext'

const StopPagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { state, setState } = useContext(AppContext)
  const { itemsPerPage } = state

  const totalPages = Math.ceil(state.records / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    const start = itemsPerPage * (page - 1)
    setState((prevState) => ({ ...prevState, start }))
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <TouchableOpacity
            key={page}
            onPress={() => handlePageChange(page)}
            style={[
              styles.pageButton,
              page === currentPage && styles.activePageButton
            ]}
          >
            <Text
              style={
                page === currentPage
                  ? styles.activePageButtonText
                  : styles.pageButtonText
              }
            >
              {page}
            </Text>
          </TouchableOpacity>
        )
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: 50
  },
  pageButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff'
  },
  activePageButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  pageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  activePageButtonText: {
    color: '#fff'
  }
})

export default StopPagination
