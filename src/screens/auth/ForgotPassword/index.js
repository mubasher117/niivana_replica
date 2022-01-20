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
  ScrollView
} from "react-native"
import styles from "./style"
import CustomTextInput from "../../../components/CustomTextInput"
import { Button, CustomDropDown, Header } from "../../../components"
import Error from "../../../components/Error"
import * as Yup from "yup"
import { BaseColor } from "../../../config"
import { SendOtp } from "../../../api/auth/Auth"
import ModalDropdown from "react-native-modal-dropdown"
import UserIcon from "../../../assets/icons/user.svg"
import LockIcon from "../../../assets/icons/lock.svg"
import MailIcon from "../../../assets/icons/mail.svg"
import BackIcon from "../../../assets/icons/back.svg"
import HomeIcon from "../../../assets/icons/home.svg"
import EyeIcon from "../../../assets/icons/eye.svg"
import CakeIcon from "../../../assets/icons/cake.svg"
import Ticket from "../../../assets/icons/ticket.svg"
import { storeData } from "../../../util/helpers"
const hearAboutUsOptions = ["Social Media", "Friend", "Email", "TV", "Other"]
const hearAboutUsOptionsDefault = "How did you hear abou us?"
const ForgotPassword = props => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true)
  const [hearAboutUs, setHearAboutUs] = useState()
  const _handleForgotPassword = payload => {
    console.log(payload)
    storeData("forgotPassEmail", payload.email)
    SendOtp(payload)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    props.navigation.navigate("OTP")
  }
  return (
    <KeyboardAvoidingView
      style={styles.root}
      contentContainerStyle={styles.root}
    >
      <Formik
        onSubmit={values => _handleForgotPassword(values)}
        initialValues={{
          email: ""
        }}
        // validationSchema={validationSchema}
      >
        {formik => {
          return (
            <ScrollView contentContainerStyle={styles.container}>
              <Header
                title=""
                leftIcon={<BackIcon />}
                rightIcon={<View />}
                leftHandler={() => props.navigation.goBack()}
              />
              <Text style={styles.title}>Forgot Password</Text>

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
              <Text style={styles.bottomText}>
                We will send a reset code to your email.
              </Text>

              <View style={styles.bottomContainer}>
                <Button
                  //   loading={isLoading}
                  style={styles.createButton}
                  // disabled={!(formik.isValid && formik.dirty && !isLoading)}
                  onPress={formik.handleSubmit}
                >
                  {"Send reset code".toUpperCase()}
                </Button>
              </View>
            </ScrollView>
          )
        }}
      </Formik>
    </KeyboardAvoidingView>
  )
}
export default ForgotPassword
