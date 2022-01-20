import React, { useState } from "react"
import { Dimensions, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import { Icon, Text, Error } from "../../../components"
import { BaseColor } from "../../../config"
import StringsOfLanguages from "../../../util/stringsOfLanguage"
import CustomTextInput from "../../CustomTextInput"
import styles from "./styles"
import * as Yup from "yup"
import { Formik } from "formik"

const meetingSchema = Yup.object().shape({
  meetingNumber: Yup.string().required("Please Enter Meeting Number"),
  meetingPassword: Yup.string()
})

const MeetingModal = ({ isVisible, closeModal, onEnter }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        alert("hi")
      }}
      style={styles.bottomModal}
    >
      <View style={styles.meetingModalBackground}>
        <Formik
          onSubmit={values => {
            console.log(
              "🚀 ~ file: index.js ~ line 30 ~ MeetingModal ~ values",
              values
            )
            onEnter(values)
          }}
          initialValues={{
            meetingNumber: "95463675217",
            meetingPassword: "iyuywiQ17"
          }}
          validationSchema={meetingSchema}
        >
          {formik => {
            return (
              <View style={styles.meetingModalWrapper}>
                <View style={styles.meetingTextInput}>
                  <Text body1>Meeting Number</Text>
                  <CustomTextInput
                    placeholder="Enter Meeting Number"
                    inputStyle={{ paddingLeft: 10, minWidth: "95%" }}
                    style={{ marginTop: 10 }}
                    onChangeText={formik.handleChange("meetingNumber")}
                    onBlur={formik.handleBlur("meetingNumber")}
                    value={formik.values.meetingNumber}
                  />
                  {formik.touched.meetingNumber &&
                    formik.errors.meetingNumber && (
                      <Error message={formik.errors.meetingNumber} />
                    )}
                </View>
                <View style={styles.meetingTextInput}>
                  <Text body1>Meeting Password</Text>
                  <CustomTextInput
                    placeholder="Enter Meeting Password"
                    inputStyle={{
                      paddingLeft: 10,
                      minWidth: "95%"
                    }}
                    style={{ marginTop: 10 }}
                    onChangeText={formik.handleChange("meetingPassword")}
                    onBlur={formik.handleBlur("meetingPassword")}
                    value={formik.values.meetingPassword}
                  />
                </View>
                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={formik.handleSubmit}>
                    <Text body1 style={{ color: BaseColor.primaryColor }}>
                      Join Meeting
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeModal}>
                    <Text body1 grayColor style={{ marginHorizontal: 10 }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        </Formik>
      </View>
    </Modal>
  )
}

export default MeetingModal
