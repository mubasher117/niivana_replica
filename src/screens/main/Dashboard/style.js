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
    alignItems: "center"
  },
  buttonsContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 50
  },
  buttonsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  bookAppointment: {
    width: getWidthPercentage(90),
    height: 180,
    borderRadius: 12
  },
  greetingsContainer: {
    flexDirection: "row",
    width: "90%",
    marginTop: 22
  },
  dp: {
    width: 40,
    height: 40
  },
  greetings: {
    color: BaseColor.greetings,
    fontWeight: "bold",
    fontSize: 32,
    marginLeft: 8
  },
  datesContentContainer: {
    flexDirection: "row"
  },
  datesContainer: {
    width: "90%",
    paddingRight: 24,
    marginTop: 30
  },

  //   Day Date
  dayDateContainerActive: {
    backgroundColor: BaseColor.primaryColor,
    width: 48,
    height: 75,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: 20
  },
  dateActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  dayActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  clockColoured: {
    alignItems: "center",
    marginTop: 3,
    marginRight: 20
  },
  dayDateContainer: {
    backgroundColor: "white",
    width: 48,
    height: 75,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: 20,
    borderColor: BaseColor.primaryColor,
    borderWidth: 0.5
  },
  date: {
    color: BaseColor.primaryColor,
    fontWeight: "bold",
    fontSize: 16
  },
  day: {
    color: BaseColor.primaryColor,
    fontWeight: "bold",
    fontSize: 16
  },
  //   Till here
  searchbar: {
    width: "90%",
    height: 50,
    borderRadius: 12
  },
  upcomingGroups: {
    color: BaseColor.primaryColor,
    fontSize: 18,
    width: "90%",
    fontWeight: "bold"
  },
  cardsContainer: {
    width: "90%"
  },
  classesCardTitle: {
    fontSize: 19,
    fontWeight: "normal",
    alignSelf: "flex-start",
    color: BaseColor.cardTitle,
    marginTop: 16,
    marginLeft: 16
  },

  dateCardMainContainer: {
    width: "88%",
    marginTop: 30,
  },
  dateCardOuterMainContainer: {
    position: "absolute",
    width: width, 
    zIndex: 1000
  },
  // dateCard
  dateCardContainer: {
    backgroundColor: BaseColor.backgroundLightColor,
    borderRadius: 14,
    width: "100%",
    padding: 12,
    justifyContent: "center",

    elevation: 3,
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.3,
    shadowColor: "gray",
  },
  dateCardTitle: {
    color: BaseColor.textGrey,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10
  },
  dateCardCategory: {
    color: BaseColor.textGrey,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10
  },
  dateCardDuration: {
    color: BaseColor.textGrey,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10
  },
  activeCardBackground: {
    color: BaseColor.primaryColor
  },
  activeCardText: {
    color: "white"
  },
})

export default styles
