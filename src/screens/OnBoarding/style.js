/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../config"
const { width, height } = Dimensions.get("window")
export const constStyleValues = {
  sliderWidth: width
}
const styles = StyleSheet.create({
  root: {
    width: width,
    alignItems: "center",
    paddingTop: 55,
    backgroundColor: BaseColor.backgroundColor,
    minHeight: height
  },
  cardMainContainer: {
    paddingTop: 20,
    paddingBottom: 0,
    width: width,
    alignItems: "center",
    // shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 1
    // minHeight: "80%",
  },
  cardContainer: {
    width: "86%",
    height: "85%",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "white",
    padding: 30
    // paddingBottom: -50,
    // marginBottom: -100
  },
  cardImage: {
    width: 170,
    height: 200,
  },
  cardTitle: {
    color: BaseColor.primaryColor,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25
  },
  descriptionsContainer: {
    marginTop: 20,
    width: "100%"
  },
  descriptionContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  description: {
    color: BaseColor.textGrey,
    maxWidth: "85%",
    fontSize: 16
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // marginHorizontal: 8,
    backgroundColor: BaseColor.primaryColor
  },
  paginationDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // marginHorizontal: 8,
    backgroundColor: BaseColor.inactive
  },
  skipContainer: {
    width: "86%"
  },
  skip: {
    color: BaseColor.primaryColor,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-end"
  },
  tick: {
    width: 21,
    height: 16,
    marginRight: 10,
    marginTop: 4
  },
  continueButton: {
    width: "88%",
    height: 50,
    position: "absolute",
    bottom: 0
  },
})
export default styles
