/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  root: {
    width: width,
    height: height,
    paddingTop: 40
  },
  rootContentContainer: {
    width: "86%",
    alignItems: "center",
    alignSelf: "center",
    height: height,
  },
  premiumPlan: {
    fontSize: 24,
    color: BaseColor.textDark,
    fontWeight: "700"
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    color: BaseColor.primaryColor,
    marginTop: 8,
    marginBottom: 13
  },
  paymentToggleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  paymentTextActive: {
    color: BaseColor.textDark,
    fontSize: 16,
    fontWeight: "700"
  },
  paymentTextInactive: {
    color: BaseColor.textDarkInactive,
    fontSize: 16,
    fontWeight: "700",
    opacity: 0.5
  },
  createButton: {
    marginTop: 32,
    width: "100%",
    justifyContent: "center",
    borderRadius: 12,
    height: 50,
    position: "absolute",
    bottom: 170
  },
  horizontalBreak: {
    height: 1,
    width: "100%",
    backgroundColor: BaseColor.horizontalBreak,
    marginTop: 32,
    marginBottom: 32,
  },
  // Plan Check
  planCheckContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  planCheckText: {
    flex: 2,
    color: BaseColor.textDark,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 17
  }
})

export default styles
