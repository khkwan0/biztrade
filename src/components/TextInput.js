import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, TextInput, Pressable} from "react-native";
import { Theme } from "./../styles";

//use props as same as original textInput that provide by react-native except "secureTextEntry"
//"secureTextEntry" change to "secureText"
//if you want custom icon, just add props "icon" and filled the name of MaterialCommunityIcon
export default class PasswordInputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconContainerWidth: 0,
      eyeIcon: "eye-off",
      secureText: this.props.secureText
    };
  }

  changePasswordType = () => {
    let { secureText } = this.state;
    this.setState({
      eyeIcon: secureText ? "eye" : "eye-off",
      secureText: !secureText
    });
  };

  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          secureTextEntry={this.state.secureText}
          style={[
            Theme.textInput,
            this.props.secureText || this.props.icon
              ? { paddingRight: this.state.iconContainerWidth }
              : { paddingRight: Theme.textInput.paddingHorizontal }
          ]}
        />
        {(this.props.secureText || this.props.icon) && (
          <View
            style={styles.iconContainer}
            onLayout={event => {
              this.setState({
                iconContainerWidth:
                  event.nativeEvent.layout.width +
                  Theme.textInput.paddingHorizontal
              });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {!this.props.icon ? (
                <Pressable onPress={this.changePasswordType}>
                <Icon
                  name={this.state.eyeIcon}
                  size={25}
                />
                </Pressable>
              ) : (
                <Icon name={this.props.icon} size={25} />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 5,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0
  }
});