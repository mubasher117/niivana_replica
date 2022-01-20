/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView
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
import CalendarIcon from "../../../../assets/icons/calendar-filled.svg"
import CardIcon from "../../../../assets/icons/card-filled.svg"
import { countries } from "../../../../config/data"
import { createCard, getStripeToken } from "../../../../api/main/Payment"

const CardDetailsScreen = props => {
  const [selectedCountry, setSelectedCountry] = useState("Select Country")
  const [isLoading, setIsLoading] = useState(false)
  const _handleCardDetails = (values) => {
    setIsLoading(true)
    const expiries = values.expirationDate.split("/")
    getStripeToken(
      values.cardNo,
      values.cvv,
      expiries[0],
      expiries[1]
    ).then(res => {
      console.log(res.id)
      try {
        console.log(res.card.last4)
      } catch (error) {
        alert("Internal Error")
        console.log(res)
        setIsLoading(false)
        return
      }
      createCard(res.id)
        .then(res => {
          console.log(res.data)
          setIsLoading(false)
          props.navigation.navigate("Membership")
        })
        .catch(err => {
          alert("Internal Error")
          console.log("Error in create card: ", err)
          setIsLoading(false)
        })
    })
    
  }
  return (
    <KeyboardAvoidingView contentContainerStyle={styles.rootContentContainer}>
      <Formik
        onSubmit={values => _handleCardDetails(values)}
        initialValues={{
          name: "",
          address1: "",
          address2: "",
          state: "",
          zip: "",
          expirationDate: "",
          cardNo: "",
          cvv: "",
        }}
        // validationSchema={validationSchema}
      >
        {formik => {
          return (
            <ScrollView
              style={styles.root}
              contentContainerStyle={styles.rootContentContainer}
            >
              <Header
                title={"add card".toUpperCase()}
                leftIcon={<BackIcon />}
                leftHandler={() => props.navigation.goBack()}
                rightIcon={<View />}
              />
              <View style={{ height: 40, width: 1 }} />

              <CustomTextInput
                style={styles.input}
                inputStyle={styles.inputText}
                autoCorrect={false}
                placeholder="Card holder"
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
                hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                selectionColor={BaseColor.grayColor}
                icon={<UserIcon />}
              />

              {formik.touched.first_name && formik.errors.first_name && (
                <Error message={formik.errors.first_name} />
              )}
              <CustomTextInput
                style={styles.input}
                inputStyle={styles.inputText}
                autoCorrect={false}
                placeholder="Address "
                onChangeText={formik.handleChange("address1")}
                onBlur={formik.handleBlur("address1")}
                value={formik.values.address1}
                hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                selectionColor={BaseColor.grayColor}
              />
              <CustomTextInput
                style={styles.input}
                inputStyle={styles.inputText}
                autoCorrect={false}
                placeholder="Address "
                onChangeText={formik.handleChange("address2")}
                onBlur={formik.handleBlur("address2")}
                value={formik.values.address2}
                hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                selectionColor={BaseColor.grayColor}
              />
              <View style={styles.multipleFieldsContainer}>
                <CustomTextInput
                  style={[styles.input, { width: "49%", marginRight: "2%" }]}
                  inputStyle={styles.inputText}
                  autoCorrect={false}
                  placeholder="State"
                  onChangeText={formik.handleChange("state")}
                  onBlur={formik.handleBlur("state")}
                  value={formik.values.state}
                  hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                  selectionColor={BaseColor.grayColor}
                />

                <CustomTextInput
                  style={[styles.input, { width: "49%" }]}
                  inputStyle={styles.inputText}
                  autoCorrect={false}
                  placeholder="Zip"
                  onChangeText={formik.handleChange("zip")}
                  onBlur={formik.handleBlur("zip")}
                  value={formik.values.zip}
                  hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                  selectionColor={BaseColor.grayColor}
                />
              </View>

              <ModalDropdown
                options={countries}
                dropdownTextStyle={styles.dropdownText}
                textStyle={styles.dropdownText}
                style={styles.dropdownContainer}
                dropdownStyle={styles.dropdown}
                onSelect={(index, value) => setSelectedCountry(value)}
                defaultValue={selectedCountry}
                renderSeparator={() => <View/>}
              />
              <View style={{ width: 1, height: 10 }} />

              <CustomTextInput
                style={styles.input}
                inputStyle={styles.inputText}
                autoCorrect={false}
                placeholder="Expiration date"
                onChangeText={formik.handleChange("expirationDate")}
                onBlur={formik.handleBlur("expirationDate")}
                value={formik.values.expirationDate}
                hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                selectionColor={BaseColor.grayColor}
                icon={<CalendarIcon />}
              />
              <CustomTextInput
                style={styles.input}
                inputStyle={styles.inputText}
                autoCorrect={false}
                placeholder="Card number"
                onChangeText={formik.handleChange("cardNo")}
                onBlur={formik.handleBlur("cardNo")}
                value={formik.values.cardNo}
                hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                selectionColor={BaseColor.grayColor}
                icon={<CardIcon />}
              />
              <CustomTextInput
                style={styles.input}
                inputStyle={styles.inputText}
                autoCorrect={false}
                placeholder="Cvv"
                onChangeText={formik.handleChange("cvv")}
                onBlur={formik.handleBlur("cvv")}
                value={formik.values.cvv}
                hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                selectionColor={BaseColor.grayColor}
                icon={<LockIcon />}
              />

              <View style={styles.bottomContainer}>
                <Button
                    loading={isLoading}
                  style={styles.createButton}
                  // disabled={!(formik.isValid && formik.dirty && !isLoading)}
                  onPress={formik.handleSubmit}
                >
                  {"add card".toUpperCase()}
                </Button>
              </View>
            </ScrollView>
          )
        }}
      </Formik>
    </KeyboardAvoidingView>
  )
}

export default CardDetailsScreen
