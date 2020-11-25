import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import NewListingScreen from './NewListingScreen'
import ListingHomeScreen from './ListingHomeScreen'

const ListingStack = createStackNavigator()

const ListingsScreen = props => {
  return(
    <ListingStack.Navigator>
      <ListingStack.Screen name="listings" component={ListingHomeScreen} />
      <ListingStack.Screen name="newlisting" component={NewListingScreen} />
    </ListingStack.Navigator>
  )
}

export default ListingsScreen