import { config as tamaguiConfig } from '@tamagui/config'
import { Text, View, ScrollView } from 'react-native'
import { createTamagui, setupReactNative } from '@tamagui/core' // or '@tamagui/core'
import { theme } from './themes/theme';
// if using only @tamagui/core with react-native components
// if using tamagui this isn't necessary as it does this setup for you (for most components)
setupReactNative({
  Text,
  View,
  ScrollView
})

const config = createTamagui({
  ...tamaguiConfig,
  themes: {
    ...tamaguiConfig.themes,
    light: theme
  }
})
export type Conf = typeof config
declare module '@tamagui/core' {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import tamagui
  interface TamaguiCustomConfig extends Conf { }
}
export default config