import React from 'react'
import {FlatList} from 'react-native'
import Listing from '../../components/Listing'
import ListingHeader from '../../components/ListingHeader'
import {useSelector} from 'react-redux'

const ListingHomeScreen = props => {
  const listings = useSelector(state => state.listings)

  const addNewListing = () => {
    console.log('nav')
    props.navigation.navigate('newlisting')
  }

  const renderItem = item => {
    return <Listing item={item} />
  }

  return(
    <FlatList
      ListHeaderComponent={<ListingHeader addNewListing={addNewListing} />}
      data={listings}
      keyExtractor={item=>item._id}
      renderItem={renderItem}
    />
  )
}

export default ListingHomeScreen