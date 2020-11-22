import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme, Color } from "./../../styles";

import TextInput from "./../../components/TextInput";
import Button from "./../../components/Button";
import Utility from "./../../library/Utility";

const keyboardVerticalOffset = Platform.OS === "ios" ? 45 : 60;

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  async submitEmail() {
    try {
      let res = await Utility.PostToServer("/password/recover", { email: this.state.email })
      if (res.err === 0) {
        alert("Request was sent. Please confirm your email.");
      } else if(res.err === 403 && res.msg =="Email not found"){
        alert("Email not found.");
        throw new Error(res.err);
      }else{
        throw new Error(res.err);
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <SafeAreaView style={Theme.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={Theme.containerWithPadding}>
            <KeyboardAvoidingView
              behavior={"position"}
              enabled
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <View style={Theme.containerWithVerticalPadding}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <Text style={Theme.smallTitle}>Forgot your password?:</Text>
                  </View>
                  <View>
                    <MaterialCommunityIcons
                      name={"square-edit-outline"}
                      color={Color.primary}
                      size={30}
                    />
                  </View>
                </View>

                <View style={{ marginTop: 25 }} />
                <View style={Theme.containerWithVerticalMargin}>
                  <Text style={Theme.description}>
                    Enter your email address below and we will send you an email
                    with a link to pick a new password.
                  </Text>
                </View>

                <View style={Theme.containerWithVerticalMargin}>
                  <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                  />
                </View>
                <View style={Theme.rightButtonContainer}>
                  <Button onPress={() => this.submitEmail()} title="Submit" />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default ForgotPasswordScreen;