import { TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { FontAwesome5 } from '@expo/vector-icons'
import { Text } from 'react-native-paper'
import { defaults } from '../../defaults'

interface FloatingActionButtonProps {
  onPress: () => void
  iconName?: string
  label?: string
}
const FloatingActionButton = ({
  onPress,
  iconName,
  label
}: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={onPress}>
      <View
        style={{
          backgroundColor: defaults.corBotaoFab,
          padding: 10,
          borderRadius: 15
        }}
      >
        {label ? (
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{label}</Text>
        ) : (
          <FontAwesome5
            name={iconName || 'plus-circle'}
            size={25}
            color={'white'}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default FloatingActionButton
