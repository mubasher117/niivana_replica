/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react"

import { NavigationContainer, DefaultTheme } from "@react-navigation/native"

import RootNavigation from "./src/navigation"
import PubNub from "pubnub"
import { PubNubProvider } from "pubnub-react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./src/redux/store"
import {QueryClientProvider, QueryClient} from 'react-query'

const pubnub = new PubNub({
  subscribeKey: "sub-c-12aab51e-6a5d-11ec-a4f8-fa616d2d2ecf",
  publishKey: "pub-c-a981b821-6a66-4c65-84b7-066721ea5bd3"
})
const queryClient = new QueryClient();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
}
const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PubNubProvider client={pubnub}>
            <RootNavigation />
          </PubNubProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </NavigationContainer>
  )
}
export default App
