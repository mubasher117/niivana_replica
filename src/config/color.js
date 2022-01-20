/**
 * Color Palette Define
 */

let OrangeColor = {
  primaryColor: "#E5634D",
  darkPrimaryColor: "#C31C0D",
  lightPrimaryColor: "#FF8A65",
  accentColor: "#869EBC",
};

let BlueColor = {
  primaryColor: "#5DADE2",
  darkPrimaryColor: "#1281ac",
  lightPrimaryColor: "#68c9ef",
  accentColor: "#FF8A65",
};

let PinkColor = {
  primaryColor: "#EE829C",
  darkPrimaryColor: "#C2185B",
  lightPrimaryColor: "#F8BBD0",
  accentColor: "#8BC34A",
};

let GreenColor = {
  primaryColor: "#58D68D",
  darkPrimaryColor: "#388E3C",
  lightPrimaryColor: "#C8E6C9",
  accentColor: "#607D8B",
};

let YellowColor = {
  primaryColor: "#FFCD57",
  darkPrimaryColor: "#FFA000",
  lightPrimaryColor: "#FFECB3",
  accentColor: "#795548",
};

let PurpleColor = {
  primaryColor: "#1c4052",
  lightPrimaryColor: "#1c4052",
  // lightPrimaryColor: "#7682ed",
};

/**
 * Main color use for whole application
 */
let BaseColor = {
  ...OrangeColor,
  ...{
    primaryColor: "#DB8057",
    backgroundColor: "#FFFCFA",
    backgroundLightColor: "#FAFAFA",
    backgroundInterest: "#F4F6FA",
    breakLine: "#9C9EB91A",
    textGrey: "#8F8D86",
    textGreyLight: "#8792A2",
    textWhite: "#FFFFFF",
    textGreyDark: "#697386",
    textDark: "#1D2B48",
    textDarkInactive: "#656E7880",
    horizontalBreak: "#ffe4c4",
    greetings: "#19343A",
    dateBackground: "#DB8057",
    cardTitle: "#2D3142",
    dateTime: "#8F8D86",
    searchbarBorder: "#E4E4E4",
    inactive: "#D0D0D0",
    iconicButtonActiveBackground: "#869EBC",
    accentGreen: "#869EBC",
    accentGreenOpacity: "rgba(134, 158, 188, 0.2)",
    borderTextBox: "rgba(60, 66, 87, 0.12)",
    pink:"#EF7477",
    goldLight: "#FCF7EF",
    goldDark: "#DB8057",
    titleGrey:"#8F8D86",
    reviewCardDate: "#7C8C87",
    designPrimaryColor: "#00FFE5",
    blackColor: "#000000",
    textPrimaryColor: "#212121",
    textSecondaryColor: "#E24A9A",
    primaryLightColor: "rgba(219, 128, 87, 0.05)",
    buttonPrimaryColor: "#191919",
    buttonPrimaryGradientStart: "#6CECD3",
    buttonPrimaryGradientEnd: "#297480",
    primaryDarkColor: "#153B37",
    buttonSecondaryColor: "#232323",
    buttonSecondaryLightColor: "#2B2B2B",
    grayColor: "#9B9B9B",
    darkBlueColor: "#24253D",
    dividerColor: "#BDBDBD",
    whiteColor: "#FFFFFF",
    fieldColor: "#F5F5F5",
    yellowColor: "#FDC60A",
    navyBlue: "#3C5A99",
    kashmir: "#5D6D7E",
    lightGrey: "#ACB1C0",
    lightBlack: "#444444",
    bottomNavBackground: "#262626",
    headerBackgroundLight: "#191919"
  },
};
let DesignColor = {
  primaryColor: "#00EFD7",
  secondaryColor: "#007380",
  backgroundColor: "#191919",
  foreground: "#333333",
};
export {
  BaseColor,
  OrangeColor,
  BlueColor,
  PinkColor,
  GreenColor,
  YellowColor,
  PurpleColor,
  DesignColor,
};
