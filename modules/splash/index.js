import React, { useEffect } from "react"
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native"
import logo from "../../assets/logo.png";

const NEXT_SCREEN_NAME = "Login"

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
    navigation.navigate(NEXT_SCREEN_NAME)
     }, 3000)
  }, [])

  const navigate = (NEXT_SCREEN_NAME) => {
    navigation.navigate(NEXT_SCREEN_NAME);
  }

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 115
  },
  image: {
  }, textRow: {
    textAlign: "center",
    color: '#fff',
    fontSize: 22,
    fontFamily: "Roboto-Regular"
  },
})

export default {
  title: "SplashScreen",
  navigator: Splash
}
