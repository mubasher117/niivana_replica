/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import BackIcon from "../../../../assets/icons/back.svg"
import ExclamationIcon from "../../../../assets/icons/exclamation_sign.svg"
import RightIcon from "../../../../assets/icons/icon-right.svg"
import RightIconColored from "../../../../assets/icons/icon-right-colored.svg"
import Header from "../../../../components/Header"
import styles from "./style"
import { useSelector, useDispatch } from "react-redux"
import { setScreensFlow } from "../../../../redux/reducers/nav"

const IconicButton = ({ title, isExclamation, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.iconicButton,
        { backgroundColor: isExclamation ? "#EF7477" : "white" },
      ]}
      onPress={onPress}
    >
      {isExclamation && <ExclamationIcon />}
      <Text
        style={
          isExclamation
            ? styles.iconicButtonActiveText
            : styles.iconicButtonInactiveText
        }
      >
        {title}
      </Text>
      <TouchableOpacity>
        {isExclamation ? <RightIcon /> : <RightIconColored />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const Interest2 = props => {
  const [isActiveRightAway, setIsActiveRightAway] = useState(false);
  const [isActiveMental, setIsActiveMental] = useState(false);
  const [isActiveLactation, setIsActiveLactation] = useState(false);

  const screensFlow = useSelector(state => state.nav.screensFlow);
  const dispatch = useDispatch();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header
        title=""
        leftIcon={<BackIcon />}
        rightIcon={<View />}
        leftHandler={() => props.navigation.goBack()}
      />
      <Text style={styles.title}>How urgent is your issue?</Text>
      <Text style={styles.subTitle}>We offer 24/7 support</Text>
      <View style={styles.iconicButtonConatiner}>
        <IconicButton
          title="Right Away"
          isExclamation
          onPress={() => props.navigation.goBack()}
        />
        <IconicButton
          title="Choose a Time"
          onPress={() => {
            dispatch(
              setScreensFlow({
                screensFlow: "calendar",
                previousScreen: "interest2",
                nextScreen: "provider",
              })
            );
            props.navigation.navigate("Calendar");
          }}
        />
        <IconicButton
          title="Choose a Provider"
          onPress={() => {
            dispatch(
              setScreensFlow({
                screensFlow: "provider",
                previousScreen: "interest2",
                nextScreen: "calendar",
              })
            );
            props.navigation.navigate("Provider")
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Interest2;
