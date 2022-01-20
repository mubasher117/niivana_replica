/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import BackIcon from "../../../assets/icons/back.svg"
import styles from "./style"
import { Button } from "../../../components"
import Header from "../../../components/Header"
import { Calendar } from "react-native-calendars"
import { BaseColor } from "../../../config"
import { convertTime, convertTimeTo24H, retrieveData, storeData } from "../../../util/helpers"
import { getUserCards } from "../../../api/main/Payment"
import { useSelector, useDispatch } from "react-redux"

const AppointedTime = ({ time, isSelected, selectTime }) => {
  // const [isActive, setIsActive] = useState(isSelected)
  useEffect(() => {
    console.log("SELECTED")
    console.log(isSelected)
  }, [isSelected])
  return (
    <TouchableOpacity
      style={[
        styles.appointmentContainer,
        {
          backgroundColor: isSelected ? BaseColor.primaryColor : "#FAFAFA"
        }
      ]}
      onPress={() => selectTime(time)}
    >
      <Text
        style={[
          styles.appointment,
          {
            color: isSelected ? BaseColor.whiteColor : BaseColor.textGrey
          }
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  )
}

const defaultSelectedDates = {
  "2021-12-22": {
    selected: true,
    marked: false,
    selectedColor: "#DB8057",
    appointedTimes: [
      { time: "11:00", isSelected: false },
      { time: "11:30", isSelected: false },
      { time: "12:00", isSelected: false },
      { time: "14:30", isSelected: false },
      { time: "18:00", isSelected: false },
      { time: "18:30", isSelected: false }
    ]
  },
  "2021-12-23": {
    selected: true,
    marked: false,
    selectedColor: "#DB8057",
    appointedTimes: [
      { time: "11:00", isSelected: false },
      { time: "11:30", isSelected: false },
      { time: "12:00", isSelected: false },
      { time: "14:30", isSelected: false },
      { time: "18:00", isSelected: false },
      { time: "18:30", isSelected: false }
    ]
  },
  "2021-12-29": {
    selected: true,
    marked: false,
    selectedColor: "#DB8057",
    appointedTimes: [
      { time: "11:00", isSelected: false },
      { time: "11:30", isSelected: false },
      { time: "12:00", isSelected: false },
      { time: "14:30", isSelected: false },
      { time: "18:00", isSelected: false },
      { time: "18:30", isSelected: false }
    ]
  },

  "2022-01-18": {
    selected: true,
    marked: false,
    selectedColor: "#DB8057",
    appointedTimes: [
      { time: "11:00", isSelected: false },
      { time: "11:30", isSelected: false },
      { time: "12:00", isSelected: false },
      { time: "14:30", isSelected: false },
      { time: "18:00", isSelected: false },
      { time: "18:30", isSelected: false }
    ]
  },
  "2022-01-22": {
    selected: true,
    marked: false,
    selectedColor: "#DB8057",
    appointedTimes: [
      { time: "11:00", isSelected: false },
      { time: "11:30", isSelected: false },
      { time: "12:00", isSelected: false },
      { time: "14:30", isSelected: false },
      { time: "18:00", isSelected: false },
      { time: "18:30", isSelected: false }
    ]
  }
}

const daysOfWeek = {
  1: "Monday",
  2: "Tuesday"
}
const monthsShort = {
  1: "Jan",
  2: "Feb"
}

const CalendarScreen = props => {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState({})
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDates, setSelectedDates] = useState(defaultSelectedDates)

  const screensFlow = useSelector(state => state.nav.screensFlow)
  const previousScreen = useSelector(state => state.nav.previousScreen)
  const nextScreen = useSelector(state => state.nav.nextScreen)
  const dispatch = useDispatch()

  const _handleDateSelection = date => {
    console.log(date)
    var dayDate = new Date()
    dayDate.setTime(date.timestamp)
    let tempDate = {}
    tempDate[date.dateString] = {
      selected: true,
      marked: false,
      selectedColor: "#DB8057",
      dateString: date.dateString,
      presentableString: `${daysOfWeek[dayDate.getDay()]}, ${date.day} ${
        monthsShort[date.month]
      } ${date.year}`
    }
    console.log(tempDate)
    setSelectedDate(tempDate)
    // For multiple selection
    // if (selectedDates[date.dateString]) {
    //   const tempDates = { ...selectedDates }
    //   delete tempDates[date.dateString]
    //   setSelectedDates(tempDates)
    // } else {
    //   const tempDates = { ...selectedDates }
    //   tempDates[date.dateString] = {
    //     selected: true,
    //     marked: false,
    //     selectedColor: "#DB8057"
    //   }
    //   setSelectedDates(tempDates)
    // }
  }

  const _handleNavigation = () => {
    if (screensFlow === "calendar") {
      props.navigation.navigate("Provider")
    } else {
      getUserCards().then(res => {
        setLoading(false)
        if (res.data?.data && res.data.data.length === 0) {
          props.navigation.navigate("Billing")
        } else {
          props.navigation.navigate("Payment")
        }
      })
    }
  }
  const getMeetingTime = startTime => {
    let startTimeParsed = startTime.split(":")
    let startHour = parseInt(startTimeParsed[0])
    return `${startTime} - ${(startHour + 1) % 24}:${startTimeParsed[1]}`
  }
  const _handleScheduleAppointment = async () => {
    console.log(selectedTime)
    // setLoading(true)
    if (selectedDate && selectedTime) {
      const selectedDateVal = selectedDate[Object.keys(selectedDate)[0]]
      retrieveData("bookingData").then(async bookingData => {
        const convertedTime = convertTimeTo24H(selectedTime)
        console.log(convertedTime)
        bookingData.bookingTime = `${selectedDateVal?.dateString} ${convertedTime}`
        storeData("bookingData", bookingData),
          storeData("scheduledTime", {
            scheduledDate: selectedDateVal?.presentableString,
            scheduledTime: getMeetingTime(selectedTime)
          })
        setSelectedDates(defaultSelectedDates)
        await _handleNavigation()
      })
    } else {
    }
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header
        title="SELECT TIME"
        leftIcon={<BackIcon />}
        leftHandler={() => props.navigation.goBack()}
      />
      <View style={{ backgroundColor: "green" }}>
        <Calendar
          style={styles.calendar}
          theme={styles.calendarTheme}
          markedDates={selectedDate}
          onDayPress={date => {
            _handleDateSelection(date)
          }}
        />
      </View>
      <View style={styles.appointmentsContainer}>
        {selectedDate &&
          selectedDates[Object.keys(selectedDate)[0]]?.appointedTimes?.map(
            (item, index) => {
              return (
                <AppointedTime
                  time={convertTime(item.time)}
                  isSelected={
                    selectedTime === item.time
                    // && selectedDate === selectedDates[Object.keys(selectedDate)[0]]
                  }
                  selectTime={time => {
                    console.log("SELECTED TIME")
                    setSelectedTime(time)}}
                />
              )
            }
          )}
      </View>
      <Button
        loading={loading}
        style={styles.scheduleButton}
        onPress={_handleScheduleAppointment}
      >
        SCHEDULE APPOINTMENT
      </Button>
    </ScrollView>
  )
}

export default CalendarScreen
