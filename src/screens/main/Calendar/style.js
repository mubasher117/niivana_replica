import { Dimensions, StyleSheet } from "react-native"
import { BaseColor } from "../../../config"
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  root: {
    width: width,
    height: height,
    paddingTop: 40
  },
  rootContentContainer: {
    alignItems: "center",
    height: height
  },
  calendar: {
    width: width,
    height: 350,
    backgroundColor: BaseColor.whiteColor,
    marginBottom: 0
  },
  calendarTheme: {
    selectedDayBackgroundColor: "green",
    selectedDayTextColor: BaseColor.whiteColor,
    arrowColor: BaseColor.textGrey,
    monthTextColor: BaseColor.greetings,
    textDayFontSize: 16,
    textDayColor : BaseColor.textGrey,
    textMonthFontSize: 14,
    textMonthFontWeight: "500",
    textDayHeaderFontSize: 12,
    agendaDayTextColor:BaseColor.primaryColor,
    todayTextColor: BaseColor.textGrey,
  },
  scheduleButton: {
    width: "88%",
    height: 50,
    position: "absolute",
    bottom: 150
  },
  appointmentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "85%"
  },
  appointmentContainer: {
    width: 80,
    height: 50,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginRight: 10,
    marginBottom: 24
  },
  appointment: {
    color: BaseColor.textGrey,
    fontSize: 18
  }
})

export default styles
