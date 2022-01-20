import React, { useEffect, useState } from "react"
import { Platform, SafeAreaView, View } from "react-native"
import { WebView } from "react-native-webview"
import BackIcon from "../../../assets/icons/back.svg"
import { LoaderScreen } from "../../../components"
import Header from "../../../components/Header"
import { ZOOM_JWT_API_KEY, ZOOM_JWT_API_SECRET } from "../../../config/consts"
import { retrieveData } from "../../../util/helpers"
import ZoomHtml from "./zoomwebview.html"

const Zoom = props => {
  // const { navigation, savePayment, payment } = props
  const [meetingInfo, setMeetingInfo] = useState()
  const { params } = props.route
  // const { meetingInfo } = params
  // const {
  //   data: { payment_url },
  // } = payment
  const [loading, setLoading] = useState(false)
  const webViewRef = React.useRef(null)

  useEffect(() => {
    setLoading(true)
    retrieveData("meetingInfo")
      .then(async data => {
        const userData = await retrieveData("userData")

        const info = {
          meetingNumber: data?.meeting_id,
          // meetingNumber: 95863593108,
          userName: userData?.user?.name,
          userEmail: userData?.user?.email,
          passWord: data?.meeting_password
          // passWord: "yuiuW7"
        }

        setMeetingInfo(info)

        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
    return () => {
      setLoading(false)
    }
  }, [])
  const handleMeetingNavigation = event => {
    if (event.url.includes("leave.html")) {
      props.navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title=""
        leftIcon={<BackIcon />}
        rightIcon={<View />}
        leftHandler={() => props.navigation.goBack()}
      />
      {loading && (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <LoaderScreen text="Meeting" />
        </View>
      )}
      {!loading && (
        <WebView
          source={
            Platform.OS !== "ios"
              ? { uri: "file:///android_asset/meeting.html" }
              : ZoomHtml
          }
          useWebKit
          ref={webViewRef}
          injectJavaScript
          originWhitelist={["*"]}
          allowsInlineMediaPlayback
          onNavigationStateChange={handleMeetingNavigation}
          onLoad={() => {
            const creds = {
              meetingNumber: meetingInfo?.meetingNumber,
              apiKey: ZOOM_JWT_API_KEY,
              userName: meetingInfo?.userName,
              userEmail: meetingInfo?.userEmail,
              passWord: meetingInfo?.passWord,
              role: meetingInfo?.role || "0",
              apiSecret: ZOOM_JWT_API_SECRET
            }
            webViewRef.current.postMessage(`${JSON.stringify(creds)};`)
            setLoading(false)
          }}
        />
      )}
    </SafeAreaView>
  )
}
export default Zoom
