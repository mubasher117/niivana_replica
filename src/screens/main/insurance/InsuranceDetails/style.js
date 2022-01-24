import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
import { getWidthPercentage } from "../../../../util/helpers"

const { width, height } = Dimensions.get("window")
export const Color = {
  malibu: "#46E1FD",
  white: "#fff",
  whiteOff: "#F4F5F9",
  steel: "#8B8B8B",
  black: "#000",
  facebook: "#3b5998",
  google: "#4285F4",
  red: "red"
}
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: "5%",
    width: width,
    paddingTop: 40,
    height: height,
    backgroundColor: BaseColor.whiteColor
  },
  rootContentContainer: {
    alignItems: "center",
    minHeight: "100%",
    paddingBottom: "20%"
  },
  cardMainContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: "#DEE7F4"
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  activeView: {
    height: 24,
    width: 60,
    borderRadius: 4,
    backgroundColor: "#5ECB9E",
    marginTop: getWidthPercentage(7),
    marginBottom: getWidthPercentage(5),
    alignItems: "center",
    justifyContent: "center"
  },
  cardDetailMain: {
    flexDirection: "row",
    paddingHorizontal: 5,
    marginBottom: 12
  },
  cardDetailHeading: {
    width: "50%",
    fontSize: 14,
    fontWeight: "bold",
    color: "#8F8D86"
  },
  cardDetailValue: {
    width: "50%",
    fontSize: 14,
    marginRight: getWidthPercentage(9)
  },
  dropdownContainer: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#FAFAFA",
    borderRadius: 16,

    borderColor: "#E4E4E4",
    borderWidth: 0.3,
    borderTopWidth: 0.8,
    width: "100%",
    // alignItems: "flex-start",
    justifyContent: "center"
    // width: "90%",
    // borderColor: "#E4E4E4",
    // borderWidth: 1,
    // // borderBottomWidth: 0.3,
    // height: 60,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    // // padding: 20,
    // // paddingLeft: 25,
    // backgroundColor: "#FAFAFA"
  },
  dropdown: {
    borderRadius: 16,
    width: "80%",
    // alignSelf: "flex-start",
    // padding: 10,
    // backgroundColor: "#FAFAFA",
    // marginLeft: -10,
    marginTop: 7
  },
  dropdownText: {
    color: BaseColor.textDark,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 25,
    width: "80%"
    // backgroundColor: BaseColor.backgroundColor
  },
  dropdownButton: {
    fontSize: 16
  },
  // dropDownText: {
  //   textAlign: "left",
  //   color: "#8F8D86",
  //   opacity: 0.5,
  //   paddingLeft: 0,
  //   width: "100%",
  //   height: "100%"
  // },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 20,
    borderColor: "#E4E4E4",
    borderWidth: 0.3,
    borderTopWidth: 0.8,
    width: "100%"
  },
  inputText: {
    paddingLeft: 10,
    backgroundColor: "#FAFAFA",
    fontSize: 17,
    width: "90%"
  },
  subTitle: {
    fontSize: 16,
    marginTop: 24
  },
  iconicButtonConatiner: {
    width: "88%",
    marginTop: 50
  },
  continueButton: {
    width: "88%",
    height: 50,
    position: "absolute",
    bottom: 110
  },
  // Iconic Button
  iconicButton: {
    height: 76,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "8%",
    paddingRight: "8%",
    borderRadius: 12,
    flexDirection: "row",
    marginTop: 16
  },
  iconicButtonActive: {
    backgroundColor: BaseColor.iconicButtonActiveBackground,
    width: "100%"
  },
  iconicButtonInactive: {
    backgroundColor: "white"
  },
  iconicButtonActiveText: {
    fontSize: 18,
    color: "white"
  },
  iconicButtonInactiveText: {
    fontSize: 18,
    color: BaseColor.iconicButtonActiveBackground
  },
  checkBoxSelected: {
    backgroundColor: "white",
    color: BaseColor.iconicButtonActiveBackground
  },
  createButton: {
    // marginTop: 32,
    width: width * 0.87,
    justifyContent: "center",
    borderRadius: 12,
    height: 50
  },
  bottomContainer: {
    marginTop: 20
  },
  bottomText: {
    width: 250,
    color: BaseColor.textGrey,
    fontSize: 18,
    textAlign: "center",
    marginTop: 40
  }
})

export default styles
