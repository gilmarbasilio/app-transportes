import { Feather, FontAwesome5 } from '@expo/vector-icons'

type IconFeatherMap = {
  iconName: 'Feather',
  name: keyof typeof Feather.glyphMap
}

type IconFontAwesome5Map = {
  iconName: 'FontAwesome5',
  name: keyof typeof FontAwesome5.glyphMap
}

export type IconBoxFamily = IconFeatherMap | IconFontAwesome5Map;

export const IconComponentMap = {
  Feather,
  FontAwesome5,
}