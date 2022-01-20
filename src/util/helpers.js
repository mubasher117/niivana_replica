import React from "react"
import { usePubNub } from "pubnub-react"
import { Dimensions, StyleSheet, View } from "react-native"
import EncryptedStorage from "react-native-encrypted-storage"
const { width, height } = Dimensions.get("window")
export async function storeData(key, value) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value))
    console.log("Data stored successfully")
  } catch (error) {
    console.log("Error: ", error)
  }
}
export const retrieveData = key =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await EncryptedStorage.getItem(key)
      if (data !== undefined && data !== null) {
        resolve(JSON.parse(data))
      } else {
        reject("DATA_NOT_FOUND")
      }
    } catch (error) {
      reject(error)
    }
  })

export async function removeData(key) {
  try {
    await EncryptedStorage.removeItem(key)
    console.log("Data removed successfully")
  } catch (error) {
    console.log("Error: ", error)
  }
}
export async function clearStorage(key) {
  try {
    await EncryptedStorage.clear()
    console.log("Data removed successfully")
  } catch (error) {
    console.log("Error: ", error)
  }
}

export const getWidthPercentage = percentage => width * (percentage / 100)
export const getHeightPercentage = percentage => height * (percentage / 100)

export const convertTime = time => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ]
  if (time.length > 1) {
    // If time format correct
    time = time.slice(1) // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM" // Set AM/PM
    time[0] = +time[0] % 12 || 12 // Adjust hours
  }
  return time.join("")
}
export const convertTimeTo24H = time12h => {
  console.log("time12h:   ", time12h)
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

export const PubnubUtils = () => {
  const pubnub = usePubNub()
  const onLoad = async () => {
    const channel = "direct_11_4"
    // pubnub.objects.removeChannelMetadata({
    //   channel: "direct_11_4"
    // }).catch(err => console.log(err))

    const createChannel = await pubnub.objects.setChannelMetadata({
      channel,
      data: {
        custom: {
          userOne: "11", //customer
          userTwo: "4", //provider
          chatStatus: "PENDING" //PENDING , IGNORED , ACCEPTED ,
        }
      },
      include: {
        customFields: true
      }
    })
    pubnub.deleteMessages(
      {
        channel
      },
      function (status, response) {
        console.log(status, response)
      }
    )

    // const channelData = await pubnub.objects
    //   .getChannelMetadata({
    //     channel: 'ffe7878'
    //   })
    //   .catch(err => {
    //     console.log("getChannelMetadata")
    //     console.log(err.status)
    //   })

    //   console.log(channelData)
    // const response = await pubnub
    //   .fetchMessages({
    //     channels: ["direct_11_4"],
    //     count: 100
    //   })
    //   .catch(err => console.log(err.status))

    // const responseMsgs = response.channels["direct_11_4"]
    // console.log(responseMsgs?.length)
  }
  // onLoad()
  return <View />
}
