import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../config"
import { getWidthPercentage } from "../../../util/helpers"
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  root: {
    width: width,
    paddingTop: 40
  },
  rootContentContainer: {
    alignItems: "center",
  },
  providerName: {
    color: BaseColor.textDark,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 30
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30
  },
  price: {
    fontSize: 36,
    fontWeight: "600",
    marginTop: 8,
  },
  titlePremium: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12
  },
  duration: {
    color: BaseColor.textGrey,
    fontSize: 18
  },
  period: {
    color: BaseColor.textGreyLight,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 30
  },
  amount: {
    color: BaseColor.textDark,
    fontSize: 36,
    fontWeight: "600",
    marginTop: 8
  },
  scheduleButton: {
    backgroundColor: BaseColor.blackColor,
    width: "88%",
    height: 50,
    marginTop: 35
  },
  payWithCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    marginTop: 35
  },
  payWithCardHorizontalBreak: {
    width: "23%",
    height: 0.4,
    backgroundColor: BaseColor.textGreyLight
  },
  payWithCard: {
    fontSize: 24,
    fontWeight: "400",
    color: BaseColor.textGreyLight
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
    width: "88%",
    shadowColor: "rgba(16, 32, 89, 0.12)",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  multiInputContainer: {
    flexDirection: "row",
    width: "88%"
  },
  inputMulti: {
    marginTop: -10,
    padding: 20,

    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    borderTopWidth: 0,
    width: "50%",
    // borderBottomRightRadius: 0
  },
  inputText: {
    paddingLeft: 0,
    backgroundColor: "#FAFAFA",
    fontSize: 17,
    width: "90%"
  },

  zip: {
    height: 60,
    backgroundColor: "#FAFAFA",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius:0,
    marginBottom: 10,
    padding: 20,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderTopWidth: 0,
    width: "90%",
    // shadowColor: "gray",
    // shadowOpacity: 0.3,
    // shadowRadius: 10,
    // elevation: 1
  },
  paymentTitle: {
    color: BaseColor.textGreyDark,
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 28,
    marginBottom: 10,
    marginTop: 38
  },
  cards: {
    flexDirection: "row",
    width: 120,
    justifyContent: "space-evenly"
  },
  dropdownContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "90%",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    // borderBottomWidth: 0.3,
    height: 60,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // padding: 20,
    // paddingLeft: 25,
    backgroundColor: "#FAFAFA"
  },
  dropdown: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "89.5%",
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
    width: "100%"
    // backgroundColor: BaseColor.backgroundColor
  },
  dropdownButton: {
    fontSize: 16
  },

  // Modal 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
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
  modalPlanChecksContainer: {backgroundColor: BaseColor.backgroundLightColor, padding: 25, marginTop: 24},
  modalText: {
    fontSize: 26,
    fontWeight: "600",
    color: BaseColor.primaryColor,
    marginTop: 25,
    textAlign: "center",
  },
  modalSubText: {
    fontSize: 18,
    fontWeight: "500",
    color: BaseColor.textGrey,
    marginTop: 10,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  modalButton: {
    width: getWidthPercentage(90),
    height: 70,
    backgroundColor: BaseColor.goldLight,
    color: BaseColor.primaryColor,
  },
  modalButtonText: {
    color: BaseColor.primaryColor
  },
  modalSuccessText: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 5,
    color: BaseColor.accentColor,
  },
  modalSuccessMessage: {
    fontSize: 16,
    fontWeight: "400",
    color: BaseColor.textDark,
    marginBottom: 30,
    marginTop: 25,

  }
})

export default styles
