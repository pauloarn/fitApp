import { BaseScreens, RandomTrainingRouter } from '../../types/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GenerateRandom from './GenerateRandom'
import TreinoDetalhe from '../Trainings/TreinoDetalhe'

const screens: BaseScreens<RandomTrainingRouter>[] = [
  {
    path: 'Generate',
    component: GenerateRandom
  },
  {
    path: 'Visualizar',
    component: TreinoDetalhe
  }
]

const Trainings = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ freezeOnBlur: true }}>
      {screens.map((routes) => (
        <Stack.Screen
          key={'path'}
          options={{
            headerShown: !!routes.headerComponent,
            header: routes.headerComponent
          }}
          name={routes.path}
          component={routes.component}
        />
      ))}
    </Stack.Navigator>
  )
}

export default Trainings
