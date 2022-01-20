/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
import { getWidthPercentage } from "../../../../util/helpers"
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  root: {
    width: width,
    paddingTop: 40,
    height: height,
    backgroundColor: BaseColor.whiteColor
  },
  rootContentContainer: {
    alignItems: "center",
    height: height
  },
  container: {
    width: getWidthPercentage(90),
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
    width: getWidthPercentage(70)
  },
  subTitle: {
    fontSize: 16,
    marginTop: 24,
    textAlign: "center",
    width: getWidthPercentage(70)
  },
  bottomText: {
    color: BaseColor.textGrey,
    textAlign: "center",
    width: getWidthPercentage(75)
  },
  iconicButtonConatiner: {
    width: "88%",
    marginTop: 50
  },
  continueButton: {
    width: getWidthPercentage(90),
    height: 55,
    borderRadius: 12
  },
  uploadImages: {
    width: getWidthPercentage(90),
    height: 55,
    backgroundColor: BaseColor.whiteColor,
    borderColor: BaseColor.primaryColor,
    borderWidth: 1,
    borderRadius: 12
  },
  uploadImagesText: {
    color: BaseColor.primaryColor
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
  input: {
    height: 60,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderTopWidth: 2,
    width: getWidthPercentage(90),
    shadowColor: "rgba(16, 32, 89, 0.12)",
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  multilineInput: { height: 100, alignItems: "flex-start" },
  inputText: {
    paddingLeft: 10,
    backgroundColor: "#FAFAFA",
    fontSize: 17,
    width: "90%"
  },
  dropdownText: {
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    marginLeft: 20,
    borderWidth: 0,
    width: "90%",
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
  imagesDisplay: {
    width: "100%",
    height: 104,
    backgroundColor: "#FAFAFA",
    borderWidth: 0.5,
    borderTopWidth: 2,
    borderColor: "#E4E4E4",
    borderStyle: "solid",
    borderRadius: 12,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    order: 3,
    marginTop: 16,
    marginRight: 0,
    marginBottom: 16,
    marginLeft: 0,

    shadowColor: "rgba(16, 32, 89, 0.12)",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },

    padding: 15,
    paddingTop: 5
  },
  // Modal
  modalContainer: {
    width: "90%",
    alignItems: "center"
  },
  modalTitle: {},
  modalSubTitle: {
    width: "100%",
    color: BaseColor.greetings
  },
  modalButtonsContainer: {
    flexDirection: "row",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  modalButton: {
    width: "100%",
    height: 55,
    borderRadius: 12
  },
  modalButtonText: {
    color: BaseColor.primaryColor
  },
  imagePickerContainer: {
    width: "100%",
    height: 226,
    backgroundColor: BaseColor.primaryLightColor,
    borderColor: BaseColor.primaryColor,
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 15
  },
  browseImage: {
    alignItems: "center",
    justifyContent: "center"
  },
  displayImages: {},
  imagePickerText: {
    color: BaseColor.primaryColor,
    fontSize: 16,
    fontWeight: "700"
  },
  imageName: {
    marginTop: 5
    // marginBottom: 5
  },
  // Selected Image
  selectedImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: BaseColor.borderTextBox,
    borderBottomWidth: 1
  },
  selectedImageName: {
    width: "80%",
    flexWrap: "wrap"
  }
})

export default styles
