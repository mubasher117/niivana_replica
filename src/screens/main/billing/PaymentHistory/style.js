/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
import { getWidthPercentage } from "../../../../util/helpers"
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  root: {
    width: width,
    paddingTop: 40,
    minHeight: height,
    backgroundColor: "white"
  },
  rootContentContainer: {
    width: "86%",
    alignItems: "center",
    alignSelf: "center",
    height: "100%"
  },
  headerContainer: {
    width: width,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-start",
    backgroundColor: BaseColor.accentColor,

    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.4,
    shadowColor: "#1A264B33"
  },
  headerLabel: {
    color: BaseColor.whiteColor,
    fontSize: 16,
    fontWeight: "700",
    width: "45%",
    marginLeft: "5%"
  },
  paymentHistoryCardContainer: {
    marginTop: 20
  },
  optionsMenuContainer: {
    position: "absolute",
    right: 0,
    top: 40
  },

  // paymentHistoryCard
  cardContainer: {
    width: getWidthPercentage(92),
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",

    shadowOffset: { height: 12, width: -2 },
    shadowOpacity: 0.2,
    shadowColor: "grey"
  },
  cardLabel: {
    color: BaseColor.textGrey,
    fontSize: 16,
    fontWeight: "500"
  },
  cardTitle: {
    color: BaseColor.textDark,
    fontSize: 16,
    fontWeight: "600"
  },
  cardPrice: {
    color: BaseColor.primaryColor,
    fontSize: 16,
    fontWeight: "700"
  },

  // options menu
  menuFullScreen: {
    width: width,
    height: height,
    backgroundColor: "red",
    position: "absolute",
    left: 0,
    top:0,
    overflow: "hidden"
  },
  menuContainer: {
    backgroundColor: "white",
    width: 225,
    height: 80,
    borderRadius: 4,
    shadowOffset: { height: 5, width: -2 },
    shadowOpacity: 0.2,
    shadowColor: "grey",
    justifyContent: "center"
  },
  menuRow: {
    flexDirection: "row",
    shadowOffset: { height: 12, width: -2 },
    shadowOpacity: 0.2,
    shadowColor: "grey"
  },
  menuRowIconContainer: { width: "25%", alignItems: "center" },
  menuRowLabel: {
    color: BaseColor.textDark,
    fontSize: 18,
    fontWeight: "500"
  }
})

export default styles
