import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  root: {
    width: width,
    paddingTop: 40,
    height: height,
    backgroundColor: BaseColor.backgroundInterest
  },
  rootContentContainer: {
    alignItems: "center",
    height: height,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30
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
    marginTop: 16,
  },
  iconicButtonActive: {
    backgroundColor: BaseColor.iconicButtonActiveBackground,
    width: "100%"
  },
  iconicButtonInactive: {
    backgroundColor:"white"
  },
  iconicButtonActiveText: {
    fontSize: 18,
    color: "white",
  },
  iconicButtonInactiveText: {
    fontSize: 18,
    color: BaseColor.iconicButtonActiveBackground
  },
  checkBoxSelected: {
    backgroundColor: "white",
    color: BaseColor.iconicButtonActiveBackground
  }
})

export default styles
