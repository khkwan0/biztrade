import React from 'react'
import {Pressable, Text} from 'react-native'

const ListingHeader = props => {
  return(
    <Pressable onPress={props.addNewListing}><Text>Add Listing</Text></Pressable>
  )
}

export default ListingHeader