/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native";
import { BaseColor } from "../../../config";
const { width, height } = Dimensions.get("window");
import {getWidthPercentage} from '../../../util/helpers'
const styles = StyleSheet.create({
  root: {
    width: width,
    minHeight: height,
    paddingTop: 40,
  },
  rootContentContainer: {
    alignItems: "center",
    width: width,
    minHeight: "100%",
  },
  paymentCardBackground: {
    // marginTop: 20,
    padding: 0,
    width: getWidthPercentage(90),
    height: 250,
    // justifyContent: "center",
    // alignItems: "center",
    
  },
  paymentCardBackgroundSvg: {
    
    zIndex: -1
  },
  cardNumber: {
    marginTop: "25%",
    fontSize: 22,
    color: BaseColor.textWhite,
    fontWeight: '700',
    marginLeft: 50
  },
  cardDetails: {
    position: 'absolute',
    zIndex: 1000,
    bottom: 50,
    left: 50,
    fontSize: 14,
    color: BaseColor.textWhite,
    fontWeight: '700',
    // marginLeft: -200
  },
});

export default styles;
