import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import Principal from './src/Principal'
import { Provider as PaperProvider } from 'react-native-paper'
import { LogBox, StatusBar } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { RootSiblingParent } from 'react-native-root-siblings'

const App = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    ).catch(console.log)
    LogBox.ignoreAllLogs()
  }, [])
  return (
    <React.StrictMode>
      <StatusBar backgroundColor={'#2c2c2c'} barStyle={'light-content'} />
      <PaperProvider>
        <RootSiblingParent>
          <Provider store={store}>
            <Principal />
          </Provider>
        </RootSiblingParent>
      </PaperProvider>
    </React.StrictMode>
  )
}
export default App
