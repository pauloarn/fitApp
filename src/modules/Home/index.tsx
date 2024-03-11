import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootRouter, TabScreens, TabsRouter } from '../../types/routes'
import ListExercises from '../ListExercises'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome5 } from '@expo/vector-icons'
import Randomize from '../Randomize'
import Trainings from '../Trainings'
import { defaults } from '../../defaults'

const Tab = createBottomTabNavigator()

const tabs: TabScreens<TabsRouter>[] = [
  {
    path: 'Trainings',
    component: Trainings,
    label: 'TREINOS',
    icon: 'dumbbell'
  },
  {
    path: 'Randomize',
    component: Randomize,
    label: 'GERAR TREINO',
    icon: 'random'
  },
  {
    path: 'Search',
    component: ListExercises,
    label: 'EXERCÍCIOS',
    icon: 'search'
  }
]

const Home = () => {
  const { addListener } = useNavigation<NativeStackNavigationProp<RootRouter>>()
  addListener('beforeRemove', (e) => {
    e.preventDefault()
  })

  const renderTabBarIcon = (
    focused: boolean,
    color: string,
    size: number,
    iconName: string
  ) => {
    return <FontAwesome5 name={iconName} size={20} color={color} />
  }

  return (
    <Tab.Navigator
      initialRouteName={'Trainings'}
      screenOptions={{
        tabBarStyle: {
          height: '7%'
        }
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.path}
          name={tab.path}
          component={tab.component}
          options={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarLabel: tab.label,
            freezeOnBlur: true,
            tabBarActiveBackgroundColor: defaults.corBackGround,
            tabBarInactiveBackgroundColor: defaults.corBackGround,
            tabBarIcon: (props) =>
              renderTabBarIcon(
                props.focused,
                props.color,
                props.size,
                tab.icon
              ),
            tabBarItemStyle: { paddingVertical: '2%', elevation: 2 },
            tabBarLabelStyle: { fontSize: 12 },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: defaults.corInactiveTab
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
export default Home
