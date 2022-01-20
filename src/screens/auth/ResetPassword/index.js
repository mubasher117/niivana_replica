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
import {UpdatePassword } from "../../../api/auth/Auth"
import ModalDropdown from "react-native-modal-dropdown"
import UserIcon from "../../../assets/icons/user.svg"
import LockIcon from "../../../assets/icons/lock.svg"
import MailIcon from "../../../assets/icons/mail.svg"
import BackIcon from "../../../assets/icons/back.svg"
import HomeIcon from "../../../assets/icons/home.svg"
import EyeIcon from "../../../assets/icons/eye.svg"
import CakeIcon from "../../../assets/icons/cake.svg"
import Ticket from "../../../assets/icons/ticket.svg"
import { retrieveData } from "../../../util/helpers"
const hearAboutUsOptions = ["Social Media", "Friend", "Email", "TV", "Other"]
const hearAboutUsOptionsDefault = "How did you hear abou us?"
const ResetPassword = props => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true)
  const [hearAboutUs, setHearAboutUs] = useState()
  const _handleResetPassword = payload => {
    retrieveData("forgotPassEmail")
      .then(forgotPassEmail =>
        retrieveData("forgotPassOtp").then(forgotPassOtp =>
          UpdatePassword({
            code: forgotPassOtp,
            email: forgotPassEmail,
            password: payload.password
          })
        )
      )
      .then(res => {
        props.navigation.navigate("Drawer")
      })
      .catch(err => alert(err))
  }
  return (
    <KeyboardAvoidingView
      style={styles.root}
      contentContainerStyle={styles.root}
    >
      <Formik
        onSubmit={values => _handleResetPassword(values)}
        initialValues={{
          password: "",
          confirmPassword: ""
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
              <Text style={styles.title}>Reset Password</Text>

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
                // rightIcon={<EyeIcon/>}
                rightIcon={
                  <TouchableOpacity
                    onPress={() =>
                      setIsPasswordSecure(isPassSecure => !isPassSecure)
                    }
                  >
                    <EyeIcon />
                  </TouchableOpacity>
                }
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
                rightIcon={
                  <TouchableOpacity
                    onPress={() =>
                      setIsConfirmPasswordSecure(isPassSecure => !isPassSecure)
                    }
                  >
                    <EyeIcon />
                  </TouchableOpacity>
                }
              />

              <View style={styles.bottomContainer}>
                <Button
                  //   loading={isLoading}
                  style={styles.createButton}
                  // disabled={!(formik.isValid && formik.dirty && !isLoading)}
                  onPress={formik.handleSubmit}
                >
                  {"Reset".toUpperCase()}
                </Button>
              </View>
            </ScrollView>
          )
        }}
      </Formik>
    </KeyboardAvoidingView>
  )
}
export default ResetPassword
