/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch
} from "react-native"
import BackIcon from "../../../../assets/icons/back.svg"
import AddBillingIcon from "../../../../assets/icons/add.svg"
import PaymentCardBackgroud from "../../../../assets/icons/payment_card_backgroud.svg"
import styles from "./style"
import { Button, CustomTextInput, Error } from "../../../../components"
import Header from "../../../../components/Header"
import { Calendar } from "react-native-calendars"
import ModalDropdown from "react-native-modal-dropdown"
import { BaseColor } from "../../../../config"
import { Formik } from "formik"
import UserIcon from "../../../../assets/icons/user.svg"
import LockIcon from "../../../../assets/icons/lock.svg"
import MailIcon from "../../../../assets/icons/mail.svg"
import HomeIcon from "../../../../assets/icons/home.svg"
import EyeIcon from "../../../../assets/icons/eye.svg"
import CakeIcon from "../../../../assets/icons/cake.svg"
import Ticket from "../../../../assets/icons/ticket.svg"
import Check from "../../../../assets/icons/check-accent.svg"
import CalendarIcon from "../../../../assets/icons/calendar-filled.svg"
import CardIcon from "../../../../assets/icons/card-filled.svg"
import { countries } from "../../../../config/data"
import { planChecks } from "../../../../util/data"

export const PlanCheck = ({ text }) => (
  <View style={styles.planCheckContainer}>
    <Check />
    <Text style={styles.planCheckText}>{text}</Text>
  </View>
)
const MembershipScreen = props => {
  const [selectedCountry, setSelectedCountry] = useState("Select Country")
  const [isEnabled, setIsEnabled] = useState()
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header
        title={"membership".toUpperCase()}
        leftIcon={<BackIcon />}
        leftHandler={() => props.navigation.goBack()}
        rightIcon={<View />}
      />
      <View style={{ height: 40, width: 1 }} />
      <Text style={styles.premiumPlan}>Premium Plan</Text>
      <Text style={styles.price}>${!isEnabled ? "99.00" : "899.00"}</Text>
      <View style={styles.paymentToggleContainer}>
        <Text
          style={
            isEnabled ? styles.paymentTextInactive : styles.paymentTextActive
          }
        >
          Pay Monthly
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: BaseColor.primaryColor }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsEnabled(prevEnabled => !prevEnabled)}
          value={isEnabled}
          style={{ marginLeft: 18, marginRight: 18 }}
        />
        <Text
          style={
            isEnabled ? styles.paymentTextActive : styles.paymentTextInactive
          }
        >
          Pay Yearly
        </Text>
      </View>
      <View style={styles.horizontalBreak} />
      {planChecks.map((check, index) => (
        <PlanCheck key={index} text={check} />
      ))}
      <Button
        //   loading={isLoading}
        style={styles.createButton}
        // disabled={!(formik.isValid && formik.dirty && !isLoading)}
        onPress={() =>
          props.navigation.navigate("Payment", {
            previousScreen: "membership",
            period: isEnabled ? "Yearly" : "Monthly",
            amount: !isEnabled ? "99.00" : "899.00",
            currency: "$"
          })
        }
      >
        {"upgrade".toUpperCase()}
      </Button>
    </ScrollView>
  )
}

export default MembershipScreen
