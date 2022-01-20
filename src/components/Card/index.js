import React, { Component } from "react"
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Image
} from "react-native"
import { BaseColor } from "../../config"
import PropTypes from "prop-types"
import Text from "../Text"
import styles from "./styles"
import LinearGradient from "react-native-linear-gradient"
import ClockIcon from "../../assets/icons/clock.svg"
import CalendarIcon from "../../assets/icons/Calendar.svg"
import JoinIcon from "../../assets/icons/Join.svg"
const EventsCard = ({
  image,
  title,
  titleStyle,
  description,
  date,
  time,
  button,
  eventsHeading
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} />
      {eventsHeading && <Text style={styles.eventsHeading}>EVENTS</Text>}
      <Text style={titleStyle || styles.title}>{title}</Text>
      {date && time && (
        <View style={styles.dateTimeContainer}>
          <CalendarIcon />
          <Text style={styles.cardDate}>{date}</Text>
          <ClockIcon />
          <Text style={styles.time}>{time}</Text>
        </View>
      )}
      <Text style={styles.description}>{description}</Text>
      {button && (
        <TouchableOpacity style={styles.joinButton}>
          <JoinIcon />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default EventsCard
