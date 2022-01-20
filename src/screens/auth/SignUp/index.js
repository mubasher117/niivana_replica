import { Formik } from "formik"
import React, { useState } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
  Modal,
  StyleSheet,
  Pressable
} from "react-native"
import styles from "./style"
import CustomTextInput from "../../../components/CustomTextInput"
import { Button, CustomDropDown } from "../../../components"
import Error from "../../../components/Error"
import * as Yup from "yup"
import { BaseColor } from "../../../config"
import { signUp } from "../../../api/auth/Auth"
import ModalDropdown from "react-native-modal-dropdown"
import UserIcon from "../../../assets/icons/user.svg"
import LockIcon from "../../../assets/icons/lock.svg"
import MailIcon from "../../../assets/icons/mail.svg"
import HomeIcon from "../../../assets/icons/home.svg"
import EyeIcon from "../../../assets/icons/eye.svg"
import CakeIcon from "../../../assets/icons/cake.svg"
import Ticket from "../../../assets/icons/ticket.svg"
import { getWidthPercentage } from "../../../util/helpers"
import { planChecks } from "../../../util/data"
import { PlanCheck } from "../../main/billing/Membership"
const hearAboutUsOptions = ["Social Media", "Friend", "Email", "TV", "Other"]
const hearAboutUsOptionsDefault = "How did you hear abou us?"
export default props => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true)
  const [hearAboutUs, setHearAboutUs] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const _handleSignUp = payload => {
    setIsLoading(true)
    console.log("PAYLOAD")
    console.log(payload)
    payload = {
      ...payload,
      name: payload.first_name + " " + payload.last_name,
      phone: "",
      group: "default",
      hear_about_us: hearAboutUs
    }
    signUp(payload)
      .then(function (response) {
        setIsLoading(false)
        console.log(JSON.stringify(response.data))
        setModalVisible(true)
        // props.navigation.navigate("DashboardNav")
      })
      .catch(function (error) {
        setIsLoading(false)
        console.log(error.response.data)
        try {
          alert(error.response.data?.email[0])
        } catch (error) {
          alert("Internal Error Occurred")
        }
      })
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Become a Member!</Text>
            <Text style={styles.modalSubText}>Here's what you'll get...</Text>
            <View style={styles.modalPlanChecksContainer}>
              {planChecks.map((check, index) => (
                <PlanCheck key={index} text={check} />
              ))}
            </View>
            <View style={styles.modalButtonsContainer}>
              <Button
                style={[
                  styles.modalButton,
                  { backgroundColor: "white", borderBottomLeftRadius: 16 }
                ]}
                styleText={styles.modalButtonText}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  props.navigation.navigate("DashboardTab")
                }}
              >
                Not Now
              </Button>
              <Button
                style={[
                  styles.modalButton,
                  {
                    borderBottomRightRadius: 16
                  }
                ]}
                styleText={styles.modalButtonText}
                onPress={() => {
                  setModalVisible(false)
                  props.navigation.navigate("MainNav", { screen: "Membership" })
                }}
              >
                Pricing
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
        // style={styles.root} contentContainerStyle={styles.container}
        >
          <Formik
            onSubmit={values => _handleSignUp(values)}
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              first_name: "",
              last_name: "",
              age: "",
              location: "",
              refferal_code: ""
            }}
            // validationSchema={validationSchema}
          >
            {formik => {
              return (
                <View
                  style={[
                    styles.container,
                    {
                      opacity: modalVisible ? 0.2 : 1
                    }
                  ]}
                >
                  <Text style={styles.title}>Sign Up</Text>
                  <CustomTextInput
                    style={styles.input}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    placeholder="First Name"
                    onChangeText={formik.handleChange("first_name")}
                    onBlur={formik.handleBlur("first_name")}
                    value={formik.values.first_name}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    selectionColor={BaseColor.grayColor}
                    icon={<UserIcon />}
                  />

                  {formik.touched.first_name && formik.errors.first_name && (
                    <Error message={formik.errors.first_name} />
                  )}
                  <View style={styles.multipleFieldsContainer}>
                    <CustomTextInput
                      style={[
                        styles.input,
                        { width: "62%", marginRight: "3%" }
                      ]}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Last Name"
                      onChangeText={formik.handleChange("last_name")}
                      onBlur={formik.handleBlur("last_name")}
                      value={formik.values.last_name}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                      icon={<UserIcon />}
                    />

                    <CustomTextInput
                      style={[styles.input, { width: "35%" }]}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      placeholder="Age"
                      onChangeText={formik.handleChange("age")}
                      onBlur={formik.handleBlur("age")}
                      value={formik.values.age}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      selectionColor={BaseColor.grayColor}
                      icon={<CakeIcon />}
                    />
                  </View>

                  <CustomTextInput
                    style={styles.input}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    placeholder="Your location"
                    onChangeText={formik.handleChange("location")}
                    onBlur={formik.handleBlur("location")}
                    value={formik.values.location}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    selectionColor={BaseColor.grayColor}
                    icon={<HomeIcon />}
                  />

                  <CustomTextInput
                    style={styles.input}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    placeholder="Email address"
                    onChangeText={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    selectionColor={BaseColor.grayColor}
                    icon={<MailIcon />}
                  />

                  <CustomTextInput
                    style={styles.input}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    placeholder="Password"
                    onChangeText={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    selectionColor={BaseColor.grayColor}
                    secureTextEntry={isPasswordSecure}
                    icon={<LockIcon />}
                    rightIcon={<EyeIcon />}
                  />

                  <CustomTextInput
                    style={styles.input}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    placeholder="Confirm password"
                    onChangeText={formik.handleChange("confirmPassword")}
                    onBlur={formik.handleBlur("confirmPassword")}
                    value={formik.values.confirmPassword}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    selectionColor={BaseColor.grayColor}
                    secureTextEntry={isConfirmPasswordSecure}
                    icon={<LockIcon />}
                    rightIcon={<EyeIcon />}
                  />

                  <CustomTextInput
                    style={styles.input}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    placeholder="Referral code"
                    onChangeText={formik.handleChange("refferal_code")}
                    onBlur={formik.handleBlur("refferal_code")}
                    value={formik.values.refferal_code}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    selectionColor={BaseColor.grayColor}
                    icon={<Ticket />}
                  />
                  <ModalDropdown
                    options={hearAboutUsOptions}
                    dropdownTextStyle={styles.dropdownText}
                    textStyle={styles.dropdownText}
                    style={styles.dropdownContainer}
                    dropdownStyle={styles.dropdown}
                    onSelect={(index, value) => setHearAboutUs(value)}
                    defaultValue={hearAboutUsOptionsDefault}
                  />
                  <Button
                    loading={isLoading}
                    style={styles.createButton}
                    // disabled={!(formik.isValid && formik.dirty && !isLoading)}
                    onPress={formik.handleSubmit}
                  >
                    CREATE ACCOUNT
                  </Button>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Text label semibold style={styles.loginText}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("SignIn")}
                    >
                      <Text label semibold style={styles.loginLink}>
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
