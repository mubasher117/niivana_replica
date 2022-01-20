/* eslint-disable prettier/prettier */
import React, { createElement, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import BackIcon from "../../../../assets/icons/back.svg"
import AddBillingIcon from "../../../../assets/icons/add.svg"
import PaymentCardBackgroud from "../../../../assets/icons/payment_card_backgroud.svg"
import styles from "./style"
import { Button, CustomTextInput, Error } from "../../../../components"
import Header from "../../../../components/Header"
import { Calendar } from "react-native-calendars"
import ModalDropdown from "react-native-modal-dropdown"
import { BaseColor } from "../../../../config"
import { Formik } from "formik"
import OptionsColoured from "../../../../assets/icons/options-coloured.svg"
import DownloadPdf from "../../../../assets/icons/Download.svg"
import DownloadPdfActive from "../../../../assets/icons/DownloadActive.svg"
import MenuEye from "../../../../assets/icons/Eye_On.svg"
import MenuEyeActive from "../../../../assets/icons/Eye_On_Active.svg"
import LockIcon from "../../../../assets/icons/lock.svg"
import MailIcon from "../../../../assets/icons/mail.svg"
import HomeIcon from "../../../../assets/icons/home.svg"
import EyeIcon from "../../../../assets/icons/eye.svg"
import CakeIcon from "../../../../assets/icons/cake.svg"
import Ticket from "../../../../assets/icons/ticket.svg"
import CalendarIcon from "../../../../assets/icons/calendar-filled.svg"
import CardIcon from "../../../../assets/icons/card-filled.svg"
import { countries } from "../../../../config/data"
import { paymentHistory, menuItems } from "../../../../util/data"

const OptionsMenuRow = ({title, icon, activeIcon, rowNumber, isActive, setActiveRow,}) => <TouchableOpacity onPress={() => setActiveRow(rowNumber)}>
<View
  style={[
    styles.menuRow,
    // {
    //   backgroundColor:
    //   isActive ? "rgba(219, 128, 87, 0.05)" : "white"
    // }
  ]}
>
  <View style={styles.menuRowIconContainer}>
    {isActive ?  createElement(activeIcon, {}) :  createElement(icon, {})}
  </View>
  <Text
    style={[
      styles.menuRowLabel,
      {
        color:
        isActive ? BaseColor.primaryColor : BaseColor.textDark
      }
    ]}
  >
    {title}
  </Text>
</View>
</TouchableOpacity>
const OptionsMenu = props => {
  const [activeRow, setActiveRow] = useState(-1)
  return (
    <View style={styles.menuContainer}>
      
      {menuItems.map((item, index) => {
        return <OptionsMenuRow title={item.title} rowNumber={index} isActive={activeRow === index ? true : false}
        setActiveRow={setActiveRow} icon={item.icon} activeIcon={item.iconActive}/>
      })}
    </View>
  )
}

const PaymentHistoryCard = ({ purpose, title, date, price, isShowOptionMenu }) => {
  const [isShowOption, setIsShowOption] = useState(isShowOptionMenu)
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardLabel}>{purpose}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View>
        <Text style={styles.cardLabel}>{date}</Text>
        <Text style={styles.cardPrice}>{price}</Text>
      </View>
      <TouchableOpacity onPress={() => setIsShowOption(isShow => !isShow)}>
        <OptionsColoured />
      </TouchableOpacity>
      {isShowOption && (
        <View style={styles.optionsMenuContainer}>
          <OptionsMenu />
        </View>
      )}
    </View>
  )
}

const PaymentHistoryScreen = props => {
  const [selectedCountry, setSelectedCountry] = useState("Select Country")
  return (
    <KeyboardAvoidingView contentContainerStyle={styles.rootContentContainer}>
      <Formik
        onSubmit={values => console.log(values)}
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
            <ScrollView
              style={styles.root}
              contentContainerStyle={styles.rootContentContainer}
            >
              <View style={{ height: 10, width: 1 }} />
              <Header
                title={"payment history".toUpperCase()}
                leftIcon={<BackIcon />}
                leftHandler={() => props.navigation.goBack()}
                rightIcon={<View />}
              />
              <View style={{ height: 40, width: 1 }} />
              <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Description</Text>
                <Text style={styles.headerLabel}>Date {"&"} Total</Text>
              </View>

              {paymentHistory.map((card, index) => {
                return (
                  <View
                    style={[
                      styles.paymentHistoryCardContainer,
                      { zIndex: index * -1 }
                    ]}
                  >
                    <PaymentHistoryCard
                      purpose={card.purpose}
                      title={card.title}
                      date={card.date}
                      price={card.price}
                      isShowOptionMenu={false}
                    />
                  </View>
                )
              })}
            </ScrollView>
          )
        }}
      </Formik>
    </KeyboardAvoidingView>
  )
}

export default PaymentHistoryScreen
