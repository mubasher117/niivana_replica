/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native"
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
  Composer
} from "react-native-gifted-chat"
// import SendIcon from "../../../../assets/icons/send-chat.svg"
import styles from "./style"
import { BaseColor } from "../../../../config"
import { usePubNub } from "pubnub-react"
import { Header, HorizontalSpacing, Icon } from "../../../../components"

import BackIcon from "../../../../assets/icons/back.svg"
import PlusIcon from "../../../../assets/icons/plus.svg"
import SendIcon from "../../../../assets/icons/send.svg"
import AttachIcon from "../../../../assets/icons/attach.svg"
import { useSelector } from "react-redux"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { convertTime } from "../../../../util/helpers"

const ChatScreen = props => {
  const [messages, setMessages] = useState([])
  const [messageSend, setMessageSent] = useState(false)
  const pubnub = usePubNub()
  const chatTitle = useSelector(state => state.chat.activeChatTitle)
  const userData = useSelector(state => state.auth.userData)
  const {id} = userData?.user;
  const {name} = userData?.user;
  const {email} = userData?.user;
  const chatChannel = useSelector(state => state.chat.channel)
  const getMessages = async() => {
    console.log("Fetching mEssages")
    const response = await pubnub.fetchMessages({
      channels: [chatChannel],
      count: 100,
    });
  
    const responseMsgs = response.channels[chatChannel];
    let userMessages = []
    
    if (responseMsgs?.length > 0) {
      responseMsgs.slice().reverse().forEach(message => {
        // console.log(message.timetoken / 10000)
        userMessages.push({
          _id: message.timetoken,
          text: message.message.text,
          createdAt: new Date(message.timetoken / 10000),
          user: {
            _id: message.message.senderId,
            name: "React Native",
            avatar: "data:image/png;base64,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"
          }
        })
      })
    }
    setMessages(userMessages)
    
  
    
  }
  useEffect(() => {
    if (pubnub) {
      pubnub.objects.setUUIDMetadata({
        uuid: `${id}`,
        data: {
          name,
          email,
        },
      });
      getMessages()
    
    const listener = {
      message: envelope => {
        // getMessages();
        setMessages(msgs => [
          {
            // id: envelope.message.id,
            // author: envelope.publisher,
            // content: envelope.message.content,
            // timetoken: envelope.timetoken,
            // giftedchat data

            _id: envelope.message._id,
            text: envelope.message.text,
            createdAt: envelope.message.createdAt,
            user: {
              _id: envelope.message.senderId,
              name: "React Native",
              avatar: "data:image/png;base64,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"
          
            }
          },
          ...msgs
        ])
      }
    }

    pubnub.addListener(listener)
    pubnub.subscribe({ channels: [chatChannel] })
    return () => {
      pubnub.removeListener(listener)
      pubnub.unsubscribeAll()
    }
  }
    }, [pubnub, email, id, name])
  const onSend = useCallback(
    (messages = []) => {
      const message = {
        text: messages[0]?.text,
        senderId: `${id}`,
        _id: Math.random()
        .toString(16)
        .substr(2),
        createdAt: Date(Date.now())
      }
      // Publish our message to the channel `chat`
      pubnub.publish({ channel: chatChannel, message })
      console.log(Date(Date.now()).toString())
      // setMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, messages)
      // );
    },
    [pubnub]
  )

  const renderSend = props => {
    return (
      <Send {...props} containerStyle={{
         marginBottom: 15, 
         marginRight: "2%" 
         }}>
      <View style={styles.attachContainer}>
       <TouchableOpacity
       onPress={() => alert("Select Attachments")}
       >
       <AttachIcon />
       </TouchableOpacity>
        <HorizontalSpacing width={10} />
        <Icon
                  iconFamily="FontAwesome"
                  name="send"
                  size={30}
                  color={BaseColor.primaryColor}
                />
      </View>
      </Send>
      // <View />
      // <Send {...props} containerStyle={{ marginBottom: 15, marginRight: "2%" }}>
      //   {/* <SendIcon /> */}
      //   <Text>Send</Text>
      // </Send>
    )
  }
  const renderBubbleTime = props => {
    let messageDate = 'N/A'
    try {
      messageDate = props?.currentMessage?.createdAt.toString()
      messageDate = convertTime(messageDate.split(" ")[4].slice(0, 5))
    } catch (error) {

     try {
      messageDate = props?.currentMessage?.createdAt.toString()
      messageDate = convertTime(messageDate.split("T")[1].slice(0, 5))
      console.log(error)
     } catch (error) {
       console.log("error")
     }
    }
    return <Text>{messageDate}</Text>
  }
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: BaseColor.goldLight,
            minHeight: 42,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 0,
            marginBottom: 5,
            borderColor: BaseColor.primaryColor,
            borderWidth: 0.2,
            minWidth: 100,
            padding: 5
          },
          left: {
            backgroundColor: BaseColor.whiteColor,
            minHeight: 42,
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 0,
            marginBottom: 5,
            padding: 5,
            minWidth: 100
          }
        }}
        textStyle={{
          right: {
            color: BaseColor.textDark,
            fontSize: 17
          },
          left: {
            color: BaseColor.textDark,
            fontSize: 17
          }
        }}
        renderTime={renderBubbleTime}
      />
    )
  }
  const renderMessage = props => {
    return (
      <View style={{ backgroundColor: BaseColor.backgroundColor }}>
        <Text>mo</Text>
      </View>
    )
  }
  const scrollToBottomComponent = () => {
    // return <FontAwesome name="angle-double-down" size={22} color="#333" />
  }
  const renderDayAboveMessage = props => {
    const messageDate = props.currentMessage.createdAt
    const today = new Date()
    const isToday = today.getDate() === messageDate.getDate()
    console.log(isToday)
    return (
      <Text>dd</Text>
      //   <>
      //     {props.currentMessage?.createdAt?.getDay() !==
      //     props.previousMessage?.createdAt?.getDay() ? (
      //       <View
      //         style={{
      //           alignItems: "center",
      //           justifyContent: "center",
      //           marginBottom: 27
      //         }}
      //       >
      //         <View
      //           style={{
      //             backgroundColor: "#FFFFFF",
      //             height: 32,
      //             width: 61,
      //             borderRadius: 16,
      //             alignItems: "center",
      //             justifyContent: "center"
      //           }}
      //         >
      //           <Text style={{ color: "#444444" }}>
      //             {isToday ? "Today" : props.currentMessage.createdAt.toString()}
      //           </Text>
      //         </View>
      //       </View>
      //     ) : (
      //       <View />
      //     )}
      //   </>
    )
  }
  const renderInputToolbar = props => {
    return (
      // <TextInput onPre />
      <InputToolbar
        {...props}
        containerStyle={{
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          // borderWidth: 1,
          // marginLeft: "8%",
          width: "92%",
          alignSelf: "center",
          // paddingBottom:
          fontSize: 13,
          marginHorizontal: "4%",
          paddingRight: "2%"
        }}
      >
        <View>
          <Button>Check</Button>
        </View>
      </InputToolbar>
    )
  }

  return (
    <>
   <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardShouldPersistTaps='handled'
        extraScrollHeight={100}
        style={{ flex: 1 }}
        contentContainerStyle={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}

        enableOnAndroid={true}
        scrollEnabled={true}
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}
      >
        {/* <ScrollView
        // style={styles.root} contentContainerStyle={styles.container}
        > */}
      <SafeAreaView>
        <Header
          leftIcon={<BackIcon />}
          title={chatTitle?.toUpperCase()}
          leftHandler={() => props.navigation.goBack()}
          rightIcon={<PlusIcon />}
        />
      </SafeAreaView>
      <View style={{flex: 1}} keyboardShouldPersistTaps="always">
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: `${id}`
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        // scrollToBottomComponent={scrollToBottomComponent}
        placeholder="Write your message"
        // renderAvatar={null}
        // renderDay={renderDayAboveMessage}
        // renderInputToolbar={renderInputToolbar}
        textInputProps={{
          placeholderTextColor: "#787878",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          textAlignVertical: "center",
          paddingTop: 0,
          paddingBottom: 0,
          // backgroundColor: "red",
          // textAlign: "center",
          multiline:false,
          returnKeyType: "go"
        }}
        textInputStyle={{
          width: 100,
          height: 80,
          margin: 0,
          justifyContent: "center",
          // backgroundColor: "green",
          textAlignVertical: "center",
        }}
        // renderAvatarOnTop={() => <Text style={{ color: "white" }}>BLAH</Text>}
        minInputToolbarHeight={50}
        isKeyboardInternallyHandled={false}
        bottomOffset={() => 0}
        messagesContainerStyle={{
          width: "100%",
          alignSelf: "center",
          backgroundColor: BaseColor.backgroundInterest,
          // height: 500
          paddingBottom: 20,
        }}

      />
      </View>
      {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </>
  )
}

export default ChatScreen
