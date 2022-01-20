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
  BackHandler
} from "react-native"
import SearchIcon from "../../../../assets/icons/search.svg"
import FilterIcon from "../../../../assets/icons/filter.svg"
import OnlineBadge from "../../../../assets/icons/online-badge.svg"
import StarIcon from "../../../../assets/icons/star.svg"
import DownIcon from "../../../../assets/icons/down-orange.svg"
import ArticlesAndVideos from "../../../../assets/icons/articles_and_videos.svg"
import LiveGroups from "../../../../assets/icons/live_groups.svg"
import Classes from "../../../../assets/icons/classes.svg"
import Forum from "../../../../assets/icons/forum.svg"
import ClockColouredIcon from "../../../../assets/icons/clock-coloured.svg"
import OptionsHorizontalIcon from "../../../../assets/icons/options-horizontal.svg"
import CalendarIcon from "../../../../assets/icons/Calendar.svg"
import BackIcon from "../../../../assets/icons/back.svg"
import styles from "./style"
import { Button, Searchbar } from "../../../../components"
import Header from "../../../../components/Header"
import EventsCard from "../../../../components/Card"
import {
  getFeedbackProvider,
  getProviderDetails
} from "../../../../api/main/Provider"
import { retrieveData } from "../../../../util/helpers"

const specializations = ["Toddler Care", "Lactation", "Pregnancy"]
const ProviderDescriptionBooked = props => {
  const [providerData, setProviderData] = useState()
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [specializations, setSpecializations] = useState()
  const [feedback, setFeedback] = useState()
  const [avgRating, setAvgRating] = useState(0)
  useEffect(() => {
    retrieveData("providerDetails").then(data => {
      setProviderData(data)
      console.log("providerDetails:     ", data)
      setSpecializations(data?.provider?.specialization?.split(","))
      getFeedbackProvider(data.provider?.id).then(res => {
        setFeedback(res.data)
        setAvgRating(getAvgRating(res?.data?.response))
      })
    })
    retrieveData("scheduledTime").then(data => {
      setMeetingDate(data?.scheduledDate)
      setMeetingTime(data?.scheduledTime)
    })
  }, [])

  const getAvgRating = reviews => {
    let ratingSum = 0
    reviews?.forEach(review => {
      ratingSum = ratingSum + review?.ratings
    })
    return ratingSum / reviews?.length
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header
        title=""
        leftIcon={<BackIcon />}
        leftHandler={() => props.navigation.goBack()}
      />
      <Image
        source={{
          uri: providerData?.provider?.profile_picture,
        }}
        style={styles.image}
      />
      <Text style={styles.providerName}>{providerData?.provider?.name}</Text>
      <Text style={styles.providerText}>{providerData?.provider?.location}</Text>

      <Text style={styles.nextMeetingText}>Next Meeting</Text>
      <View style={styles.meetingContainer}>
        <CalendarIcon />
        <View style={styles.meetingScheduleContainer}>
          <Text style={styles.meetingDate}>{meetingDate}</Text>
          <Text style={styles.meetingDuration}>{meetingTime}</Text>
          <TouchableOpacity>
            <Text style={styles.addToCalendarButton}>Add to calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: 300, height: 5 }} />
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.aboutMe}>
      {providerData?.provider?.about}
      </Text>

      <View style={{ width: 300, height: 30 }} />
      <Button
        style={styles.dualBottomButton}
        onPress={() => props.navigation.navigate("QuestionForm")}
      >
        {"previsit questions".toUpperCase()}
      </Button>
      <Button
        style={styles.dualBottomButton}
        onPress={() => {
          props.navigation.navigate("Zoom", {
            meetingInfo: {
              meetingNumber: 93212958172,
              meetingPassword: "jsmifawa",
              userName: "Qaim CB",
              userEmail: "qaim.ali@crowdbotics.com",
              role: 0
            }
          })
        }}
      >
        {"join call".toUpperCase()}
      </Button>

      <View style={{ width: 300, height: 100 }} />
    </ScrollView>
  )
}

export default ProviderDescriptionBooked
