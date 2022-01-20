import { StyleSheet, Dimensions } from "react-native"
import { BaseColor } from "../../../config"
const width = Dimensions.get("screen").width
export default StyleSheet.create({
  meetingModalBackground: {
    flex: 1,
    alignItems: "center",
    margin: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  meetingModalWrapper: {
    backgroundColor: BaseColor.whiteColor,
    minHeight: 180,
    width: width - 40,
    borderRadius: 10,
    // alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 20
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginVertical: 20
    // paddingHorizontal: 20
  },
  meetingTextInput: {
    marginBottom: 10
  }
})
