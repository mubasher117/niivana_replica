import { Formik } from "formik"
import React, { useState } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native"
import CheckBox from "../../../../components/CheckBox"
import BackIcon from "../../../../assets/icons/back.svg"
import CheckBoxIcon from "../../../../assets/icons/checkbox.svg"
import CheckBoxUnslectedIcon from "../../../../assets/icons/checkbox-unselected.svg"
import Header from "../../../../components/Header"
import styles from "./style"
import { Searchbar } from "../../../components"
import { Button } from "../../../../components"
import { storeData } from "../../../../util/helpers"
import { useSelector, useDispatch } from "react-redux"

const IconicButton = ({ title, isActive, handleCheck, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.iconicButton,
        isActive ? styles.iconicButtonActive : styles.iconicButtonInactive,
        backgroundColor && { backgroundColor: backgroundColor }
      ]}
      onPress={handleCheck}
    >
      <Text
        style={
          isActive
            ? styles.iconicButtonActiveText
            : styles.iconicButtonInactiveText
        }
      >
        {title}
      </Text>
      <TouchableOpacity onPress={handleCheck}>
        {isActive ? <CheckBoxIcon /> : <CheckBoxUnslectedIcon />}
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
const Interest = props => {
  const [activeHelp, setActiveHelp] = useState()
  const screensFlow = useSelector(state => state.nav.screensFlow)
  const previousScreen = useSelector(state => state.nav.previousScreen)
  const nextScreen = useSelector(state => state.nav.nextScreen)
  const _handleContinue = () => {
    if (screensFlow === "notifyProviders") {
      console.log("Notifying providers")
      props.navigation.navigate("NotifyProviders")
    } else {
      storeData("bookingData", {
        bookingHelp: activeHelp
      })
      props.navigation.navigate("Interest2")
    }
  }
  const _handleBackNav = () => {
    previousScreen === "DashboardNav"
      ? props.navigation.navigate("DashboardNav")
      : props.navigation.goBack()
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header
        title=""
        leftIcon={<BackIcon />}
        rightIcon={<View />}
        leftHandler={_handleBackNav}
      />
      <Text style={styles.title}>How can we help you?</Text>
      <Text style={styles.subTitle}>Please choose one:</Text>
      <View style={styles.iconicButtonConatiner}>
        <IconicButton
          title="Mental Health"
          isActive={activeHelp === 1}
          handleCheck={() => setActiveHelp(1)}
        />
        <IconicButton
          title="Lactation Support"
          isActive={activeHelp === 2}
          handleCheck={() => setActiveHelp(2)}
        />
      </View>
      <Button style={styles.continueButton} onPress={_handleContinue}>
        CONTINUE
      </Button>
      <View style={{ width: 300, height: 70 }} />
    </ScrollView>
  )
}

export default Interest
