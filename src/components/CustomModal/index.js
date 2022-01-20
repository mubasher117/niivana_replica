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
import { Button } from ".."
import styles from "./styles"
const CustomModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.handleCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{props.children}</View>
      </View>
    </Modal>
  )
}

export default CustomModal
