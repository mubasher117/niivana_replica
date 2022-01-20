/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../config"
import { getWidthPercentage } from "../../../util/helpers"
const { width, height } = Dimensions.get("window")
export default StyleSheet.create({
  root: {
    width: width,
    minHeight: height,
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    width: "86%",
    height: "100%",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: "10%",
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
    borderWidth: 1,
    borderTopWidth: 2,
    width: "100%",
    shadowColor: "rgba(16, 32, 89, 0.12)",
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
    marginTop: 112,
    marginBottom: 56
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
  createButton: {
    marginTop: 32,
    width: "100%",
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
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 16
  },
  forgotPassword: {
    color: BaseColor.primaryColor,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-end"
  },
  orContainer: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  or: {
    color: BaseColor.primaryColor,
    fontSize: 14
  },
  orHorizontal: {
    width: "40%",
    backgroundColor: BaseColor.primaryColor,
    height: 1
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50,
    marginBottom: 50,

  },
  socialButtonContainer: {
    borderColor: BaseColor.primaryColor,
    borderWidth: 1,
    padding: 10,
    width: "30%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  socialButtonCenterContainer: {
    marginLeft: "5%",
    marginRight: "5%"
  },
  socialButton: {
    width: 10,
    height: 20
  }
})
