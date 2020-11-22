import React, { Component } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  View,
  SafeAreaView,
} from "react-native";
import { Theme, Color } from "../../styles";

import Button from "./../../components/Button";
import TextInput from "./../../components/TextInput";
import Utility from "./../../library/Utility";

import { connect } from "react-redux";
import { startLoginProcess } from "./../../redux/actions";
import * as EmailValidator from 'email-validator';

import { debounce } from 'lodash'
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../../assets/configs/config'

const keyboardVerticalOffset = Platform.OS === "ios" ? 45 : 60;

class Register_Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      valid_email: false,
      registerDisable: true
    };
  }

  componentDidMount() {
//    console.log(this.props.user);
    if (this.props.user.email && this.props.user.name) {
      this.setState({
        email: this.props.user.email,
        name: this.props.user.name
      });
    }
  }

  register = async () => {
    this.setState({registerDisable: true}, async () => {
      try {
        if (this.state.email && this.state.valid_email) {
          if (
            this.state.password &&
            this.state.password_confirmation &&
            this.state.password === this.state.password_confirmation &&
            this.state.password.length > 6
          ) {
              if (this.state.name.length > 2) {
              const res = await this._register(
                this.state.email,
                this.state.name,
                this.state.password
              )
              await AsyncStorage.setItem(config.storage.key_prefix + 'jwt', res.msg.token)
              await this.props.startLoginProcess()
              this.props.route.params.registerFinish()
            } else {
              alert("Name is too short")
              this.setState({registerDisable: false})
            }
          } else {
            alert("Passwords are mismatched");
            this.setState({registerDisable: false})
          }
        } else {
          alert("Invalid email");
          this.setState({registerDisable: false})
        }
      } catch(e) {
        this.setState({registerDisable: false})
        console.log(e)
      }
    })
  }

  //_register = async (email, name, password) => {
  _register = async (email, name, password) => {
    try {
      let res = await Utility.PostToServer("/v2/user", {
        email: email,
        pw: password,
        name: name
      });
      if (typeof res.err !== "undefined" && res.err === 0) {
        return res
      } else {
        console.log("Registration error : ", res.msg);
        let message = 'error'
        if (res.msg.indexOf('duplicate')) {
          message = email + " already exists"
        }
        Alert.alert(
          "Error:",
          message,
          [
            {
              text: "OK",
              onPress: () => {},
              style: "cancel"
            }
          ],
          {
            cancelable: true
          }
        )
        throw new Error(res.err);
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  handleEmailChange = email => {
    if (EmailValidator.validate(email)) {
      this.setState({
        email: email,
        valid_email: true
      }, () => this.checkValid())
    } else {
      this.setState({
        email: email,
        valid_email: false
      }, () => this.checkValid())
    }
  }

  handleChangeName = name => {
    this.setState({name: name}, () => this.checkValid())
  }

  handleChangePassword = password => {
    this.setState({password: password}, () => this.checkValid())
  }

  handleChangePasswordConfirm = password => {
    this.setState({password_confirmation: password}, () => this.checkValid())
  }

  checkValid = () => {
    if (this.state.valid_email && this.state.password === this.state.password_confirmation && this.state.password.length > 6 && this.state.name.length > 2) {
      this.setState({registerDisable: false})
    } else {
      this.setState({registerDisable: true})
    }
  }

  render() {
    let backgroundColor = Color.disabled
    if (!this.state.registerDisable) {
      backgroundColor = Color.primary
    }
    return (
      <SafeAreaView>
        <ImageBackground source={require('../../assets/images/trimco_background.jpg')} style={{width: '100%', height: '100%'}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior="padding" enabled style={{height: 627}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20, height:'80%',width:'90%', justifyContent: 'center',alignItems: 'center'}}>
                  <View style={{ backgroundColor: 'white', borderRadius: 20, height: '90%', width: '90%', justifyContent:'space-between', paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}>
                    <View style={{marginTop:10, flexDirection: 'row', alignItems:'center'}}>
                      <View>
                        <Text style={Platform.OS==='android'?Theme.title:Theme.smallTitle}>
                          Can you tell us more about you?
                        </Text>
                      </View>
                    </View>
                    <View>
                      <TextInput
                        placeholder="First and Last name"
                        returnKeyType="next"
                        onChangeText={name => this.handleChangeName(name)}
                        value={this.state.name}
                      />
                      {this.state.name.length < 3 &&
                        <Text style={{color: 'red'}}>Please enter a name</Text>
                      }
                    </View>
                    <View>
                      <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        returnKeyType="next"
                        KeyboardType="email-address"
                        onChangeText={email => this.handleEmailChange(email)}
                        value={this.state.email}
                      />
                      {this.state.valid_email &&
                        <Text style={{color: 'green'}}>Valid Email</Text>
                      }
                      {!this.state.valid_email &&
                        <Text style={{color: 'red'}}>Invalid Email</Text>
                      }
                    </View>
                    <View>
                      <TextInput
                        placeholder="Password"
                        secureText
                        returnKeyType="next"
                        onChangeText={password => this.handleChangePassword(password)}
                        value={this.state.password}
                      />
                    </View>
                    <View>
                      <TextInput
                        placeholder="Retype Password"
                        secureText
                        returnKeyType="done"
                        onChangeText={password_confirmation => this.handleChangePasswordConfirm(password_confirmation)
                        }
                        value={this.state.password_confirmation}
                      />
                      {this.state.password_confirmation !== this.state.password &&
                        <Text style={{color: 'red'}}>Passwords do not match</Text>
                      }
                      {this.state.password.length < 7 && 
                        <Text style={{color: 'red'}}>Password too short (7 characters minimum)</Text>
                      }
                    </View>
                    <View>
                      <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
                        <View>
                          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <View style={{backgroundColor: Color.primary, borderRadius:10, paddingLeft:10, paddingRight: 10, paddingTop:10, paddingBottom: 10}}>
                              <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>Cancel</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity disabled={this.state.registerDisable} onPress={debounce(this.register,1000, {leading:true, trailing: false})} title="Register">
                            <View style={{backgroundColor: backgroundColor, borderRadius:10, paddingLeft:10, paddingRight: 10, paddingTop:10, paddingBottom: 10}}>
                              <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>Register</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { user, logged_in } = state.userData;

  return {
    user,
    logged_in
  };
};

export default connect(
  mapStateToProps,
  { startLoginProcess }
)(Register_Info);