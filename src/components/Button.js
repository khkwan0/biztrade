import React from "react";
import { View, Text, Pressable} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme, Color } from "./../styles";
import TextNormalize from "./../library/TextNormalize";

//by default button will be filled button
//to use facebook button, add props "fbButton"
//to use blank button, add props "blankButton"
//if you want no-outline button, add props "noOutline"
//if you want custom title color, add props "titleColor"
const Button = props => {
  const {
    onPress,
    title,
    blankButton,
    fbButton,
    noOutline,
    titleColor,
    disabled,
  } = props;
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View
        style={[
          blankButton
            ? Theme.blankButton
            : fbButton
            ? Theme.fbButton
            : Theme.filledButton,
          noOutline ? { borderWidth: 0 } : {}
        ]}
      >
        {fbButton ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <MaterialCommunityIcons
              name="facebook"
              size={TextNormalize(25)}
              color={Color.white}
              style={{ marginRight: 5 }}
            />
            <Text
              style={[
                Theme.filledButtonText,
                titleColor ? { color: titleColor } : {}
              ]}
            >
              {title}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              blankButton ? Theme.blankButtonText : Theme.filledButtonText,
              titleColor ? { color: titleColor } : {}
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;