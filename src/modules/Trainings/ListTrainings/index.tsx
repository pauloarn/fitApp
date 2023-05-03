import { FlatList, Text, View } from 'react-native'
import styles from './styles'
import { Treino } from '../../../database/model/Treino'
import ListaVaziaText from '../../../components/ListaVaziaText'
import FloatingActionButton from '../../../components/FloatingActionButton'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootRouter, TrainingRouter } from '../../../types/routes'
import { useState } from 'react'
import TreinoService from '../../../database/services/TreinoService'
import TreinoItems from './TreinoItems'
import { useAppDispatch } from '../../../hooks/useRedux'
import { setTituloTreinoEdit } from '../../../redux/slices/treinoSlice'
import { setIsModalOpen } from '../../../redux/slices/modalSlice'

const CreateTraining = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<TrainingRouter>>()
  const { addListener, isFocused } =
    useNavigation<NativeStackNavigationProp<RootRouter>>()
  const dispatch = useAppDispatch()
  const [treinos, setTreinos] = useState<Treino[]>([])
  const { getTreinos, removeTreino } = TreinoService()
  addListener('focus', async () => {
    if (isFocused()) {
      setTreinos(await getTreinos())
    }
  })
  const handleEditaTreino = (treinoEdit: Treino) => {
    dispatch(setTituloTreinoEdit('Editar Treino'))
    setIsModalOpen(false)
    navigate('CreateTraining', { treinoId: treinoEdit.id })
  }

  const handleCriaTreino = () => {
    dispatch(setTituloTreinoEdit('Cadastrar Treino'))
    navigate('CreateTraining', { treinoId: null })
  }

  const handleExluiTreino = async (treino: Treino) => {
    await removeTreino(treino)
    setTreinos(await getTreinos())
  }

  const handleOpenTreino = (treino: Treino) => {
    navigate('DetalheTreino', { treinoId: treino.id })
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ color: 'white', fontSize: 25 }}>Treinos</Text>
      </View>
      <FlatList<Treino>
        data={treinos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ListaVaziaText text={'Nenhum treino cadastrado'} />
        }
        style={{ width: '100%' }}
        renderItem={(e) => (
          <TreinoItems
            onClickTreino={handleOpenTreino}
            key={e.item.id}
            editaTreino={handleEditaTreino}
            treino={e.item}
            excluiTreino={handleExluiTreino}
          />
        )}
      />
      <FloatingActionButton onPress={handleCriaTreino} />
    </View>
  )
}

export default CreateTraining
