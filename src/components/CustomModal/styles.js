/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../config"
import { getWidthPercentage } from "../../util/helpers"
const { width, height } = Dimensions.get("window")
export default StyleSheet.create({
  root: {
    width: width,
    minHeight: height,
    flex: 1
  },
  container: {
    width: getWidthPercentage(90),
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 60
  },
  multipleFieldsContainer: {
    flexDirection: "row"
  },
  input: {
    height: 60,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 10,
    padding: 20,
    borderColor: "#E4E4E4",
    borderWidth: 0.5,
    borderTopWidth: 1,
    width: "100%",
    shadowColor: "rgba(16, 32, 89, 0.12)",
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  inputText: {
    paddingLeft: 10,
    backgroundColor: "#FAFAFA",
    fontSize: 17,
    width: "90%"
  },
  title: {
    //fontFamily: "Segoe UI",
    color: BaseColor.primaryColor,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24
  },
  backButtonContainer: {
    borderColor: "aquamarine",
    borderWidth: 2,
    borderRadius: 10,
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60
  },
  signUpText: {
    //fontFamily: "Segoe UI",
    color: "white",
    fontSize: 17,
    marginBottom: 8,
    paddingLeft: 5
  },
  buttonsContainer: {
    display: "flex",
    width: "100%"
  },
  socialButton: {
    marginBottom: 8,
    backgroundColor: BaseColor.buttonSecondaryColor,
    justifyContent: "center",
    borderRadius: 10,
    // padding: 10,
    width: "100%",
    height: 50
  },
  createButton: {
    // marginTop: 32,
    width: "100%",
    justifyContent: "center",
    borderRadius: 12,
    height: 50,
    marginTop: 34
  },
  label: {
    //fontFamily: "Segoe UI",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 7,
    paddingLeft: 5,
    textAlign: "left"
    // color: BaseColor.fieldColor
  },
  loginText: {
    paddingTop: 20,
    paddingBottom: 30,
    textAlign: "center",
    //fontFamily: "Segoe UI",
    // color: "white",
    fontSize: 17
  },
  loginLink: {
    //fontFamily: "Segoe UI",
    fontSize: 17,
    paddingTop: 20,
    paddingBottom: 30,
    textAlign: "center",
    color: BaseColor.primaryColor,
    paddingLeft: 6
  },
  dropdownText: {
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    marginLeft: 20,
    borderWidth: 0,
    width: "100%",
    color: "#8F8D86"
  },
  dropdownContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    alignSelf: "flex-start",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    height: 60,
    borderRadius: 16,
    // padding: 20,
    // paddingLeft: 25,
    backgroundColor: "#FAFAFA"
  },
  dropdown: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "85.5%",
    alignSelf: "flex-start",
    // padding: 10,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    // marginLeft: -10,
    marginTop: 7,
    borderColor: "#E4E4E4",
    height: 200
  },
  dropdownButton: {
    fontSize: 16
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20
  },

  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width
    // marginTop: 22
  },
  modalView: {
    width: getWidthPercentage(90),
    margin: 20,
    backgroundColor: "white",
    borderRadius: 16,
    // paddingLeft: 25,
    // paddingRight: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalPlanChecksContainer: {
    backgroundColor: BaseColor.backgroundLightColor,
    padding: 25,
    marginTop: 24
  },
  modalText: {
    fontSize: 26,
    fontWeight: "600",
    color: BaseColor.primaryColor,
    marginTop: 25,
    textAlign: "center"
  },
  modalSubText: {
    fontSize: 18,
    fontWeight: "500",
    color: BaseColor.textGrey,
    marginTop: 10,
    textAlign: "center"
  },
  modalButtonsContainer: {
    flexDirection: "row",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  modalButton: {
    width: "50%",
    height: 66,
    backgroundColor: BaseColor.goldLight,
    color: BaseColor.primaryColor
  },
  modalButtonText: {
    color: BaseColor.primaryColor
  }
})
