import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BaseScreens, RootRouter } from './types/routes'
import { NavigationContainer } from '@react-navigation/native'
import Home from './modules/Home'
import SplashScreen from './modules/SplashScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const screens: BaseScreens<RootRouter>[] = [
  {
    path: 'SplashScreen',
    component: SplashScreen
  },
  {
    path: 'MainRouter',
    component: Home
  }
]

const Principal = () => {
  const Stack = createNativeStackNavigator()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ freezeOnBlur: true }}>
          {screens.map((routes) => (
            <Stack.Screen
              key={'path'}
              options={{
                headerShown: false
              }}
              name={routes.path}
              component={routes.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default Principal
