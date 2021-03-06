import 'react-native-gesture-handler'
import React from 'react'
import * as SCREEN from '../index'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import {startLoginProcess} from '../../redux/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import HeaderLogo from '../../components/HeaderLogo'
import RNBootSplash from 'react-native-bootsplash'
import DrawerContent from '../../components/DrawerContent'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const linking = {
  prefixes: ['biztrade://'],
}

const MainScreen = (props) => {

  const user = useSelector(_state=>_state.userData.user)
  const dispatch = useDispatch()

  const [isMounted, setIsMounted] = React.useState(false)
  const [showScreen, setShowScreen] = React.useState({home: true, auth: false, register: false})

  React.useEffect(()=> {
    if (isMounted) {
//      RNBootSplash.hide()
      if (user !== undefined && user._id !== undefined && user._id) {
        setShowScreen({home: true, auth: false, register: false})
      } else {
        //setShowScreen({home: false, auth: true, register: false})
        setShowScreen({home: true, auth: false, register: false}) // testing hack
      }
    }
  }, [user])

  React.useEffect(() => {
    if (isMounted) {
      StartLoginProcess()
    }
  }, [isMounted])

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const StartLoginProcess =  () => {
    try {
      dispatch(startLoginProcess())
    } catch(e) {
      console.log(e)
    }
  }

  console.log(showScreen)
  return(
    <NavigationContainer linking={linking}>
      {showScreen.home &&
        <Drawer.Navigator
          initalRouteName="Home"
          backBehavior="initialRoute"
          drawerContent={(props) => <DrawerContent {...props} user_type={user.is_vendor?"vendor":"client"} />}
        >
          <Drawer.Screen name="Home" component={SCREEN.HomeScreen} />
        </Drawer.Navigator>
      }
      {showScreen.auth &&
        <Stack.Navigator initialRouteName="Authenticate" options={{headerTitle: props => <HeaderLogo />}}>
          <Stack.Screen name="Authenticate" component={SCREEN.AuthenticationScreen} options={{headerTitle: props=> <HeaderLogo />}} />
          <Stack.Screen name="Forgot Password" component={SCREEN.ForgotPasswordScreen} />
          <Stack.Screen name="Register" component={SCREEN.RegisterScreen} initialParams={{}} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  )
}

export default MainScreen