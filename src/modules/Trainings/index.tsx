import { BaseScreens, TrainingRouter } from '../../types/routes'
import ListTrainings from './ListTrainings'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateTraining from './CreateTraining'
import ListExercises from '../ListExercises'
import TreinoDetalhe from './TreinoDetalhe'

const screens: BaseScreens<TrainingRouter>[] = [
  {
    path: 'ListTrainings',
    component: ListTrainings
  },
  {
    path: 'CreateTraining',
    component: CreateTraining
  },
  {
    path: 'SelecionaExercicio',
    component: ListExercises
  },
  {
    path: 'DetalheTreino',
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
