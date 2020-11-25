import React from 'react'
import {View, Text, Pressable} from 'react-native'

const Listing = props => {
  return(
    <View>
      <View>
        <Text>{props.type}</Text>
      </View>
      <View>
        <Text>{props.title}</Text>
      </View>
      <View>
        <Text>{props.city}</Text>
      </View>
      <View>
        <Text>{props.state}</Text>
      </View>
      <View>
        <Text>{props.country}</Text>
      </View>
      <View>
        <Pressable onPress={()=>{}}><Text></Text></Pressable>
      </View>
      
    </View>
  )
}

export default Listing