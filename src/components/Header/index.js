import React, { Component } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet
} from "react-native"

import Hamburger from "../../assets/icons/hamburger.svg"
import Notification from "../../assets/icons/notification.svg"
import NotificationPending from "../../assets/icons/notification-pending.svg"
import styles from "./styles"

const Header = ({ title, leftIcon, leftHandler, rightIcon, rightHandler }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={leftHandler} style={styles.leftIcon}>
        {leftIcon ? leftIcon : <Hamburger />}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={rightHandler} style={styles.rightIcon}>
        {rightIcon ? rightIcon : <NotificationPending />}
      </TouchableOpacity>
    </View>
  )
}
export default Header
