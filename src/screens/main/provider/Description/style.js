import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
import { getWidthPercentage } from "../../../../util/helpers"
const { width, height } = Dimensions.get("window")
console.log(width, height)
const styles = StyleSheet.create({
  root: {
    width: width,
    paddingTop: 45
  },
  rootContentContainer: {
    alignItems: "center"
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100
  },
  specializationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 15
  },
  specialization: {
    color: BaseColor.pink,
    width: "30%",
    fontSize: 14,
    fontWeight: "600"
  },
  aboutMe: {
    width: "88%",
    color: BaseColor.textGrey,
    fontSize: 16,
    marginTop: 8
  },
  horizontalBreak: {
    backgroundColor: BaseColor.breakLine,
    width: width,
    height: 2
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  optionsIcon: {
    marginRight: 30,
    marginTop: 20
  },
  title: {
    // color: BaseColor.titleGrey,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 27,
    alignSelf: "flex-start",
    marginLeft: "6%"
  },
  titleRow: {
    marginTop: 0,
    alignSelf: "center",
    marginLeft: 0
  },
  // Provider
  providerMain: {
    width: "90%",
    height: 185,
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
  providerRemaining: {
    width: "75%",
    height: "100%",
    backgroundColor: "white",
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16
  },
  providerDescription: {
    padding: "5%"
  },
  providerButtonContainer: {
    backgroundColor: BaseColor.goldLight,
    width: "100%",
    height: 38,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 16
  },
  providerButtonText: {
    color: BaseColor.goldDark,
    fontSize: 14,
    fontWeight: "bold"
  },
  providerName: {
    color: BaseColor.greetings,
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 20
  },
  providerText: {
    color: BaseColor.textGrey,
    fontSize: 14,
    marginTop: 3,
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
  availabilityContainer: {
    backgroundColor: BaseColor.backgroundLightColor,
    width: "90%",
    height: 80,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  availableContainer: {
    flexDirection: "row"
  },
  daysContainer: {
    flexDirection: "row"
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    height: 60,
    paddingLeft: "5%",
    paddingRight: "5%"
    // marginTop: 15
  },
  reviewDataContainer: {
    flex: 2,
    flexDirection: "row"
  },
  starIcon: {
    marginLeft: 15,
    marginTop: 4,
  },
  ratings: {
    marginLeft: 5,
    marginRight: 3,
    marginTop: 3,
  },
  bottomContainer: {
    width: width,
    height: 120,
    backgroundColor: BaseColor.goldLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8%",
    alignItems: "center"
    // position: "absolute",
    // bottom: 0,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold"
  },
  duration: {
    fontSize: 16,
    fontWeight: "500"
  },
  purchaseButton: {
    width: "30%",
    height: 65
  },
  // review card
  reviewCardContainer: {
    width: getWidthPercentage(95),
    backgroundColor: BaseColor.backgroundLightColor,
    padding: "5%",
    borderRadius: 16,
    marginBottom: 35,
  },
  reviewerName: {
    color: BaseColor.greetings,
    fontSize: 16,
    fontWeight: "600"
  },
  review: {
    color: BaseColor.textGrey,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 8,
    marginBottom: 8
  },
  reviewBottomContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  ratingsContainer: { flex: 2, flexDirection: "row", alignItems: "center" },
  rating: {
    color: BaseColor.textGrey,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6
  },
  date: {
    color: BaseColor.reviewCardDate,
    fontSize: 14,
    fontWeight: "600"
  }
})

export default styles
