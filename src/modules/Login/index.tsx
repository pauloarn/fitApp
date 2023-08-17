import { Text, View } from 'react-native'
import styles from './styles'
import StyledCustomTextInput from '../../components/StyledCustomTextInput'

const Login = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>FIT APP</Text>
      <View style={styles.imageContainer}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>
          LOGO DO APEPE VAI AQUI (OU EM CIMA, SEI LÁ)
        </Text>
      </View>
      <View style={{ width: '80%', paddingTop: 20 }}>
        <View style={{ width: '100%' }}>
          <StyledCustomTextInput
            onChangeText={console.log}
            mode={'outlined'}
            placeholder={'E-mail'}
          />
        </View>
      </View>
    </View>
  )
}

export default Login
