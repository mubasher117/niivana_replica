import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native"
import SearchIcon from "../../../assets/icons/search.svg"
import FilterIcon from "../../../assets/icons/filter.svg"
import ArticlesAndVideos from "../../../assets/icons/articles_and_videos.svg"
import LiveGroups from "../../../assets/icons/live_groups.svg"
import Classes from "../../../assets/icons/classes.svg"
import Forum from "../../../assets/icons/forum.svg"
import ClockColouredIcon from "../../../assets/icons/clock-coloured.svg"
import CalendarIcon from "../../../assets/icons/Calendar.svg"
import JoinIcon from "../../../assets/icons/Join.svg"
import VideoCardIcon from "../../../assets/images/video-card.svg"
import styles from "./style"
import { Searchbar } from "../../../components"
import Header from "../../../components/Header"
import EventsCard from "../../../components/Card"
import { clearStorage, PubnubUtils, retrieveData } from "../../../util/helpers"

const events = [
  {
    title: "Breastfeeding Drop-in Support Group Meeting",
    description:
      "Join this welcoming online breastfeeding group for sharing, connecting, and seeking guidance from an International Board Certified Lactation Consultant and other mothers",
    date: "Nov 26, 2021",
    time: "19:30",
    image: require("../../../assets/images/card_image.png")
  },
  {
    title: "Breastfeeding Drop-in Support Group Meeting",
    description:
      "Join this welcoming online breastfeeding group for sharing, connecting, and seeking guidance from an International Board Certified Lactation Consultant and other mothers",
    date: "Nov 26, 2021",
    time: "19:30",
    image: require("../../../assets/images/card_image.png")
  }
]

const classes = [
  {
    title: "How do I wean baby off breastfeeding",
    image: require("../../../assets/images/card-image.png")
  },
  {
    title: "How do I wean baby off breastfeeding",
    image: require("../../../assets/images/card-image.png")
  }
]

const calenderData = [
  {
    id: 2,
    day: "Mon",
    date: 2
    // isBooked: true,
    // events: {
    //   activeEvent: 0,
    //   data: [
    //     {
    //       title: "Lactation Consult",
    //       category: "Physical Health",
    //       duration: "15:00 - 16:00",
    //       isActive: true
    //     },
    //     {
    //       title: "Being Positive",
    //       category: "Mental Health",
    //       duration: "17:00 - 18:00",
    //       isActive: false
    //     },
    //     {
    //       title: "Talking with Baby",
    //       category: "Talking with Baby",
    //       duration: "19:00 - 21:00",
    //       isActive: false
    //     }
    //   ]
    // }
  },
  {
    id: 3,
    day: "Tue",
    date: 3,
    isBooked: true,
    events: {
      activeEvent: 2,
      data: [
        {
          id: 1,
          title: "Lactation Consult",
          category: "Physical Health",
          duration: "15:00 - 16:00",
          isActive: true
        },
        {
          id: 2,
          title: "Being Positive",
          category: "Mental Health",
          duration: "17:00 - 18:00",
          isActive: false
        },
        {
          id: 3,
          title: "Talking with Baby",
          category: "Talking with Baby",
          duration: "19:00 - 21:00",
          isActive: false
        }
      ]
    }
  },
  {
    id: 4,
    day: "Wed",
    date: 4
  },
  { day: "Thu", date: 5 },
  {
    id: 1,
    day: "Fri",
    date: 6,
    isBooked: true,
    events: {
      activeEvent: 3,
      data: [
        {
          id: 1,
          title: "Temp Event 1",
          category: "Physical Health",
          duration: "15:00 - 16:00",
          isActive: true
        },
        {
          id: 2,
          title: "Temp Event 2",
          category: "Mental Health",
          duration: "17:00 - 18:00",
          isActive: false
        },
        {
          id: 3,
          title: "Temp Event 3",
          category: "Talking with Baby",
          duration: "19:00 - 21:00",
          isActive: false
        }
      ]
    }
  },
  {
    id: 5,
    day: "Sat",
    date: 7
  },
  {
    id: 6,
    day: "Sun",
    date: 8
  },
  {
    id: 7,
    day: "Mon",
    date: 9
  }
]

const dateCards = [1, 2, 3]

const DateCard = ({ title, category, duration, isActive, setActiveEvent }) => {
  // const [isActive, setIsActive] = useState(isCurrentlyActive)
  return (
    <TouchableOpacity
      style={
        isActive
          ? [
              styles.dateCardContainer,
              { backgroundColor: styles.activeCardBackground.color }
            ]
          : styles.dateCardContainer
      }
      onPress={setActiveEvent}
    >
      <Text
        style={
          isActive
            ? [styles.dateCardTitle, { color: styles.activeCardText.color }]
            : styles.dateCardTitle
        }
      >
        {title}
      </Text>
      <Text
        style={
          isActive
            ? [styles.dateCardCategory, { color: styles.activeCardText.color }]
            : styles.dateCardCategory
        }
      >
        {category}
      </Text>
      <Text
        style={
          isActive
            ? [styles.dateCardDuration, { color: styles.activeCardText.color }]
            : styles.dateCardDuration
        }
      >
        {duration}
      </Text>
    </TouchableOpacity>
  )
}

const DateCardsContainer = ({ events, setActiveEvent }) => {
  console.log(events)
  useEffect(() => {
    console.log("EFFECTED")
  }, [events])
  // const setActiveEvent = eventId => {
  //   const eventIndex = events.findIndex(event => event.id === eventId);
  //   const eventsCopy = Array.from(events);
  //   eventsCopy[eventIndex] =
  //   updateEvents(eventsCopy);
  // }
  return (
    <View style={styles.dateCardMainContainer}>
      {events?.data?.map((dateCard, index) => {
        console.log(events.activeCard)
        return (
          <View style={{ marginBottom: 14 }}>
            <DateCard
              title={dateCard.title}
              category={dateCard.category}
              duration={dateCard.duration}
              isActive={events?.activeEvent === dateCard.id}
              setActiveEvent={() => setActiveEvent(dateCard.id)}
            />
          </View>
        )
      })}
    </View>
  )
}
const DayDate = ({
  date,
  day,
  isActive,
  setActive,
  isBooked,
  events,
  activeEvent
}) => {
  const [activeEventState, setActiveEventState] = useState(activeEvent)
  return (
    <View>
      <TouchableOpacity
        style={
          isActive ? styles.dayDateContainerActive : styles.dayDateContainer
        }
        onPress={() => setActive(events)}
      >
        <Text style={isActive ? styles.dateActive : styles.date}>{date}</Text>
        <Text style={isActive ? styles.dayActive : styles.day}>{day}</Text>
      </TouchableOpacity>
      {isBooked && (
        <View style={styles.clockColoured}>
          <ClockColouredIcon />
        </View>
      )}

      {isActive && <View style={styles.dateCardOuterMainContainer}></View>}
    </View>
  )
}
const Dashboard = props => {
  const [activeDate, setActiveDate] = useState(0)
  const [calendar, setCalendar] = useState(calenderData)
  const [userName, setUserName] = useState("")
  useEffect(() => {
    retrieveData("userData").then(userData => {
      console.log(userData)
      setUserName(userData?.user?.last_name)
    })
  }, [])
  const renderEventsItem = ({ item }) => (
    <EventsCard
      title={item.title}
      description={item.description}
      image={item.image}
      date={item.date}
      time={item.time}
      button
      eventsHeading
    />
  )
  const renderClassesItem = ({ item }) => (
    <EventsCard title={item.title} image={item.image} />
  )
  const getActiveDateEvents = dateId => {}
  const updateDateEvents = eventId => {}
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >

<PubnubUtils />
      <Header
        title="DASHBOARD"
        leftHandler={() => props.navigation.openDrawer()}
      />
      <Searchbar
        propStyles={styles.searchbar}
        leftIcon={<SearchIcon />}
        rightIcon={<FilterIcon />}
      />
      <View style={styles.greetingsContainer}>
        <Image
          source={require("../../../assets/images/dp_girl.png")}
          style={styles.dp}
        />
        <Text style={styles.greetings}>Hi {userName}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.datesContentContainer}
        style={styles.datesContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {calendar.map((item, index) => {
          return (
            <DayDate
              date={item.date}
              day={item.day}
              isActive={activeDate === index ? true : false}
              setActive={() => setActiveDate(index)}
              isBooked={item.isBooked}
              events={item.events}
              activeEvent={item.activeEvent}
            />
          )
        })}
      </ScrollView>

      <DateCardsContainer
        events={calendar[activeDate]?.events}
        setActiveEvent={activeEvent => {
          let tempCalendar = Array.from(calendar)
          tempCalendar[activeDate].events.activeEvent = activeEvent
          setCalendar(tempCalendar)
        }}
      />
      <View style={styles.buttonsContainer}>
        {/* <TouchableOpacity onPress={() => {
          clearStorage();
          props.navigation.navigate("AuthNav")}}> */}
        <TouchableOpacity onPress={() => props.navigation.navigate("MainNav")}>
          <Image
            source={require("../../../assets/icons/book-appointment.png")}
            style={styles.bookAppointment}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <View style={styles.buttonsGrid}>
          <TouchableOpacity>
            <ArticlesAndVideos />
          </TouchableOpacity>
          <TouchableOpacity>
            <LiveGroups />
          </TouchableOpacity>
          <TouchableOpacity>
            <Classes />
          </TouchableOpacity>
          <TouchableOpacity>
            <Forum />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.upcomingGroups}>Upcoming Groups</Text>
      <FlatList
        data={events}
        renderItem={renderEventsItem}
        keyExtractor={item => item.title}
        horizontal={true}
        style={styles.cardsContainer}
        showsHorizontalScrollIndicator={false}
      />

      <View style={{ width: 300, height: 24 }} />

      <Text style={styles.upcomingGroups}>Suggested Class</Text>
      <FlatList
        data={classes}
        renderItem={renderClassesItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        style={styles.cardsContainer}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ width: 300, height: 70 }} />
    </ScrollView>
  )
}

export default Dashboard
