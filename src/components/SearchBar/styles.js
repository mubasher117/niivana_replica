import { BaseColor, PurpleColor } from "../../config"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
  searchBar: {
    width: "70%",
    height: "90%",
    backgroundColor: BaseColor.backgroundColor,
    borderColor: BaseColor.searchbarBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: "2.5%"
  },
  searchBarInput: {
    width: "85%",
    backgroundColor: BaseColor.backgroundColor,
    borderRadius: 12,
    fontSize: 18,
    color: "black"
  }
})
