import React from "react"
import { StyleSheet, Dimensions } from "react-native"
import { BaseColor } from "../../../../config"
import { getWidthPercentage } from "../../../../util/helpers"

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  modalContainer: {
    width: getWidthPercentage(90),
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalSuccessText: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 5,
    color: BaseColor.accentColor,
    textAlign: "center"
  },
  modalSuccessMessage: {
    fontSize: 16,
    fontWeight: "400",
    color: BaseColor.textDark,
    marginBottom: 30,
    marginTop: 25,
    textAlign: "center"
  },
  modalFailureMessage: {
    fontSize: 16,
    fontWeight: "400",
    color: "red",
    marginBottom: 30,
    marginTop: 25,
    textAlign: "center"
  },
  createButton: {
    // marginTop: 32,
    width: "100%",
    justifyContent: "center",
    borderRadius: 12,
    height: 50,
    marginTop: 34
  },
})

export default styles
