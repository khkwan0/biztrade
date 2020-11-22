import React, {useState, useEffect} from "react"
import {View, SafeAreaView} from "react-native"
import {DrawerItem} from "@react-navigation/drawer"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FAIcon from "react-native-vector-icons/FontAwesome"
import HeaderLogo from "./HeaderLogo"
import {logout} from "../redux/actions/authActions"
import { Badge} from 'react-native-elements'
import {useSelector, useDispatch} from "react-redux"

const DrawerContent = props => {
  const messages = useSelector((_state) => _state.userData.user.messages)
  const [messageCount, setMessageCount] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    adjustMessageCount()
  }, [messages])

  const adjustMessageCount = () => {
    let counter = 0
    messages.forEach(message => {counter += message.is_read?0:1})
    setMessageCount(counter)

  }

  const doLogout = () => {
    const cb = props.doLogout!==undefined?props.doLogout:null
    dispatch(logout(cb))
  }

    return (
      <SafeAreaView style={{flexGrow: 1}}>
        <View style={{flexGrow: 1}}>
          <View style={{alignItems: "center", marginVertical: 5}}>
            <TrimCoHeaderLogo />
          </View>
          <View>
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Profile Name"
              onPress={() => props.navigation.navigate("Profile Name")}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="email-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Email"
              onPress={() => props.navigation.navigate("Email")}
            />
            {props.user_type === "client" && (
              <View>
                <DrawerItem
                  icon={({color, size}) => (
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={size}
                      color={color}
                    />
                  )}
                  label="Location"
                  onPress={() => props.navigation.navigate("Location")}
                />
                <DrawerItem
                  icon={({color, size}) => (
                    <MaterialCommunityIcons
                      name="credit-card-multiple"
                      size={size}
                      color={color}
                    />
                  )}
                  label="Credit Card"
                  onPress={() => props.navigation.navigate("Credit Card")}
                />
              </View>
            )}
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Password"
              onPress={() => props.navigation.navigate("Password")}
            />
                <DrawerItem
                  icon={({color, size}) => (
                    <MaterialCommunityIcons
                      name="bell-outline"
                      size={size}
                      color={color}
                    />
                  )}
                  label="Settings"
                  onPress={() =>
                    props.navigation.navigate("Notifications")
                  }
                />
            {props.user_type === "client" && (
                <DrawerItem
                  icon={({color, size}) => (
                    <MaterialCommunityIcons
                      name="wallet"
                      size={size}
                      color={color}
                    />
                  )}
                  label="My Credits"
                  onPress={() => props.navigation.navigate("My Credits")}
                />
            )}
            <DrawerItem
              icon={({color, size}) => (
                <View>
                  <FAIcon name="comment" size={size} color={color} />
                  {messageCount !== 0 &&
                  <Badge
                    status="success"
                    containerStyle={{ position: 'absolute', bottom: 0, left: 200 }}
                    value={messageCount}
                  />}
                </View>
              )}
              label="Messages"
              onPress={() => props.navigation.navigate("Message")}
            />
            <DrawerItem
              icon={({color, size}) => (
                <FAIcon name="question-circle" size={size} color={color} />
              )}
              label="About"
              onPress={() => props.navigation.navigate("About")}
            />
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="logout-variant"
                size={size}
                color={color}
              />
            )}
            label="Logout"
            onPress={() => doLogout()}
          />
        </View>
      </SafeAreaView>
    )
}

export default DrawerContent