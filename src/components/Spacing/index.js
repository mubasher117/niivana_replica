import React from "react"
import { View } from "react-native"

export const VerticalSpacing = ({ width = 1, height, backgroundColor }) => (
  <View style={{ width, height, backgroundColor }} />
)

export const HorizontalSpacing = ({ width, height = 1, backgroundColor }) => (
  <View style={{ width, height, backgroundColor }} />
)
