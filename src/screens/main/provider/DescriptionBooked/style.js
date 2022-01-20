import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../../config"
import { getWidthPercentage } from "../../../../util/helpers";
const { width, height } = Dimensions.get("window")
console.log(width, height);
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
    borderRadius: 100,
  },
  specializationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 15,
  },
  specialization:{
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
    height: 2,
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
    borderTopRightRadius: 16,
  },
  providerDescription: {
    padding: "5%",
  },
  providerButtonContainer: {
    backgroundColor: BaseColor.goldLight, 
    width: "100%",
    height: 38,
    position: "absolute",
    bottom: 0,
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
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 20,
  },
  providerText: {
    color: BaseColor.textGrey,
    fontSize: 14,
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
    marginTop: 20,

  },
  availableContainer: {
    flexDirection: "row",
  },
  daysContainer: {
    flexDirection: "row",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    height: 60,
    paddingLeft: "5%"
    // marginTop: 15
  },
  starIcon: {
    marginLeft: 15
  },
  downIcon: {
    textAlign: "right"
  },
  ratings:{
    marginLeft: 5,
    marginRight: 3,
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
    alignItems: "center",
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
    height: 65,
  },
  dualBottomButton: {
    // marginTop: 32,
    width: getWidthPercentage(90),
    justifyContent: "center",
    borderRadius: 12,
    height: 55,
    marginTop: 15
  },
  nextMeetingText: {
    color: BaseColor.textDark, 
    fontSize: 15,
    fontWeight: "600",
    width: getWidthPercentage(90),
    marginTop: 30,
    marginBottom: 20
  },
  meetingContainer: {
    width: getWidthPercentage(90),
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  meetingScheduleContainer: {
    marginLeft: 20
  },
  meetingDate: {
    color: BaseColor.textDark, 
    fontSize: 17,
    fontWeight: "400"
  },
  meetingDuration: {
    color: BaseColor.textGrey, 
    fontSize: 15,
    fontWeight: "500",
  marginTop: 5,
marginBottom: 13},
  addToCalendarButton: {
    color: BaseColor.primaryColor, 
    fontSize: 15,
    fontWeight: "500"},
})

export default styles
