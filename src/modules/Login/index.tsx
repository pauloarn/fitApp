import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useState } from 'react'
import Toast from 'react-native-root-toast'
import { sessionService } from '../../services/session/sessionService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootRouter } from '../../types/routes'
import useFormElement from '../../components/FormElement/useFormElement'
import FormTextField from '../../components/FormElement/FormTextField'
import { z } from '../../utils/zodMessageParseUtils'

interface LoginForm {
  userEmail: string
  userPassword: string
}

const LoginSchema: z.Schema<LoginForm> = z.object({
  userEmail: z.string().email(),
  userPassword: z.string()
})
const Login = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootRouter>>()

  const { control, submit, trigger, getValues } = useFormElement<{
    userEmail: string
    userPassword: string
  }>({
    defaultValues: {
      userEmail: '',
      userPassword: ''
    },
    validation: LoginSchema,
    validationOnStart: false
  })

  const [isLogginIn, setIsLogginIn] = useState(false)
  const { createSession } = sessionService()

  const { show: toastShow } = Toast
  const handleLogin = async (data: LoginForm) => {
    const isValid = await trigger()
    if (!isValid) {
      return
    }
    setIsLogginIn(true)
    try {
      const response = await createSession(data)
      if (response.ok && response.data) {
        await AsyncStorage.setItem(
          config.localStorageTokenName,
          response.data.body.authToken
        )
        setIsLogginIn(false)
        navigate('MainRouter')
      } else {
        setIsLogginIn(false)
        toastShow('Falha ao efetuar login')
      }
    } catch (e) {
      setIsLogginIn(false)
      toastShow('Falha ao efetuar login')
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>FIT APP</Text>
      {/*//TODO: AJUSTAR LOGO DO APEPE*/}
      <View style={styles.imageContainer}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>
          LOGO DO APEPE VAI AQUI (OU EM CIMA, SEI LÁ)
        </Text>
      </View>
      <View style={{ width: '80%', paddingTop: 20 }}>
        <View style={{ width: '100%' }}>
          <FormTextField
            name={'userEmail'}
            control={control}
            placeholder={'E-mail'}
            mode={'outlined'}
          />
        </View>
        <View style={{ width: '100%', marginTop: 20 }}>
          <FormTextField
            isPassword={true}
            name={'userPassword'}
            control={control}
            placeholder={'Password'}
            mode={'outlined'}
          />
        </View>
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          {isLogginIn ? (
            <ActivityIndicator size={30} />
          ) : (
            <TouchableOpacity onPress={() => submit(handleLogin)()}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default Login
