import React, { Component, useState } from "react"
import { View, TouchableOpacity, SafeAreaView } from "react-native"
import { Image, Icon, Text } from "../"
import styles from "./styles"
import PropTypes from "prop-types"
import { CustomTextInput } from "../index"
import { BaseColor } from "../../config"

const Searchbar = ({ propStyles, rightIcon, leftIcon }) => {
  const [searchText, setSearchText] = useState()
  return (
    <CustomTextInput
      icon={leftIcon}
      rightIcon={rightIcon}
      style={[
        styles.searchBar,
        {
          width: propStyles?.width,
          height: propStyles?.height,
          margin: propStyles?.margin
        }
      ]}
      inputStyle={styles.searchBarInput}
      placeholder={"Search"}
      placeholderTextColor="#7C8C87"
      onChangeText={text => setSearchText(text)}
      value={searchText}
      selectionColor={BaseColor.primaryColor}
    />
  )
}
export default Searchbar
