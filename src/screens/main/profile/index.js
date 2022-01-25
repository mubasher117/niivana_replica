import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"

import Header from "../../../components/Header"
import { BaseColor } from "../../../config"
import { getWidthPercentage } from "../../../util/helpers"
import { Error, Button } from "../../../components"
import BackIcon from "../../../assets/icons/back.svg"
import Arrow from "../../../assets/icons/orangeArrow.svg"
import styles from "./style"

const Profile = () => {
  const [cardDetailOpen, setCardDetailOpen] = useState(false)
  const [cardDetailOpen2, setCardDetailOpen2] = useState(false)

  const _handleBackNav = () => {
    previousScreen === "DashboardNav"
      ? props.navigation.navigate("DashboardNav")
      : props.navigation.goBack()
  }
  useEffect(() => {
    console.log(getWidthPercentage(100))
  }, [])

  const Card = ({ text, active, onPressRight }) => {
    return (
      <View style={styles.cardMainContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.cardHeaderText}>{text}</Text>
          {active && (
            <View style={styles.activeView}>
              <Text>Active</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={onPressRight} style={{ padding: 5 }}>
          <Arrow />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header
        title="ACCOUNT SUMMARY"
        leftIcon={<BackIcon />}
        rightIcon={<View />}
        leftHandler={_handleBackNav}
      />
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://picsum.photos/id/237/200/300" }}
            style={styles.img}
          />
          <Text style={styles.nameText}>Dr jacob Jones</Text>
          <Text style={styles.emailText}>alexendra@gmail.com</Text>
        </View>
        <View style={styles.tilesContainer}>
          <Card text="Profile" onPressRight={() => console.log("Profile")} />
          <Card text="Languages Proficient In" />
          <Card text="Upload Documents" />
          <Card text="Password" />
          <Card text="Payment History" />
          <Card text="Refer Friend" />
          <Card text="Send Feedback" />
          <Card text="Insurance" active />
        </View>
        <Button style={styles.createButton}>SIGN OUT</Button>
        <Button
          style={[styles.createButton, styles.whiteButton]}
          styleText={{ color: BaseColor.primaryColor }}
        >
          CANCEL ACCOUNT
        </Button>
      </View>
    </ScrollView>
  )
}
export default Profile
