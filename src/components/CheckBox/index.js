import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

import { TouchableOpacity } from "react-native";
import { Text } from "..";

const CheckBox = ({
  selected,
  onPress,
  style,
  textStyle,
  size = 20,
  text = "",
  selectedColor,
  unSelectedColor,
  ...props
}) => (
  <TouchableOpacity
    style={[styles.checkBox, style]}
    {...props}
    onPress={onPress}
  >
    <Icon
      size={size}
      color={selected ? selectedColor : unSelectedColor}
      name={selected ? "check-box" : "check-box-outline-blank"}
    />
    {text !== "" && <Text style={textStyle}>{text}</Text>}
  </TouchableOpacity>
);

export default CheckBox;
