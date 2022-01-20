import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { BaseStyle } from "../../config";

const { width, height } = Dimensions.get("window")
export default StyleSheet.create({
  root: {
    flexDirection:"row",
    justifyContent: "space-between",
    width: width,
    marginTop: 12,
    marginBottom: 12,
  },
  leftIcon: {
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
  },
  rightIcon: {
    marginRight: 16
  }
});
