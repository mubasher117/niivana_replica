import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import SearchIcon from "../../../../assets/icons/search.svg"
import FilterIcon from "../../../../assets/icons/filter.svg"
import StarIcon from "../../../../assets/icons/star.svg"
import OptionsHorizontalIcon from "../../../../assets/icons/options-horizontal.svg"
import styles from "./style"
import { Searchbar } from "../../../../components"
import Header from "../../../../components/Header"
import {
  getFeedbackProvider,
  getProviderDetails,
  getProviders
} from "../../../../api/main/Provider"
import { useSelector } from "react-redux"
import { retrieveData, storeData } from "../../../../util/helpers"

const providerCards = [
  {
    image: require("../../../../assets/images/provider-image-1.png"),
    name: "Jacob Jones",
    location: "Darlinghurst / New South Wales",
    time: "11am-19pm",
    days: "Sun,Mon,Thu",
    ratings: "5.0",
    reviews: "52"
  },
  {
    image: require("../../../../assets/images/provider-image-1.png"),
    name: "Jacob Jones",
    location: "Darlinghurst / New South Wales",
    time: "11am-19pm",
    days: "Sun,Mon,Thu",
    ratings: "5.0",
    reviews: "52"
  },
  {
    image: require("../../../../assets/images/provider-image-1.png"),
    name: "Jacob Jones",
    location: "Darlinghurst / New South Wales",
    time: "11am-19pm",
    days: "Sun,Mon,Thu",
    ratings: "5.0",
    reviews: "52"
  },
  {
    image: require("../../../../assets/images/provider-image-1.png"),
    name: "Jacob Jones",
    location: "Darlinghurst / New South Wales",
    time: "11am-19pm",
    days: "Sun,Mon,Thu",
    ratings: "5.0",
    reviews: "52"
  },
  {
    image: require("../../../../assets/images/provider-image-1.png"),
    name: "Jacob Jones",
    location: "Darlinghurst / New South Wales",
    time: "11am-19pm",
    days: "Sun,Mon,Thu",
    ratings: "5.0",
    reviews: "52"
  },
  {
    image: require("../../../../assets/images/provider-image-1.png"),
    name: "Jacob Jones",
    location: "Darlinghurst / New South Wales",
    time: "11am-19pm",
    days: "Sun,Mon,Thu",
    ratings: "5.0",
    reviews: "52"
  },
  {
    image: require("../../../../assets/images/provider-image-1.png"),
    name: "Jacob Jones",
    location: "Darlinghurst / New South Wales",
    time: "11am-19pm",
    days: "Sun,Mon,Thu",
    ratings: "5.0",
    reviews: "52"
  }
]

const ProviderCard = ({
  id,
  image,
  name,
  location,
  time,
  days,
  ratings,
  reviews,
  isOnline,
  handleButton
}) => {
  const [feedback, setFeedback] = useState()
  const [avgRating, setAvgRating] = useState(0)
  useEffect(() => {
    getFeedbackProvider(id).then(res => {
      setFeedback(res.data)
      setAvgRating(getAvgRating(res?.data?.response))
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
    <View style={styles.providerMain}>
      <Image source={{ uri: image }} style={styles.providerImage} />
      <View style={styles.onlineBadge}>
        <Text style={styles.onlineBadgeText}>Online</Text>
      </View>
      <View style={styles.providerRemaining}>
        <View style={styles.providerDescription}>
          <Text style={styles.providerName}>{name}</Text>
          <Text style={styles.providerText}>{location}</Text>
          <View style={styles.availableContainer}>
            <Text style={styles.providerText}>Available: </Text>
            <Text style={[styles.providerText, { fontWeight: "bold" }]}>
              {time}
            </Text>
          </View>
          <View style={styles.daysContainer}>
            <Text style={styles.providerText}>Days: </Text>
            <Text style={[styles.providerText, { fontWeight: "bold" }]}>
              {days}
            </Text>
          </View>

          <View style={styles.reviewContainer}>
            <View>
              <StarIcon />
            </View>
            <Text style={styles.ratings}>{avgRating}</Text>
            <Text style={styles.providerText}>
              ({feedback?.response?.length}{" "}
              {feedback?.response?.length === 1 ? "Review" : "Reviews"})
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleButton(id)}
          style={styles.providerButtonContainer}
        >
          <Text style={styles.providerButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const Provider = props => {
  const [providers, setProviders] = useState([])
  const bookingFlow = useSelector(state => state.nav.bookingFlow)
  useEffect(() => {
    getProviders().then(res => setProviders(res.data))
  }, [])
  const _handleViewProvider = (providerId, availabilityTime, availableDays) => {
    retrieveData("bookingData").then(bookingData => {
      bookingData.providerId = providerId
      storeData("bookingData", bookingData)
      getProviderDetails(providerId).then(res => {
        let providerData = res.data[0]
        providerData.availabilityTime = availabilityTime
        providerData.availableDays = availableDays
        storeData("providerDetails", providerData)
        props.navigation.navigate("MainNav", {
          screen: "ProviderDescription"
        })
      })
    })
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header title="DASHBOARD" />
      <Searchbar
        propStyles={styles.searchbar}
        leftIcon={<SearchIcon />}
        rightIcon={<FilterIcon />}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Our Providers</Text>
        <TouchableOpacity style={styles.optionsIcon}>
          <OptionsHorizontalIcon />
        </TouchableOpacity>
      </View>
      <View style={{ width: 300, height: 8 }} />
      {providers.map((provider, index) => {
        const availabilityStartTime = provider.start_time.slice(0, -3)
        const availabilityEndTime = provider.end_time.slice(0, -3)
        const availabilityTime = `${availabilityStartTime} - ${availabilityEndTime}`
        let availableDays = ""
        provider.monday ? (availableDays += "Mon,") : ""
        provider.tuesday ? (availableDays += "Tue,") : ""
        provider.wednesday ? (availableDays += "Wed,") : ""
        provider.thursday ? (availableDays += "Thu,") : ""
        provider.friday ? (availableDays += "Fri,") : ""
        provider.saturday ? (availableDays += "Sat,") : ""
        provider.sunday ? (availableDays += "Sun,") : ""
        availableDays = availableDays.slice(0, -1)
        return (
          <ProviderCard
            key={provider.id}
            id={provider.provider.id}
            image={provider.provider.profile_picture}
            name={provider.provider.name}
            location={provider.provider.location}
            time={availabilityTime}
            days={availableDays}
            ratings={provider.ratings}
            reviews={provider.reviews}
            handleButton={providerId =>
              _handleViewProvider(providerId, availabilityTime, availableDays)
            }
          />
        )
      })}
      <View style={{ width: 300, height: 70 }} />
    </ScrollView>
  )
}

export default Provider
