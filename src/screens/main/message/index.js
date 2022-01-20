import React, { useEffect } from "react"
import { usePubNub } from "pubnub-react"
import Interest from "../book-appointment/Interest"
import ChatScreen from "./Chat"
import InboxScreen from "./Inbox"
import { useSelector, useDispatch } from "react-redux"
import { setScreensFlow } from "../../../redux/reducers/nav"
import { Text } from "react-native"
import { PubnubUtils, retrieveData } from "../../../util/helpers"
import { LoaderScreen } from "../../../components"
import {
  addInboxChannel,
  emptyInboxChannel
} from "../../../redux/reducers/chat"

const MessageScreen = props => {
  const authUser = useSelector(state => state.auth.userData)
  const userData = useSelector(state => state.auth.userData)
  const { id } = userData?.user
  const { name } = userData?.user
  const { email } = userData?.user
  const pubnub = usePubNub()
  const dispatch = useDispatch()
  const _handleNav = async () => {
    pubnub.objects.setUUIDMetadata({
      uuid: `${id}`,
      data: {
        name,
        email
      }
    })
    dispatch(emptyInboxChannel())
    const channels = await pubnub.objects.getMemberships({
      uuid: `${id}`,
      include: {
        channelFields: true,
        customChannelFields: true,
        customFields: true,
        totalCount: true
      }
    })
    // const channels = [3,4]
    let isAnyActiveChannel = false
    channels.data?.forEach(async channel => {
      if (channel?.channel?.custom?.chatStatus === "ACCEPTED") {
        isAnyActiveChannel = true
        console.log(channel?.channel?.id)
        const channelData = await pubnub.objects
          .getChannelMetadata({
            channel: channel?.channel?.id
          })
          .catch(err => {
            console.log("getChannelMetadata")
            console.log(err.status)
          })
        console.log(channelData)
        const response = await pubnub
          .fetchMessages({
            channels: [channel?.channel?.id],
            count: 100
          })
          .catch(err => {
            console.log("fetchMessages")
            console.log(err.status)
          })
        const userMetaData = await pubnub.objects
          .getUUIDMetadata({
            uuid: channelData?.data?.custom?.userTwo
          })
          .catch(err => {
            console.log("getUUIDMetadata")
            console.log(err.status)
          })
        const responseMsgs = response.channels[channel?.channel?.id]
        if (responseMsgs?.length > 0) {
          channelData.data.custom.lastMessage =
            responseMsgs[responseMsgs?.length - 1]
          channelData.data.custom.providerName = userMetaData?.data?.name
        }
        dispatch(addInboxChannel(channelData?.data))
      }
    })
    if (isAnyActiveChannel) {
      props.navigation.navigate("Inbox")
    } else {
      dispatch(
        setScreensFlow({
          screensFlow: "notifyProviders",
          previousScreen: "DashboardNav",
          nextScreen: "Inbox"
        })
      )
      props.navigation.navigate("MainNav")
    }
  }

  useEffect(() => {
    _handleNav()
    const unsubscribe = props.navigation.addListener("focus", () => {
      console.log("FOCUSED")
      _handleNav()
    })
    return unsubscribe
  })
  return (
    <>
      <LoaderScreen />
    </>
  )
}
export default MessageScreen
