import React, { useState } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator,Text, TouchableOpacity, TextInput,Alert } from "react-native"
import logo from "../../assets/logo-small.png";
import { slice } from "./auth";
import {  validateEmail } from "./screens/constants.js";
import { useSelector, useDispatch } from "react-redux";
import { buttonStyles, textInputStyles, Color } from "./screens/styles";
import { loginRequest } from "./auth";
import { unwrapResult } from "@reduxjs/toolkit";

const NEXT_SCREEN_NAME = "login"

// Custom Text Input
export const TextInputField = (props) => (
  <View>
    <TextInput
      autoCapitalize="none"
      style={[textInputStyles.textInput, props.textInputStyle]}
      placeholderTextColor={Color.steel}
      underlineColorAndroid={"transparent"}
      {...props}
    />
    {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
  </View>
);


// Custom Button
export const Button = (props) => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={[buttonStyles.viewStyle, props.viewStyle]}>
      {props.loading ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : Color.white}
          style={props.loadingStyle}
        />
      ) : (
        <Text style={[buttonStyles.textStyle, props.textStyle]}>
          {props.title}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const { api } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  const onSigninPress = async () => {
    if (!validateEmail.test(email))
      return setValidationError({
        email: "Please enter a valid email address.",
        password: "",
      });

    if (!password)
      return setValidationError({
        email: "",
        password: "Please enter a valid password",
      });

    dispatch(loginRequest({ username: email, password }))
      .then(unwrapResult)
      .then((res) => {
        if (res.token){
          if(res.user.groups[0].name === 'business'){
            navigation.navigate("MyTabsBusiness");
          }else{
            navigation.navigate("ConnectFirst");
          }
        }else{
          Alert.alert(
            "Login Error",
            "Error in login."
          );
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={logo}
      />
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 24, marginVertical: 71 }}>Log in</Text>
      </View>
      <KeyboardAvoidingView style={{ width: '100%' }}>
        <View style={{ marginVertical: 5 }}>
          <TextInputField
            keyboardType="email-address"
            label="Email address"
            placeholder="Email address"
            onChangeText={(value) => setEmail(value)}
            value={email}
            error={validationError.email}
          />
          <TextInputField
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
            error={validationError.password}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("ResetPassword");
            }}
          >
            <Text>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Log in"
          loading={api.loading === "pending"}
          onPress={onSigninPress}
        />
        {!!api.error && (
          <Text style={textInputStyles.error}>{api.error.message}</Text>
        )}

      </KeyboardAvoidingView>

      <View
        style={{
          marginBottom: 20,
          flex:1,
          justifyContent:'flex-end'
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text>{"You don't have an account?\t\t"}<Text style={{fontWeight:'bold'}}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: 'center',
    paddingVertical: 37,
    paddingHorizontal: 30
  },
  image: {
  }, textRow: {
    textAlign: "center",
    color: '#fff',
    fontSize: 22,
    fontFamily: "Roboto-Regular"
  },
})

export default {
  title: "Login",
  navigator: Login,
  slice: slice
}
