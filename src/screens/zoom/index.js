import React, { useEffect, useState } from "react"
import { Platform, SafeAreaView, View } from "react-native"
import { WebView } from "react-native-webview"
import BackIcon from "../../assets/icons/back.svg"
import Header from "../../components/Header"
import ZoomHtml from "../../util/zoom/meeting.html"
import axios from "axios"
import { ZOOM_JWT_API_KEY, ZOOM_JWT_API_SECRET } from "../../config/consts"
import { NoData, LoaderScreen } from "../../components"
const Zoom = props => {
  // const { navigation, savePayment, payment } = props
  const { params } = props.route
  console.log("🚀 ~ file: index.js ~ line 13 ~ props.navigation", props.route)
  const { meetingInfo } = params
  console.log("🚀 ~ file: index.js ~ line 14 ~ meetingInfo", meetingInfo)
  // const {
  //   data: { payment_url },
  // } = payment
  const [loading, setLoading] = useState(false)
  const webViewRef = React.useRef(null)

  useEffect(() => {
    setLoading(true)
    return () => {
      setLoading(false)
    }
  }, [])
  const handleMeetingNavigation = event => {
    console.log("🚀 ~ file: index.js ~ line 29 ~ event", event)
    // this.setState({spinner: true});
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
            passWord: meetingInfo?.meetingPassword,
            role: meetingInfo?.role,
            apiSecret: ZOOM_JWT_API_SECRET
          }
          webViewRef.current.postMessage(`${JSON.stringify(creds)};`)
          setLoading(false)
        }}
      />
    </SafeAreaView>
  )
}
export default Zoom
