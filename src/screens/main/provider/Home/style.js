import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  root: {
    width: width,
    paddingTop: 40
  },
  rootContentContainer: {
    alignItems: "center"
  },
  searchbar: {
    width: "90%",
    height: 50,
    borderRadius: 12
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionsIcon: {
    marginRight: 30,
    marginTop: 20
  },
  title:{
    color: BaseColor.titleGrey,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 27,
    alignSelf: "flex-start",
    marginLeft: "6%"
  },
  // Provider
  providerMain: {
    width: "90%",
    // height: 190,
    flexDirection: "row",
    marginTop: 16,
    borderRadius: 16,


    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff"
  },
  providerImage: {
    width: "25%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius:16,
  },
  providerRemaining: {
    width: "75%",
    height: "100%",
    backgroundColor: "white",
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
  },
  providerDescription: {
    padding: "5%",
  },
  providerButtonContainer: {
    backgroundColor: BaseColor.goldLight, 
    width: "100%",
    height: 38,
    // position: "absolute",
    // bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 16,

  },
  providerButtonText: {
    color: BaseColor.goldDark, 
    fontSize: 14,
    fontWeight: "bold",
  },
  providerName:{
    color: BaseColor.greetings,
    fontWeight: "600",
    fontSize: 14
  },
  providerText: {
    color: BaseColor.textGrey,
    fontSize: 12,
  },
  onlineBadge: {
    width: "15%",
    height: 19,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 5,
    backgroundColor: BaseColor.iconicButtonActiveBackground
  },
  onlineBadgeText: {
    color: "white",
    fontSize: 12
  },
  availableContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  daysContainer: {
    flexDirection: "row",
  },
  reviewContainer: {
    flexDirection: "row",
    marginTop: 15
  },
  ratings:{
    marginLeft: 5,
    marginRight: 3,
  }
})

export default styles
