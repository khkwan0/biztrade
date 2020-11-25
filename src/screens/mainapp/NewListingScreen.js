import React from 'react'
import {View, Text, TextInput, Pressable, PermissionsAndroid, FlatList} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";

const NewListingScreen = props => {
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [showPhotos, setShowPhotos] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(()=> {
    if (isMounted) {
      getPhotos()
    }
  }, [showPhotos])

  React.useEffect(()=> {
    if (isMounted) {
      hasAndroidPermission()
    }
  }, [isMounted])

  React.useEffect(() => {
    setIsMounted(true)
  },[])

  const getPhotos = async () => {
    try {
      const photos = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'All'
      })
      console.log(photos)
    } catch(e) {
      console.log(e)
    }
  }
  
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission)
    if (hasPermission) {
      return true
    }
    const status = await PermissionsAndroid.request(permission)
    return status === 'granted'
  }

  return(
    <View>
      <View>
        <TextInput onChangeText={val => setTitle(val)} value={title} />
      </View>
      <View>
        <TextInput onChangeText={val => setDesc(val)} value={desc} />
      </View>
      <View>
        <Pressable onPress={()=>setShowPhotos(true)}><Text>Add Images</Text></Pressable>
      </View>
      <View>
        <FlatList
        />
      </View>
    </View>
  )
}

export default NewListingScreen