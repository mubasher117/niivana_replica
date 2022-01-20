import React from "react"
import { StyleSheet } from "react-native"
import { BaseColor, Typography, FontWeight } from "../../config"

const styles = StyleSheet.create({
  cardContainer: {
    width: 327,
    alignSelf: "center",
    borderRadius: 16,
    borderColor: "#1A264B33",
    // borderWidth: 1,
    // elevation: 100,
    alignItems: "center",
    marginTop: 16,
    marginRight: 24,

    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  eventsHeading: {
    color: BaseColor.primaryColor,
    fontSize: 12,
    marginTop: 16,
    marginLeft: 16,
    alignSelf: "flex-start"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: BaseColor.cardTitle,
    marginTop: 16,
    marginLeft: 16
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 16
  },
  cardDate: {
    color: BaseColor.dateTime,
    fontSize: 14,
    marginLeft: 9,
    marginRight: 26
  },
  time: {
    color: BaseColor.dateTime,
    fontSize: 14,
    marginLeft: 9
  },
  description: {
    fontSize: 14,
    marginTop: 25,
    marginLeft: 9,
    marginRight: 9
    // width: "90%",
    // overflow: "visible"
  },
  joinButton: {
    alignSelf: "flex-end",
    marginTop: 17,
    marginBottom: 17,
    marginRight: 16
  }
})

export default styles
