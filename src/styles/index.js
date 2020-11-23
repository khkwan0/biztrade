import { StyleSheet, Dimensions, Platform } from "react-native";
import normalize from "../library/TextNormalize";

export const Color = {
  primary: "#74d14c",
  link: "hsl(204, 86%, 53%)",
  success: "hsl(141, 71%, 48%)",
  danger: "hsl(348, 100%, 61%)",
  warning: "hsl(48, 100%, 67%)",
  white: "hsl(0, 0%, 100%)",
  light: "hsl(0, 0%, 96%)",
  black: "hsl(0, 0%, 4%)",
  dark: "hsl(0, 0%, 29%)",
  darkGrey: "hsl(0, 0%, 35%)",
  grey: "hsl(0, 0%, 48%)",
  greyLight: "hsl(0, 0%, 71%)",
  greyLighter: "hsl(0, 0%, 86%)",
  facebook: "#3b5998",
  blue: '#3b5998',
  black: "rgba(29,29,29,1)",
  disabled: "rgba(214,92,38,0.2)"
};

export const Theme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  rowContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  centerContainer: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: "center"
  },
  cardContainer: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2
  },
  containerWithMargin: {
    marginVertical: 5,
    marginHorizontal: Platform.OS === "ios" ? 9 : 16
  },
  containerWithHorizontalMargin: {
    marginHorizontal: Platform.OS === "ios" ? 9 : 16
  },
  containerWithVerticalMargin: {
    marginVertical: 5
  },
  containerWithPadding: {
    paddingVertical: 5,
    paddingHorizontal: Platform.OS === "ios" ? 9 : 16
  },
  containerWithHorizontalPadding: {
    paddingHorizontal: Platform.OS === "ios" ? 9 : 16
  },
  containerWithVerticalPadding: {
    paddingVertical: 5
  },
  headerContainer: {
    marginVertical: 10
  },
  absoluteCover: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "transparent"
  },
  seperateLine: {
    borderColor: Color.greyLight,
    borderWidth: 0.5
  },
  bigTitle: {
    fontSize: normalize(24),
    fontWeight: "600",
    color: Color.primary
  },
  title: {
    fontSize: normalize(16),
    fontWeight: "600",
    color: Color.darkGrey
  },
  smallTitle: {
    fontSize: normalize(14),
    fontWeight: "600",
    color: Color.greyLight
  },
  subtitle: {
    fontSize: normalize(14),
    fontWeight: "500",
    color: Color.grey
  },
  description: {
    fontSize: normalize(13),
    lineHeight: 24,
    color: Color.darkGrey
  },
  fbButton: {
    backgroundColor: Color.facebook,
    borderWidth: 2,
    borderColor: Color.facebook,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 8
  },
  filledButton: {
    backgroundColor: Color.primary,
    borderWidth: 2,
    borderColor: Color.primary,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 8
  },
  blankButton: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Color.primary,
    paddingHorizontal: 25,
    paddingVertical: 8
  },
  filledButtonText: {
    fontSize: normalize(14),
    fontWeight: "400",
    color: Color.white,
    textAlign: "center"
  },
  blankButtonText: {
    fontSize: normalize(14),
    fontWeight: "400",
    color: Color.grey,
    textAlign: "center"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(214,92,38,0.7)"
  },
  rightButtonContainer: {
    marginTop: 30,
    alignItems: "flex-end"
  },
  textInput: {
    height: 40,
    width: null,
    borderWidth: 2,
    borderColor: Color.primary,
    paddingHorizontal: 20,
    fontSize: normalize(14)
  }
});