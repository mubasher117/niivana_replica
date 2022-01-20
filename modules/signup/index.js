import React, { useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import logo from "../../assets/logo-small.png";
import { validateEmail } from "./screens/constants.js";
import { slice } from "./auth";
import { useSelector, useDispatch } from "react-redux";
import { buttonStyles, textInputStyles, Color } from "./screens/styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { signupRequest } from "./auth";
import { unwrapResult } from "@reduxjs/toolkit";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

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

const Signup = ({ navigation }) => {

  const [showDate, setShowDate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("client");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [dob, setDOB] = useState("");
  const [showDob, setShowDobDOB] = useState("");
  let [gender, setGender] = useState('0');
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { api } = useSelector((state) => state.Signup);
  const dispatch = useDispatch();

  const onSignupPress = async () => {
    setValidationError({ email: "", password: "" });
    if (!validateEmail.test(email))
      return setValidationError({
        email: "Please enter a valid email address.",
        password: "",
      });

    if (!name)
      return setValidationError({
        email: "",
        name: "Please enter a valid name",
        dob: "",
        password: "",
        gender: ""
      });
    if (!password)
      return setValidationError({
        email: "",
        name: "",
        dob: "",
        password: "Please enter a valid password",
        gender: ""
      });
    if (password !== confirmPassword)
      return setValidationError({
        email: "",
        name: "",
        dob: "",
        password: "Confirm password and password do not match.",
        gender: ""
      });

    if (group === 'business') {
      dob = moment(new Date()).format("YYYY-MM-DD").toString();
      gender = '2';
    }

    if (!dob && group != "business")
      return setValidationError({
        email: "",
        name: "",
        password: "",
        dob: "Please enter a valid date of birth",
        gender: ""
      });
    if (!gender && group != "business")
      return setValidationError({
        email: "",
        name: "",
        password: "",
        dob: "",
        gender: "Please enter a valid date of gender",
      });
    dispatch(signupRequest({ name, email, password, gender, dob, group }))
      .then(unwrapResult)
      .then(() => {
        Alert.alert(
          "Signup Success",
          "Registration Successful. A confirmation will be sent to your e-mail address."
        );
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={logo}
      />
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 24, marginTop: 71, marginBottom: 20 }}>Sign up</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 14 }}>Sign up as a</Text>
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', marginStart: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {
            setGroup("client")
          }} style={{ backgroundColor: group === 'client' ? "#FFB800" : "transparent", width: 113, height: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: "black" }}>
            <Text>Client</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setGroup("business")
          }} style={{ backgroundColor: group === 'business' ? "#FFB800" : "transparent", width: 113, height: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: "black" }}>
            <Text>Business</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: '100%' }}>
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
            label="name"
            placeholder={group === 'business' ? "Business Name" : "Full Name"}
            onChangeText={(value) => setName(value)}
            value={name}
            error={validationError.name}
          />
          <TextInputField
            label="Password"
            placeholder="Set Password"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
            error={validationError.password}
          />
          <TextInputField
            label="Password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(value) => setConfirmPassword(value)}
            value={confirmPassword}
          />

          {group === 'client' && <TouchableOpacity onPress={() => { setShowDate(true) }} activeOpacity={.9}>
            <TextInputField
              label="dob"
              editable={false}
              placeholder="Date of birth"
              onChangeText={(value) => setDOB(value)}
              value={showDob}
              error={validationError.dob}
            />
          </TouchableOpacity>
          }
          {group === 'client' && <View
            style={{ height: 50, borderWidth: 1.5, borderColor: "#767676", borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <RNPickerSelect
              value={gender}
              onValueChange={(value) => {
                setGender(value)
              }}
              placeholder="Gender"
              items={[
                {
                  value: '0',
                  label: 'Male'
                }, {
                  value: '1',
                  label: 'Female'
                }
              ]} />
          </View>
          }
        </View>
        <Button
          title="Sign up"
          loading={api.loading === "pending"}
          onPress={onSignupPress}
        />
        {!!api.error && (
          <Text style={textInputStyles.error}>{api.error.message}</Text>
        )}

      </View>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDate(false);
            setShowDobDOB(moment(new Date(selectedDate)).format("MM/DD/YYYY").toString());
            setDOB(moment(new Date(selectedDate)).format("YYYY-MM-DD").toString());

          }}
        />
      )}
      <View
        style={{
          marginVertical: 20,
          flex: 1,
          justifyContent: 'flex-end'
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>{"You already have an account?\t\t"}<Text style={{ fontWeight: 'bold' }}>Log in</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
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
  title: "Signup",
  navigator: Signup,
  slice: slice
}
