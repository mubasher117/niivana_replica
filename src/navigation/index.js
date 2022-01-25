import {
  createDrawerNavigator,
  DrawerContentScrollView,
  useDrawerProgress,
  useDrawerStatus
} from "@react-navigation/drawer"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Animated, { Extrapolate } from "react-native-reanimated"
import ArticlesIcon from "../assets/icons/articles-outline.svg"
import CalendarIcon from "../assets/icons/calendarBottomTab.svg"
import CalendarActiveIcon from "../assets/icons/calendarBottomTabActive.svg"
import ChatIcon from "../assets/icons/Chat.svg"
import ChatIconActive from "../assets/icons/ChatActive.svg"
import EducationIcon from "../assets/icons/education-outline.svg"
import ForumIcon from "../assets/icons/forum-outline.svg"
import HomeIconActive from "../assets/icons/home-active.svg"
import HomeOutlineIcon from "../assets/icons/home-outline.svg"
import HomeIcon from "../assets/icons/home.svg"
import LiveGroupIcon from "../assets/icons/live-group-outline.svg"
import LogoutIcon from "../assets/icons/logout-outline.svg"
import ProfileIcon from "../assets/icons/Profile-outline.svg"
import StartIcon from "../assets/icons/Star-outline.svg"
import VideoIcon from "../assets/icons/Video.svg"
import VideoIconActive from "../assets/icons/VideoActive.svg"
import { Icon, Text } from "../components"
import { BaseColor } from "../config"
import ForgotPassword from "../screens/auth/ForgotPassword"
import OTP from "../screens/auth/OTP"
import ResetPassword from "../screens/auth/ResetPassword"
import SignIn from "../screens/auth/SignIn"
import SignUp from "../screens/auth/SignUp"
import Loading from "../screens/Loading"
import BillingScreen from "../screens/main/billing"
import CardDetailsScreen from "../screens/main/billing/CardDetails"
import MembershipScreen from "../screens/main/billing/Membership"
import PaymentHistoryScreen from "../screens/main/billing/PaymentHistory"
import Interest from "../screens/main/book-appointment/Interest"
import Interest2 from "../screens/main/book-appointment/Interest-2"
import QuestionForm from "../screens/main/book-appointment/QuestionForm"
import Calendar from "../screens/main/Calendar"
import Dashboard from "../screens/main/Dashboard"
import MessageScreen from "../screens/main/message"
import Message from "../screens/main/message"
import ChatScreen from "../screens/main/message/Chat"
import InboxScreen from "../screens/main/message/Inbox"
import NotifyProvidersScreen from "../screens/main/message/NotifyProviders"
import Payment from "../screens/main/Payment"
import ProviderDescription from "../screens/main/provider/Description"
import ProviderDescriptionBooked from "../screens/main/provider/DescriptionBooked"
import Provider from "../screens/main/provider/Home"
import Zoom from "../screens/main/zoom"
import OnBoarding from "../screens/OnBoarding"
import InsuranceSubmit from "../screens/main/insurance/InsuranceSubmit"
import InsuranceDetails from "../screens/main/insurance/InsuranceDetails"
import Profile from "../screens/main/profile"
import { retrieveData, clearStorage } from "../util/helpers"

const DashboardStack = createNativeStackNavigator()

const DashboardNav = () => (
  <DashboardStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Dashboard"
  >
    <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    {/* <DashboardStack.Screen name="Provider" component={Provider} /> */}
    {/* <DashboardStack.Screen
      name="ProviderDescription"
      component={ProviderDescription}
    /> */}
  </DashboardStack.Navigator>
)

const ChatStack = createNativeStackNavigator()

const ChatNav = () => (
  <ChatStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Message"
  >
    <ChatStack.Screen name="Message" component={MessageScreen} />
    <ChatStack.Screen name="Inbox" component={InboxScreen} />
    <ChatStack.Screen name="Chat" component={ChatScreen} />
  </ChatStack.Navigator>
)

const Tab = createMaterialBottomTabNavigator()
function MyTabs({ navigation }) {
  const isDrawerOpen = useDrawerStatus()
  const progress = useDrawerProgress()
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
    extrapolateRight: Extrapolate.CLAMP
  })
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 40],
    extrapolateRight: Extrapolate.CLAMP
  })
  const animatedStyle = {
    borderRadius,
    transform: [{ scale }]
  }
  return (
    <Animated.View
      style={StyleSheet.flatten([
        styles.stack,
        animatedStyle,
        {
          padding: isDrawerOpen === "open" ? 20 : 0
        }
      ])}
    >
      <Tab.Navigator
        activeColor={BaseColor.primaryColor}
        inactiveColor="#282842"
        barStyle={{ backgroundColor: BaseColor.backgroundColor }}
        shifting={false}
      >
        <Tab.Screen
          name="DashboardNav"
          screenOptions={{
            headerTransparent: true,
            headerTitle: null
          }}
          component={DashboardNav}
          options={{
            showLabel: true,
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeIconActive style={{ color: "green" }} />
              ) : (
                <HomeIcon />
              )
          }}
        />
        <Tab.Screen
          name="Provider"
          component={Provider}
          options={{
            tabBarLabel: "Calender",
            tabBarIcon: ({ focused }) =>
              focused ? <CalendarActiveIcon /> : <CalendarIcon />
          }}
        />
        <Tab.Screen
          name="Video"
          component={Dashboard}
          options={{
            tabBarLabel: "Video",
            tabBarIcon: ({ focused }) =>
              focused ? <VideoIconActive /> : <VideoIcon />
          }}
        />
        <Tab.Screen
          name="ChatNav"
          component={ChatNav}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ focused }) =>
              focused ? <ChatIconActive /> : <ChatIcon />
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  )
}
const CustomDrawerItem = ({
  focused,
  color = "white",
  label,
  icon,
  onPress = () => {}
}) => {
  // const isFocused = focused

  const labelColor = color
  const labelName = label
  return (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      {icon}
      <Text
        body1
        style={[styles.drawerItemText, { color: labelColor, marginLeft: 10 }]}
      >
        {labelName}
      </Text>
    </TouchableOpacity>
  )
}
const DrawerContent = props => {
  const progress = useDrawerProgress()
  const [userName, setUserName] = useState("")
  useEffect(() => {
    retrieveData("userData").then(userData => {
      setUserName(userData?.user?.name)
    })
  }, [])
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1, padding: 20 }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ paddingLeft: 20 }}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Icon iconFamily="Ionicons" name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.drawerHeader}>
          <Image
            source={require("../assets/images/dp-girl-large.png")}
            style={styles.dp}
          />
          <Text whiteColor title3 style={{ marginBottom: 10 }}>
            {userName}
          </Text>
          <Text whiteColor body2 light>
            View your Profile
          </Text>
        </View>

        <View style={styles.drawerBody}>
          <CustomDrawerItem
            icon={<HomeOutlineIcon />}
            label="Home"
            onPress={() => props.navigation.navigate("DashboardNav")}
          />
          <CustomDrawerItem icon={<ProfileIcon />} label="Consults" />
          <CustomDrawerItem icon={<LiveGroupIcon />} label="Live Groups" />
          <CustomDrawerItem icon={<EducationIcon />} label="Classes" />
          <CustomDrawerItem icon={<ArticlesIcon />} label="Articles & Videos" />
          <CustomDrawerItem icon={<ForumIcon />} label="Forum" />
          <CustomDrawerItem icon={<StartIcon />} label="Rate the App" />
        </View>
        <View style={styles.drawerPadding}>
          <CustomDrawerItem
            onPress={() => {
              clearStorage()
              props.navigation.navigate("OnBoarding")
            }}
            icon={<LogoutIcon />}
            label="Logout"
          />
        </View>
      </View>
    </DrawerContentScrollView>
  )
}
const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <DrawerContent {...props} />
      }}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          flex: 1,
          width: "60%",
          backgroundColor: "#DB8057"
        },
        drawerType: "slide",
        overlayColor: "transparent",
        sceneContainerStyle: {
          backgroundColor: "#DB8057"
        }
      }}
    >
      <Drawer.Screen name="DashboardTab">
        {props => <MyTabs {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}
const AuthStack = createNativeStackNavigator()
const AuthNav = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Profile"
  >
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="InsuranceSubmit" component={InsuranceSubmit} />
    <AuthStack.Screen name="InsuranceDetails" component={InsuranceDetails} />
    <AuthStack.Screen name="Profile" component={Profile} />
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="OTP" component={OTP} />
    <MainStack.Screen name="Zoom" component={Zoom} />
  </AuthStack.Navigator>
)

const MainStack = createNativeStackNavigator()
const MainNav = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Interest"
  >
    <MainStack.Screen name="Interest" component={Interest} />
    <MainStack.Screen name="Interest2" component={Interest2} />
    <MainStack.Screen name="Calendar" component={Calendar} />
    <MainStack.Screen name="Billing" component={BillingScreen} />
    <DashboardStack.Screen name="Payment" component={Payment} />
    <MainStack.Screen name="AddCardDetails" component={CardDetailsScreen} />
    <MainStack.Screen name="Membership" component={MembershipScreen} />
    <MainStack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
    <MainStack.Screen name="QuestionForm" component={QuestionForm} />
    <MainStack.Screen name="Zoom" component={Zoom} />
    <MainStack.Screen
      name="NotifyProviders"
      component={NotifyProvidersScreen}
    />
    <MainStack.Screen
      name="ProviderDescription"
      component={ProviderDescription}
    />

    <MainStack.Screen
      name="ProviderDescriptionBooked"
      component={ProviderDescriptionBooked}
    />
  </MainStack.Navigator>
)

const Stack = createNativeStackNavigator()
const RootNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Loading"
  >
    <Stack.Screen name="AuthNav" component={AuthNav} />
    <Stack.Screen name="OnBoarding" component={OnBoarding} />
    <Stack.Screen
      name="Drawer"
      screenOptions={{
        headerShown: false
      }}
      component={DrawerNavigator}
    />
    <Stack.Screen name="MainNav" component={MainNav} />
    <Stack.Screen name="Loading" component={Loading} />
  </Stack.Navigator>
)

export default RootNavigation
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    backgroundColor: "#FFF"
  },
  drawerStyles: { flex: 1, width: "50%", backgroundColor: "transparent" },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30
  },
  drawerLabel: { color: "white", marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth
  },
  drawerHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: 20
  },
  drawerBody: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: 20
  },
  drawerPadding: {
    padding: 20
  },
  dp: {
    width: 70,
    height: 70,
    marginBottom: 10
  }
})
