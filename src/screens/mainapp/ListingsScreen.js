import React from 'react'
import {View} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import {useSelector} from 'react-redux'
import Listing from '../../components/Listing.js'

const ListingsScreen = props => {

  const listings = useSelector(state => state.listings)

  return(
    <FlatList
      data={listings}
      renderItem={<Listing />}
      keyExtractor={item=>item._id}
    />
  )
}

export default ListingsScreen