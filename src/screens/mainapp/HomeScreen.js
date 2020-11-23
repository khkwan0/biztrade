import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import DashboardScreen from './DashboardScreen'
import ForSaleScreen from './ForSaleScreen'
import ListingsScreen from './ListingsScreen'

const Tab = createBottomTabNavigator()

const HomeScreen = props => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="For Sale" component={ForSaleScreen} />
      <Tab.Screen name="Your listings" component={ListingsScreen} />
    </Tab.Navigator>

  )
}

export default HomeScreen