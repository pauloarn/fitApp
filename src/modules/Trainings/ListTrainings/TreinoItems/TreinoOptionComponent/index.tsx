import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export interface TreinoOptionComponentProps {
  isVisible: boolean
  iconName: string
  style: StyleProp<ViewStyle>
  iconColor?: string
  iconSize?: number
  onPress: () => void
}

const TreinoOptionComponent = ({
  isVisible,
  iconName,
  style,
  iconSize,
  onPress,
  iconColor
}: TreinoOptionComponentProps) => {
  if (!isVisible) {
    return null
  }
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <FontAwesome5 name={iconName} color={iconColor} size={iconSize} />
    </TouchableOpacity>
  )
}

export default TreinoOptionComponent
