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
  Image,
  Platform
} from "react-native"
import styles from "./style"
import CustomTextInput from "../../../components/CustomTextInput"
import { Button, MeetingModal } from "../../../components"
import Error from "../../../components/Error"
import * as Yup from "yup"
import { BaseColor } from "../../../config"
import Mail from "../../../assets/icons/mail.svg"
import Apple from "../../../assets/icons/apple.svg"
import Google from "../../../assets/icons/google.svg"
import Lock from "../../../assets/icons/lock.svg"
import Eye from "../../../assets/icons/eye.svg"
import { SignIn } from "../../../api/auth/Auth"
import { storeData } from "../../../util/helpers"
import Loader from "../../../components/LoaderScreen"

export default props => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const _handleSignIn = payload => {
    setIsLoading(true)
    // console.log(payload)
    const apiInput = {
      username: payload.email,
      password: payload.password
    }
    SignIn(apiInput)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        // alert("User signed in successfully.")
        storeData("userData", response.data)
        setIsLoading(false)
        props.navigation.navigate("Drawer")
      })
      .catch(function (error) {
        setIsLoading(false)
        console.log(error)
        try {
          alert(error.response.data?.non_field_errors[0])
        } catch (error) {
          alert("Internal Error Occurred")
        }
      })
  }
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.root}
          contentContainerStyle={styles.container}
        >
          <Formik
            onSubmit={values => {
              console.log(values)
              _handleSignIn(values)
            }}
            initialValues={{
              email: "",
              password: ""
            }}
            // validationSchema={validationSchema}
          >
            {formik => {
              return (
                <>
                  <Text style={styles.title}>Sign In</Text>
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
                    icon={<Mail />}
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
                    icon={<Lock />}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() =>
                          setIsPasswordSecure(isPassSecure => !isPassSecure)
                        }
                      >
                        <Eye />
                      </TouchableOpacity>
                    }
                  />

                  <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("ForgotPassword")
                      }
                    >
                      <Text style={styles.forgotPassword}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Button
                    loading={isLoading}
                    style={styles.createButton}
                    // disabled={!(formik.isValid && formik.dirty && !isLoading)}
                    onPress={formik.handleSubmit}
                  >
                    Sign In
                  </Button>
                </>
              )
            }}
          </Formik>
          <View style={styles.bottomContainer}>
            <View style={styles.orContainer}>
              <View style={styles.orHorizontal}></View>
              <Text style={styles.or}>or</Text>
              <View style={styles.orHorizontal}></View>
            </View>

            <View style={styles.socialButtonsContainer}>
              <View style={styles.socialButtonContainer}>
                <Image
                  source={require("../../../assets/icons/facebook.png")}
                  style={styles.socialButton}
                />
              </View>
              <View
                style={[
                  styles.socialButtonContainer,
                  styles.socialButtonCenterContainer
                ]}
              >
                <Google />
              </View>
              <View style={styles.socialButtonContainer}>
                <Apple />
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text label semibold style={styles.loginText}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SignUp")}
              >
                <Text label semibold style={styles.loginLink}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
