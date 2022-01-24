import { Formik } from "formik"
import * as Yup from "yup"
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native"
import SelectDropdown from "react-native-select-dropdown"
import ModalDropdown from "react-native-modal-dropdown"
import moment from "moment"
import DatePicker from "react-native-date-picker"
import Header from "../../../../components/Header"
import { BaseColor } from "../../../../config"
import { getWidthPercentage } from "../../../../util/helpers"

import {
  CustomTextInput,
  CustomDropDown,
  Error,
  Button
} from "../../../../components"
import BackIcon from "../../../../assets/icons/back.svg"
import DropDownOpen from "../../../../assets/icons/dropDownOpen.svg"
import DropDownClose from "../../../../assets/icons/dropDownClose.svg"

import styles from "./style"

const InsuranceDetails = () => {
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
  const CardDetail = ({ heading, value }) => {
    return (
      <View style={styles.cardDetailMain}>
        <Text style={styles.cardDetailHeading}>{heading}</Text>
        <Text style={styles.cardDetailValue}>{value}</Text>
      </View>
    )
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <>
        <Header
          title="INSURANCE"
          leftIcon={<BackIcon />}
          rightIcon={<View />}
          leftHandler={_handleBackNav}
        />
        <View style={styles.activeView}>
          <Text>Active</Text>
        </View>
        <View style={styles.cardMainContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeaderText}>Insurance Card Details</Text>
            {!cardDetailOpen ? (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setCardDetailOpen(!cardDetailOpen)
                }}
              >
                <DropDownOpen />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setCardDetailOpen(!cardDetailOpen)
                }}
              >
                <DropDownClose />
              </TouchableOpacity>
            )}
          </View>
          {cardDetailOpen && (
            <View>
              <CardDetail heading="Member ID" value="XER000999000" />
              <CardDetail heading="Name" value="BCBS of Arkansas" />
              <CardDetail heading="Phone No." value="14535678900" />
              <CardDetail heading="Payer ID" value="00803" />
              <CardDetail
                heading="Address"
                value="345 West Elm Street 2nd Floor"
              />
              <CardDetail heading="City" value="Little Rock" />
              <CardDetail heading="State" value="Arkansas" />
              <CardDetail heading="Zip Code" value="72203" />
            </View>
          )}
        </View>

        <View style={styles.cardMainContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeaderText}>Claim Filer Details</Text>
            {!cardDetailOpen2 ? (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setCardDetailOpen2(!cardDetailOpen2)
                }}
              >
                <DropDownOpen />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setCardDetailOpen2(!cardDetailOpen2)
                }}
              >
                <DropDownClose />
              </TouchableOpacity>
            )}
          </View>
          {cardDetailOpen2 && (
            <View>
              <CardDetail heading="City" value="Farmingdale" />
              <CardDetail heading="Email" value="registrant@mailinator.com" />
              <CardDetail heading="Phone" value="5123412341" />
              <CardDetail heading="State" value="IL" />
              <CardDetail heading="Gender" value="Male" />
              <CardDetail heading="Address" value="783 Crimson Road" />
              <CardDetail heading="Country" value="USA" />
              <CardDetail heading="Zip Code" value="32930" />
              <CardDetail heading="Last Name" value="Jones" />
              <CardDetail heading="First Name" value="Emily" />
              <CardDetail heading="Address Extn." value="" />
              <CardDetail heading="Date of Birth Code" value="2001-02-01" />
            </View>
          )}
        </View>
      </>
    </ScrollView>
  )
}
export default InsuranceDetails
