import { Formik } from "formik"
import * as Yup from "yup"
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
import SelectDropdown from "react-native-select-dropdown"
import ModalDropdown from "react-native-modal-dropdown"
import DatePicker from "react-native-date-picker"
import Header from "../../../../components/Header"
import { BaseColor } from "../../../../config"
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
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Enter Name"),
  phoneNumber: Yup.string().required("Enter Phone Number"),
  address1: Yup.string().required("Enter Address 1"),
  address2: Yup.string().required("Enter Address 2"),
  city: Yup.string().required("Enter City"),
  state: Yup.string().required("Enter State"),
  zipCode: Yup.string().required("Enter Zip Code")
})

const cities = ["New York", "Lorem", "Ispum"]
const states = ["New York", "New Jersey", "Washington"]
const gender = ["Male", "Female"]
const InsuranceSubmit = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [cardDetailOpen, setCardDetailOpen] = useState(false)
  const [cardDetailOpen2, setCardDetailOpen2] = useState(false)

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
      <Formik
        onSubmit={values => console.log(values)}
        initialValues={{
          name: "",
          phoneNumber: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipCode: "",
          claimCity: "",
          claimEmail: "",
          claimState: "",
          claimGender: "",
          claimAddress: "",
          claimCountry: "",
          claimZipCode: "",
          lastName: "",
          firstName: "",
          claimAddressExtension: "",
          DOB: ""
        }}
        validationSchema={validationSchema}
      >
        {formik => {
          return (
            <>
              <Header
                title="INSURANCE"
                leftIcon={<BackIcon />}
                rightIcon={<View />}
                leftHandler={_handleBackNav}
              />
              <View style={styles.cardMainContainer}>
                <View style={styles.cardContainer}>
                  <Text style={styles.cardHeaderText}>
                    Insurance Card Details
                  </Text>
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
                  <>
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Name"
                      onChangeText={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <Error message={formik.errors.name} />
                    )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Phone Number"
                      onChangeText={formik.handleChange("phoneNumber")}
                      onBlur={formik.handleBlur("phoneNumber")}
                      value={formik.values.phoneNumber}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <Error message={formik.errors.phoneNumber} />
                      )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Address Line 1"
                      onChangeText={formik.handleChange("address1")}
                      onBlur={formik.handleBlur("address1")}
                      value={formik.values.address1}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.address1 && formik.errors.address1 && (
                      <Error message={formik.errors.address1} />
                    )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Address Line 2"
                      onChangeText={formik.handleChange("address2")}
                      onBlur={formik.handleBlur("address2")}
                      value={formik.values.address2}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.address2 && formik.errors.address2 && (
                      <Error message={formik.errors.address2} />
                    )}

                    <ModalDropdown
                      options={cities}
                      defaultTextStyle={{ color: "#8F8D86", opacity: 0.5 }}
                      dropdownTextStyle={styles.dropdownText}
                      textStyle={styles.dropdownText}
                      style={styles.dropdownContainer}
                      dropdownStyle={styles.dropdown}
                      onSelect={(index, value) =>
                        formik.setFieldValue("city", value)
                      }
                      defaultValue={"City"}
                      renderRightComponent={() => {
                        return <DropDownOpen />
                      }}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <Error message={formik.errors.city} />
                    )}
                    <ModalDropdown
                      options={states}
                      defaultTextStyle={{ color: "#8F8D86", opacity: 0.5 }}
                      dropdownTextStyle={styles.dropdownText}
                      textStyle={styles.dropdownText}
                      style={styles.dropdownContainer}
                      dropdownStyle={styles.dropdown}
                      onSelect={(index, value) =>
                        formik.setFieldValue("state", value)
                      }
                      defaultValue={"State"}
                      renderRightComponent={() => {
                        return <DropDownOpen />
                      }}
                    />

                    {formik.touched.state && formik.errors.state && (
                      <Error message={formik.errors.state} />
                    )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Zip Code"
                      onChangeText={formik.handleChange("zipCode")}
                      onBlur={formik.handleBlur("zipCode")}
                      value={formik.values.zipCode}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.zipCode && formik.errors.zipCode && (
                      <Error message={formik.errors.zipCode} />
                    )}
                  </>
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
                  <>
                    <ModalDropdown
                      options={cities}
                      defaultTextStyle={{ color: "#8F8D86", opacity: 0.5 }}
                      dropdownTextStyle={styles.dropdownText}
                      textStyle={styles.dropdownText}
                      style={styles.dropdownContainer}
                      dropdownStyle={styles.dropdown}
                      onSelect={(index, value) =>
                        formik.setFieldValue("claimCity", value)
                      }
                      defaultValue={"City"}
                      renderRightComponent={() => {
                        return <DropDownOpen />
                      }}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <Error message={formik.errors.city} />
                    )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Email"
                      onChangeText={formik.handleChange("claimEmail")}
                      onBlur={formik.handleBlur("claimEmail")}
                      value={formik.values.claimEmail}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.claimEmail && formik.errors.claimEmail && (
                      <Error message={formik.errors.claimEmail} />
                    )}
                    <ModalDropdown
                      options={states}
                      defaultTextStyle={{ color: "#8F8D86", opacity: 0.5 }}
                      dropdownTextStyle={styles.dropdownText}
                      textStyle={styles.dropdownText}
                      style={styles.dropdownContainer}
                      dropdownStyle={styles.dropdown}
                      onSelect={(index, value) =>
                        formik.setFieldValue("claimState", value)
                      }
                      defaultValue={"State"}
                      renderRightComponent={() => {
                        return <DropDownOpen />
                      }}
                    />
                    {formik.touched.claimState && formik.errors.claimState && (
                      <Error message={formik.errors.claimState} />
                    )}
                    <ModalDropdown
                      options={gender}
                      defaultTextStyle={{ color: "#8F8D86", opacity: 0.5 }}
                      dropdownTextStyle={styles.dropdownText}
                      textStyle={styles.dropdownText}
                      style={styles.dropdownContainer}
                      dropdownStyle={styles.dropdown}
                      onSelect={(index, value) =>
                        formik.setFieldValue("claimGender", value)
                      }
                      defaultValue={"Gender"}
                      renderRightComponent={() => {
                        return <DropDownOpen />
                      }}
                    />

                    {formik.touched.state && formik.errors.state && (
                      <Error message={formik.errors.state} />
                    )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Address"
                      onChangeText={formik.handleChange("claimAddress")}
                      onBlur={formik.handleBlur("claimAddress")}
                      value={formik.values.phoneNumber}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.claimAddress &&
                      formik.errors.claimAddress && (
                        <Error message={formik.errors.claimAddress} />
                      )}
                    <ModalDropdown
                      options={cities}
                      defaultTextStyle={{ color: "#8F8D86", opacity: 0.5 }}
                      dropdownTextStyle={styles.dropdownText}
                      textStyle={styles.dropdownText}
                      style={styles.dropdownContainer}
                      dropdownStyle={styles.dropdown}
                      onSelect={(index, value) =>
                        formik.setFieldValue("claimCountry", value)
                      }
                      defaultValue={"Country"}
                      renderRightComponent={() => {
                        return <DropDownOpen />
                      }}
                    />

                    {formik.touched.claimCountry &&
                      formik.errors.claimCountry && (
                        <Error message={formik.errors.claimCountry} />
                      )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Zip Code"
                      onChangeText={formik.handleChange("claimZipCode")}
                      onBlur={formik.handleBlur("claimZipCode")}
                      value={formik.values.claimZipCode}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.claimZipCode &&
                      formik.errors.claimZipCode && (
                        <Error message={formik.errors.claimZipCode} />
                      )}
                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Last Name"
                      onChangeText={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      value={formik.values.lastName}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <Error message={formik.errors.lastName} />
                    )}

                    <CustomTextInput
                      style={styles.input}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="First Name"
                      onChangeText={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      value={formik.values.firstName}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <Error message={formik.errors.firstName} />
                    )}
                    {/* <DatePicker
                      modal
                      placeholder="Select Date"
                      showIcon={true}
                      format="DD-MM-YYYY"
                      mode="date"
                    /> */}
                  </>
                )}
              </View>
              <View style={styles.bottomContainer}>
                <Button
                  //   loading={isLoading}
                  style={styles.createButton}
                  // disabled={!(formik.isValid && formik.dirty && !isLoading)}
                  onPress={formik.handleSubmit}
                >
                  {"Submit".toUpperCase()}
                </Button>
              </View>
            </>
          )
        }}
      </Formik>
    </ScrollView>
  )
}
export default InsuranceSubmit
