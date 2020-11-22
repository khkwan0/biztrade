import { Dimensions, Platform, PixelRatio } from "react-native";

var { height, width } = Dimensions.get("window");

// calculate scale
var scale;
if (height > width) {
  scale = width / 320;
} else {
  scale = height / 320;
}

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default normalize;