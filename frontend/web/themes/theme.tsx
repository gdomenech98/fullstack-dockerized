import { createTheme, createTokens } from "tamagui";

export const tokens = createTokens({
  color: {
    primary: "#6900FF",
    secondary: "#D1B0FF",
    background: "#F7F7F7",
    text: "#282828",
    secondaryText: "#727272",
    shadow: "rgba(0,0,0,0.1)"
  },
  size: {
    MAX_WIDTH: "400px"
  }
} as any)

const palette = [
  "#0000e90", 
  "#2700ec", 
  "#4600f1", 
  "#5c00f9", 
  "#6900FF", 
  "#8741ff", 
  "#a069ff", 
  "#bd97ff", 
  "#d8c1fe", 
  "#f1e6ff"
]

export const theme = createTheme({
  background: tokens.color.background.val,
  color: palette[4],
  colorHover: palette[5],
  colorPress: palette[6],
  borderColor: tokens.color.text.val,
  shadowColor: tokens.color.shadow.val,
  shadowColorHover: tokens.color.shadow.val,
  backgroundHover: tokens.color.primary.val,
  text: tokens.color.text.val,
  secondaryText: tokens.color.secondaryText.val,
  secondary: tokens.color.secondary.val
  // backgroundPress: tokens.color.primary2,
  // backgroundFocus: tokens.color.primary2,
  // borderColorHover: tokens.color.primary,
  // colorFocus: tokens.color.primary,
})