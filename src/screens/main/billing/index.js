/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native"
import BackIcon from "../../../assets/icons/back.svg"
import AddBillingIcon from "../../../assets/icons/add.svg"
import PaymentCardBackgroud from "../../../assets/icons/payment_card_backgroud.svg"
import styles from "./style"
import { Button, VerticalSpacing } from "../../../components"
import Header from "../../../components/Header"
import { Calendar } from "react-native-calendars"
import { getUserCards } from "../../../api/main/Payment"

const AppointedTime = ({ time }) => (
  <View style={styles.appointmentContainer}>
    <Text style={styles.appointment}>{time}</Text>
  </View>
)

const Card = ({last4Digits, cardHolderName, expiry}) => (<TouchableOpacity
  // onPress={() => props.navigation.navigate("ProviderDescriptionBooked", {
  //   screen: "DashboardNav",
  //   previousScreen: "Payment"
  // })}
>
  <ImageBackground
    source={require("../../../assets/icons/payment-card.png")}
    resizeMode="stretch"
    style={styles.paymentCardBackground}
  >
    <Text style={styles.cardNumber}>
      **** **** ****{"   "}
      {last4Digits}
    </Text>
    <Text style={styles.cardDetails}>
      {cardHolderName.toUpperCase()}
      {"       "}
      {expiry}
    </Text>
    {/* <View style={styles.paymentCardBackgroundSvg}>
    <PaymentCardBackgroud />
  </View> */}
  </ImageBackground>
</TouchableOpacity>)

const BillingScreen = props => {
  const [userCards, setUserCards] = useState()
  useEffect(() => {
    getUserCards().then(res => setUserCards(res.data?.data))
  }, [])


  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <View style={{ height: 10, width: 1 }} />
      <Header
        title="CARDS"
        leftIcon={<BackIcon />}
        leftHandler={() => props.navigation.goBack()}
        rightIcon={<View />}
      />
      {
        userCards?.map((card, index) => {
          const cardExpiry = `${card.exp_month}/${card.exp_year%100}`
          return <Card  last4Digits={card.last4} cardHolderName={"stephen king"} expiry={cardExpiry} />
        })
      }
      <TouchableOpacity
        onPress={() => props.navigation.navigate("AddCardDetails")}
      >
        <Image
          source={require("../../../assets/icons/add-details-card.png")}
          resizeMode="stretch"
          style={styles.paymentCardBackground}
        />
      </TouchableOpacity>
      <VerticalSpacing height={100} />
    </ScrollView>
  )
}

export default BillingScreen
