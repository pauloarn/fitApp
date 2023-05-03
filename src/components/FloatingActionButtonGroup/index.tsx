import { FAB } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Props } from 'react-native-paper/lib/typescript/components/FAB/FABGroup'
import { defaults } from '../../defaults'

interface ActionsProps {
  iconName: string
  label?: string
  onPress: () => void
}

interface FloatingActionButtonGroupProps {
  mainIconName: string
  actions: ActionsProps[]
}
const FloatingActionButtonGroup = ({
  mainIconName,
  actions
}: FloatingActionButtonGroupProps) => {
  const [isButtonOpen, setIsButtonOpen] = useState(false)

  const getIcons = (): React.ReactNode => {
    return <FontAwesome5 name={'plus'} size={22} color={'white'} />
  }
  const getActions = (): Props['actions'] => {
    const actionsList: Props['actions'] = []
    actions.forEach((ac) => {
      actionsList.push({
        //@ts-ignore
        icon: (a, b) => (
          <FontAwesome5 name={ac.iconName} size={25} color={'white'} />
        ),
        style: {
          paddingLeft: 5,
          backgroundColor: defaults.corBotaoFab
        },
        label: ac.label,
        containerStyle: {
          backgroundColor: defaults.corBotaoFab,
          borderRadius: 10
        },
        labelStyle: {
          color: 'white'
        },
        onPress: ac.onPress
      })
    })
    return actionsList
  }

  return (
    <FAB.Group
      backdropColor={'transparent'}
      actions={getActions()}
      icon={() => (
        <FontAwesome5
          name={mainIconName}
          size={20}
          color={'white'}
          style={{
            transform: [{ rotate: isButtonOpen ? '90deg' : '180deg' }]
          }}
        />
      )}
      open={isButtonOpen}
      onStateChange={() => setIsButtonOpen((prev) => !prev)}
      visible
      fabStyle={{ backgroundColor: defaults.corBotaoFab }}
    />
  )
}

export default FloatingActionButtonGroup
