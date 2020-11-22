import React from "react"
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import {Theme} from './../../styles'

import Button from "./../../components/Button"

import Icon from 'react-native-vector-icons/FontAwesome'

import {setLoggedIn, startLoginProcess} from '../../redux/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
//import {LoginManager} from 'react-native-fbsdk'
//import { TouchableOpacity } from "react-native-gesture-handler";
const window = Dimensions.get('window')
import {debounce} from 'lodash'
import TextInput from '../../components/TextInput'
import config from "../../assets/configs/config"

const AuthenticationScreen = props => {

  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleRegister = () => {
    if (!loading) {
      props.navigation.navigate('Register')
    }
  }

  const handleForgotPassword = () => {
    if (!loading) {
      props.navigation.navigate('Forgot Password')
    }
  }

  const signIn = async () => {
    if (email && password) {
      try {
        setLoading(true) 
        const user = await _signIn()
        dispatch(setLoggedIn(user))
      } catch (err) {
        setLoading(false)
      }
    }
  }

  const _signIn = async () => {
    try {
      const res = await Utility.PostToServer("/login", {email: email, pwd: password})
      if (res.err !== undefined && res.err === 0 && res.user !== undefined && res.user) {
        return res.user
      } else {
        throw new Error(res.err)
      }
    } catch (e) {
      alert("Email or Password was wrong!\nPlease try Again!")
      throw new Error(e)
    }
  }

  return (
    <ScrollView>
      <ImageBackground source={require('../../assets/images/trimco_auth_background.jpg')} style={{width: '100%', height: '100%'}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{height:627}}>
        <View style={{flex: 1, justifyContent: 'center',alignItems:'center'}}>
        <View style={{backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20, width:'90%', height:'67%', flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
          <View style={{backgroundColor: 'white', paddingTop:24,paddingLeft: 13, paddingRight:13,borderRadius: 20, width:'90%', height:'90%'}}>
            <View style={{flex:1, alignItems:'center'}}><Image source={require('../../assets/images/TRIMco_Lockup_Orange.png')} style={{height: '175%', width: '175%'}} resizeMode={'contain'} /></View>
            <View style={{flex:1, flexDirection: 'row',justifyContent:'center',alignItems:'center', marginTop:60 }}>
              <Icon name="envelope-o" size={22} />
              <View style={{borderWidth:1, borderColor: 'gray', borderRadius: 5, width: '80%', height:40,marginLeft: '2%', flex:1, justifyContent: 'center'}}>
                <TextInput 
                  KeyboardType="email-address"
                  placeholder="Email" 
                  onChangeText={(email) => setEmail(email)}
                  value={email} />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:5}}>
              <Icon name="lock" size={32} />
              <View style={{borderWidth: 1, borderRadius: 5, borderColor:'gray', width: '80%',height: 40, marginLeft:'2%', flex: 1, justifyContent: 'center'}}>
                <TextInput
                  placeholder="Password"
                  secureText
                  onChangeText={(password) => setPassword(password)}
                  value={password} />
              </View>
            </View>
            <View style={{flex:1, justifyContent: 'flex-end', flexDirection: 'row'}}>
              <TouchableOpacity onPress={debounce(handleForgotPassword, 500, {leading: true, trailing: false})}>
                <Text style={{fontSize: 16,fontWeight:'bold', color:'#E65525'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              {loading &&
                <ActivityIndicator color="#E65525" />
              }
              {!loading &&
                <View><Button title="Login" onPress={signIn} style={{backgroundColor:'#E65525', color:'white'}} /></View>
              }
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>Don't have an account?</Text>
                <TouchableOpacity onPress={debounce(handleRegister, 500, {leading: true, trailing: false})}>
                  <Text style={{fontSize: 16,fontWeight:'bold', color:'#E65525'}}> Sign up here</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>
          <View style={{alignItems: 'flex-end'}}>
              <Text>v{config.app.version()}</Text>
          </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </ScrollView>
  )
}

export default AuthenticationScreen