import React from "react"
import {View, Image, Platform, StyleSheet} from "react-native"

export default HeaderLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../src/assets/images/HeaderLogo.png")}
        style={{
          flex: 1,
          alignSelf: "center",
          width: "120%",
          height: "120%",
          margin: 0
        }}
        resizeMode={"contain"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        width: '100%',
        height: 36,
      },
      android: {
        width: "100%",
        height: 40,
      },
    }),
    alignItems: 'center',
  },
})