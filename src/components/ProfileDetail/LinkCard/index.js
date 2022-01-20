import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ArrowCard from "../../../assets/icons/ArrowCard.svg";
import { BaseColor } from "../../../config";
import styles from "./styles";

const LinkCard = (props) => {
  const { titleStyle, onPressRight, renderRight, title, renderRightStyle } =
    props;
  return (
    <TouchableOpacity onPress={onPressRight}>
      <View style={styles.container}>
        <Text style={(styles.title, titleStyle)}>{title}</Text>
        <View style={renderRightStyle}>{renderRight}</View>
      </View>
    </TouchableOpacity>
  );
};
export default LinkCard;
