import { Text, View } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'

interface ListaVaziaTextProps {
  text?: string
  hpPercentage?: string
}

const ListaVaziaText = ({ text, hpPercentage }: ListaVaziaTextProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: heightPercentageToDP(hpPercentage || '45%')
      }}
    >
      <Text style={{ color: 'white', fontSize: 15 }}>
        {text ?? 'Nada encontrado'}
      </Text>
    </View>
  )
}

export default ListaVaziaText
