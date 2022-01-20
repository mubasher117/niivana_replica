/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from "react-native"
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
  Composer
} from "react-native-gifted-chat"
// import SendIcon from "../../../../assets/icons/send-chat.svg"
import styles from "./styles"
import { BaseColor } from "../../../../config"
import { usePubNub } from "pubnub-react"
import { useQuery } from "react-query"
import { Button, Header, LoaderScreen } from "../../../../components"

import BackIcon from "../../../../assets/icons/back.svg"
import PlusIcon from "../../../../assets/icons/plus.svg"
import AttachIcon from "../../../../assets/icons/attach.svg"
import { getProviders } from "../../../../api/main/Provider"
import CustomModal from "../../../../components/CustomModal"
import { useDispatch, useSelector } from "react-redux"
import { setChannel, setActiveChatTitle } from "../../../../redux/reducers/chat"
const NotifyProvidersScreen = props => {
  const [providers, setProviders] = useState([])
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData)
  const { id } = userData?.user
  const { name } = userData?.user
  const { email } = userData?.user
  // const [isWaiting, setProviders] = useState([])
  const [providerNoResponse, setProviderNoResponse] = useState(false)
  const pubnub = usePubNub()
  useEffect(() => {
    pubnub.objects.setUUIDMetadata({
      uuid: `${id}`,
      data: {
        name,
        email
      }
    })
  })
  const timer = ms => new Promise(res => setTimeout(res, ms))
  const notifyProviders = async providers => {
    console.log("***********  notifyProviders **********")
    let newChannelNames = []
    providers.forEach(async provider => {
      const newChannelName = `direct_${id}_${provider.provider.id}`

      let isAlreadyChat = false
      const channelData = await pubnub.objects
        .getChannelMetadata({
          channel: newChannelName
        })
        .catch(err => console.log(err))
      console.log(channelData.data?.custom.chatStatus)
      if (channelData) {
        if (channelData.data?.custom?.chatStatus === "ACCEPTED") {
          isAlreadyChat = true
        }
      }

      if (!isAlreadyChat) {
        newChannelNames.push(newChannelName)
        const createChannel = await pubnub.objects.setChannelMetadata({
          channel: newChannelName,
          data: {
            custom: {
              userOne: id, //customer
              userTwo: provider.provider.id, //provider
              chatStatus: "PENDING" //PENDING , IGNORED , ACCEPTED ,
            }
          },
          include: {
            customFields: true
          }
        })
        await pubnub.objects.setChannelMembers({
          channel: createChannel.data.id,
          uuids: [`${id}`, `${provider.provider.id}`]
        })
        const initialMessage = {
          text: "Hi I have a problem. Can we discuss?",
          senderId: `${id}`
        }
        await pubnub
          .publish({ channel: createChannel.data.id, message: initialMessage })
          .catch(err => console.log(err.status))
      }

      // const userChannels = await pubnub.objects.getChannelMembers({
      //   channel: createChannel.data.id,
      // });
      // console.log("userChannels:   ", userChannels.data)
    })
    _handleProviderResponse(newChannelNames)
  }
  const _handleProviderResponse = async newChannelNames => {
    console.log(newChannelNames)
    let acceptedChannel
    let providerForChat

    for (let count = 0; count < 50; count++) {
      let isAcceptedChannel = false
      for (let index = 0; index < newChannelNames?.length; index++) {
        console.log("in for")
        const channelData = await pubnub.objects.getChannelMetadata({
          channel: newChannelNames[index]
        })
        console.log(channelData.data?.custom.chatStatus)
        if (channelData.data?.custom.chatStatus === "ACCEPTED") {
          console.log("IN IF ")
          acceptedChannel = channelData.data?.id
          const userMetaData = await pubnub.objects.getUUIDMetadata({
            uuid: channelData?.data?.custom?.userTwo
          })
          providerForChat = userMetaData?.data?.name
          isAcceptedChannel = true
        }
        console.log(isAcceptedChannel)
      }
      // newChannelNames.forEach(async channel => {
      //   const channelData = await pubnub.objects.getChannelMetadata({
      //     channel
      //   })
      //   console.log(channelData.data?.custom.chatStatus)
      //   if (channelData.data?.custom.chatStatus === "ACCEPTED") {
      //     console.log("IN IF ")
      //     acceptedChannel = channelData.data?.id
      //     const userMetaData = await pubnub.objects.getUUIDMetadata({
      //       uuid: channelData?.data?.custom?.userTwo
      //     })
      //     providerForChat = userMetaData?.data?.name
      //     isAcceptedChannel = true
      //   }
      //   console.log(isAcceptedChannel)

      // })
      console.log(isAcceptedChannel)
      if (isAcceptedChannel === true) {
        console.log(isAcceptedChannel)
        break
      }
      await timer(3000)
    }
    if (acceptedChannel && providerForChat) {
      dispatch(setChannel(acceptedChannel))
      dispatch(setActiveChatTitle(providerForChat))
      props.navigation.navigate("Chat")
    } else {
      setProviderNoResponse(true)
      setTimeout(() => {
        setProviderNoResponse(false)
        props.navigation.navigate("DashboardNav")
      }, 3000)
    }
  }
  const { isLoading, isError, data, error } = useQuery(
    "getProviders",
    getProviders
  )
  useEffect(() => {
    if (data?.data) {
      notifyProviders(data.data)
    }
  }, [data])
  if (isLoading) {
    return (
      <>
        <LoaderScreen />
      </>
    )
  }
  if (isError) {
    Alert.alert("Internal Server Error")
    return <></>
  }
  return (
    <>
      <CustomModal
        isVisible={!providerNoResponse}
        // handleCancel={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalSuccessText}>Providers Notified</Text>
          <Text style={styles.modalSuccessMessage}>
            Providers are notified. Waiting for response. It's a custom message.
            Need to change.
          </Text>
          <Button
            loading={true}
            style={styles.createButton}
            // disabled={!(formik.isValid && formik.dirty && !isLoading)}
            // onPress={formik.handleSubmit}
          >
            Waiting for response
          </Button>
        </View>
      </CustomModal>
      <CustomModal
        isVisible={providerNoResponse}
        // handleCancel={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalSuccessText}>Providers Response</Text>
          <Text style={styles.modalFailureMessage}>
            No response from any provider
          </Text>
          {/* <Button
            loading={true}
            style={styles.createButton}
            // disabled={!(formik.isValid && formik.dirty && !isLoading)}
            // onPress={formik.handleSubmit}
          >
            Waiting for response
          </Button> */}
        </View>
      </CustomModal>
    </>
  )
}

export default NotifyProvidersScreen
