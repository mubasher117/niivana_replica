/* eslint-disable prettier/prettier */
import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Platform,
  Alert
} from "react-native"
import SearchIcon from "../../../assets/icons/search.svg"
import FilterIcon from "../../../assets/icons/filter.svg"
import ArticlesAndVideos from "../../../assets/icons/articles_and_videos.svg"
import LiveGroups from "../../../assets/icons/live_groups.svg"
import Classes from "../../../assets/icons/classes.svg"
import Forum from "../../../assets/icons/forum.svg"
import ClockColouredIcon from "../../../assets/icons/clock-coloured.svg"
import BackIcon from "../../../assets/icons/back.svg"
import CvcCard from "../../../assets/icons/cvcCard.svg"
import CalendarIcon from "../../../assets/icons/Calendar.svg"
import JoinIcon from "../../../assets/icons/Join.svg"
import VideoCardIcon from "../../../assets/images/video-card.svg"
import ApplePay from "../../../assets/icons/apple-pay.svg"
import styles from "./style"
import { Button, CustomTextInput } from "../../../components"
import Header from "../../../components/Header"
import EventsCard from "../../../components/Card"
import { Calendar } from "react-native-calendars"
import Visa from "../../../assets/icons/Visa.svg"
import MasterCard from "../../../assets/icons/Mastercard.svg"
import AmericanExpress from "../../../assets/icons/American Express.svg"
import Discover from "../../../assets/icons/Discover.svg"
import PoweredBy from "../../../assets/icons/powered-by.svg"
import ModalCheck from "../../../assets/icons/modal-check.svg"
import { retrieveData, storeData } from "../../../util/helpers"
import ModalDropdown from "react-native-modal-dropdown"
import { countries } from "../../../config/data"
import {
  createCard,
  getStripeToken,
  makePayment
} from "../../../api/main/Payment"
import CustomModal from "../../../components/CustomModal"

const PaymentInput = ({ cards, onChangeText, value }) => (
  <CustomTextInput
    placeholder={cards && "1234 1234 1234 1234"}
    placeholderTextColor={styles.duration.color}
    style={[
      styles.input,
      {
        borderBottomLeftRadius: cards ? 0 : 16,
        borderBottomRightRadius: cards ? 0 : 16
      }
    ]}
    inputStyle={[
      styles.inputText,
      {
        width: cards ? "68%" : "95%",
        borderBottomLeftRadius: cards ? 0 : 16,
        borderBottomRightRadius: cards ? 0 : 16
      }
    ]}
    autoCorrect={false}
    // onChangeText={formik.handleChange("password")}
    // onBlur={formik.handleBlur("password")}
    // value={formik.values.password}
    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
    rightIcon={
      cards && (
        <View style={styles.cards}>
          <Visa />
          <MasterCard />
          <AmericanExpress />
          <Discover />
        </View>
      )
    }
    onChangeText={onChangeText}
    value={value}
  />
)

const CallPayment = ({ isScheduled, price }) => {
  console.log(isScheduled)
  return (
    <>
      <>
        <Image
          source={require("../../../assets/images/dp.png")}
          style={styles.image}
        />
        <Text style={styles.providerName}>Dr. Jacob Jones</Text>
      </>
      {/* {isScheduled ? (
      <>
        <Image
          source={require("../../../assets/images/dp.png")}
          style={styles.image}
        />
        <Text style={styles.providerName}>Dr. Jacob Jones</Text>
      </>
    ) : (
      <Text style={styles.title}>URGENT CALL</Text>
    )} */}
      <Text style={styles.duration}>1 hour session</Text>
      <Text style={styles.price}>{price}</Text>
    </>
  )
}
const PremiumPayment = ({ period, amount, currency }) => (
  <>
    <Text style={styles.titlePremium}>Premium Plan</Text>
    <Text style={styles.period}>{period}</Text>
    <Text style={styles.amount}>
      {currency}
      {amount}
    </Text>
  </>
)
const Payment = props => {
  const [selectedCountry, setSelectedCountry] = useState("Select Country")
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [amountPayable, setAmountPayable] = useState()

  const _handlePayment = async values => {
    // let userData = await retrieveData("userData");
    // userData.token = "6992d0cb66fcd0139234774764b7ed70ef93f5e0"
    // storeData("userData", userData)
    setIsLoading(true)
    retrieveData("bookingData").then(bookingData => {
      console.log(bookingData)
      console.log(makePayment)
      makePayment(
        250,
        bookingData?.providerId,
        bookingData?.bookingTime,
        bookingData?.bookingHelp
      )
        .then(res => {
          console.log(res.data)
          storeData("meetingInfo", res.data)
          setIsLoading(false)
          setIsModalVisible(true)
        })
        .catch(err => {
          Alert.alert("Internal Error")
          console.log("Error in payment: ", err.message)
          setIsLoading(false)

          setIsModalVisible(true)
        })
    })

    // .then(response => response.json().then(res => {console.log(res);
    //   setIsLoading(false)
    // }))
    // .catch(err => {
    //   alert("Internal Error")
    //   console.log(err)
    //   setIsLoading(false)
    // })
  }
  const _handlePayableAmount = () => {
    retrieveData("amountPayable").then(amount => setAmountPayable(amount))
  }
  useEffect(() => {
    _handlePayableAmount()
    const unsubscribe = props.navigation.addListener("focus", () => {
      console.log("FOCUSED")
      _handlePayableAmount()
    })
    return unsubscribe
  }, [props.navigation])
  return (
    <View style={styles.centeredView}>
      <CustomModal
        isVisible={isModalVisible}
        handleCancel={() => setIsModalVisible(false)}
      >
        <View style={{ width: 1, height: 30 }} />
        <ModalCheck />
        <Text style={styles.modalSuccessText}>Success</Text>
        <Text style={styles.modalSuccessMessage}>
          Your payment was accepted.
        </Text>
        <Button
          style={styles.modalButton}
          styleText={styles.modalButtonText}
          onPress={async () => {
            await setIsModalVisible(false)
            props.navigation.navigate("ProviderDescriptionBooked")
          }}
        >
          Done
        </Button>
      </CustomModal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={[
            styles.root,
            {
              opacity: isModalVisible ? 0.2 : 1
            }
          ]}
          contentContainerStyle={styles.rootContentContainer}
        >
          <Header
            leftIcon={<BackIcon />}
            leftHandler={() => props.navigation.goBack()}
            rightIcon={<View />}
          />
          {props?.route?.params?.previousScreen &&
          props?.route?.params?.previousScreen === "membership" ? (
            <PremiumPayment
              period={props?.route?.params?.period}
              amount={props?.route?.params?.amount}
              currency={props?.route?.params?.currency}
            />
          ) : (
            <CallPayment
              isScheduled={props?.route?.params?.isScheduled}
              price={amountPayable}
            />
          )}

          <Button
            style={styles.scheduleButton}
            onPress={() => props.navigation.navigate("Dashboard")}
            icon={<ApplePay />}
          />
          <View style={styles.payWithCardContainer}>
            <View style={styles.payWithCardHorizontalBreak} />
            <Text style={styles.payWithCard}>Or pay with card</Text>
            <View style={styles.payWithCardHorizontalBreak} />
            <View />
          </View>

          <Formik
            onSubmit={values => _handlePayment(values)}
            initialValues={{
              name: "",
              email: "",
              cardNo: "",
              expiry: "",
              cvc: "",
              zip: "",
              promo: ""
            }}
          >
            {formik => {
              return (
                <>
                  <Text style={styles.paymentTitle}>Email</Text>
                  <PaymentInput
                    value={formik.values.email}
                    onChangeText={formik.handleChange("email")}
                  />
                  <Text style={styles.paymentTitle}>Country or region</Text>
                  <PaymentInput
                    cards
                    value={formik.values.cardNo}
                    onChangeText={formik.handleChange("cardNo")}
                  />
                  <View style={styles.multiInputContainer}>
                    <CustomTextInput
                      placeholder="MM / YY"
                      placeholderTextColor={styles.duration.color}
                      style={[
                        styles.input,
                        styles.inputMulti,
                        {
                          borderBottomRightRadius: 0
                        }
                      ]}
                      inputStyle={styles.inputText}
                      autoCorrect={false}
                      onChangeText={formik.handleChange("expiry")}
                      onBlur={formik.handleBlur("expiry")}
                      value={formik.values.expiry}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    />
                    <CustomTextInput
                      placeholder="CVC"
                      placeholderTextColor={styles.duration.color}
                      style={[
                        styles.input,
                        styles.inputMulti,
                        {
                          borderBottomLeftRadius: 0,
                          borderLeftWidth: 0
                        }
                      ]}
                      autoCorrect={false}
                      onChangeText={formik.handleChange("cvc")}
                      onBlur={formik.handleBlur("cvc")}
                      value={formik.values.cvc}
                      hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                      rightIcon={<CvcCard />}
                      inputStyle={styles.inputText}
                    />
                  </View>
                  <Text style={styles.paymentTitle}>Name on card</Text>
                  <PaymentInput
                    value={formik.values.name}
                    onChangeText={formik.handleChange("name")}
                  />
                  <Text style={styles.paymentTitle}>Country or region</Text>

                  <ModalDropdown
                    options={countries}
                    dropdownTextStyle={styles.dropdownText}
                    textStyle={styles.dropdownText}
                    style={styles.dropdownContainer}
                    dropdownStyle={styles.dropdown}
                    onSelect={(index, value) => setSelectedCountry(value)}
                    defaultValue={selectedCountry}
                  />

                  <CustomTextInput
                    placeholder="ZIP"
                    placeholderTextColor={styles.duration.color}
                    style={styles.zip}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    onChangeText={formik.handleChange("zip")}
                    onBlur={formik.handleBlur("zip")}
                    value={formik.values.zip}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                  />
                  <Text style={styles.paymentTitle}>Promo Code</Text>
                  <PaymentInput
                    value={formik.values.promo}
                    onChangeText={formik.handleChange("promo")}
                  />
                  {/* <ModalDropdown
                options={countries}
                dropdownTextStyle={styles.dropdownText}
                textStyle={styles.dropdownText}
                style={styles.dropdownContainer}
                dropdownStyle={styles.dropdown}
                onSelect={(index, value) => setSelectedCountry(value) }
                defaultValue={selectedCountry}
              /> */}
                  <Button
                    loading={isLoading}
                    style={styles.scheduleButton}
                    // disabled={!(formik.isValid && formik.dirty && !isLoading)}
                    onPress={formik.handleSubmit}
                  >
                    Pay $250.00
                  </Button>
                </>
              )
            }}
          </Formik>
          <View style={{ width: 1, height: 60 }} />
          <PoweredBy />
          <View style={{ width: 1, height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Payment
