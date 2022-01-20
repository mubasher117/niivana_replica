import React, { useEffect } from "react"
import SplashScreen from "react-native-splash-screen"
import { retrieveData, storeData } from "../../util/helpers"
import { useSelector, useDispatch } from "react-redux"
import { setUserData } from "../../redux/reducers/auth"

const Loading = props => {
  const dispatch = useDispatch()
  const onProcess = () => {
    SplashScreen.hide()
    retrieveData("userData")
      .then(data => {
        console.log(data)
        dispatch(setUserData(data))
        props.navigation.navigate("Drawer")
      })
      .catch(err => {
        props.navigation.navigate("OnBoarding")
        // retrieveData("isOnboarded")
        //   .then(check => props.navigation.navigate("AuthNav"))
        //   .catch(err => {
        //     props.navigation.navigate("OnBoarding")
        //     storeData("isOnboarded", true)
        //   })
      })
  }

  useEffect(() => {
    onProcess()
  })

  return null
}

export default Loading
