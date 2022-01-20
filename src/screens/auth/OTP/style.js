/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../config"
const { width, height } = Dimensions.get("window")
export default StyleSheet.create({
  root: {
    width: width,
    minHeight: height,
    backgroundColor: "white"
  },
  container: {
    width: "87%",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 54,
    backgroundColor: "white",
    height: "100%"
  },
  multipleFieldsContainer: {
    flexDirection: "row",
  },
  input: {
    height: 60,
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    marginBottom: 10,
    padding: 20,
    borderColor: "#E4E4E4",
    borderWidth: 0.3,
    borderTopWidth: 0.8,
    width: "100%",
  },
  inputText: {
    paddingLeft: 10,
    backgroundColor: "#FAFAFA",
    fontSize: 36,
    fontWeight: "700",
    width: "90%",
    letterSpacing: 10,
  },
  title: {
    //fontFamily: "Segoe UI",
    color: BaseColor.primaryColor,
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 54,
    marginBottom: 40,
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
    width: width * .87,
    justifyContent: "center",
    borderRadius: 12,
    height: 50
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
  bottomContainer: {
    position: "absolute",
    bottom: 100
  },
  bottomText: {
    // width: "100%",
    color: BaseColor.textGrey,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    // marginTop: ,
  },
  resendCodeButton: {
    marginTop: 50,
  },
  resendCodeText: {
    color: BaseColor.primaryColor,
    fontSize: 16,
    fontWeight: "500",

  }
})
