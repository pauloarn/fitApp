import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { FontAwesome5 } from '@expo/vector-icons'
import { useState } from 'react'
import {
  ExercicioSetup,
  ExercicioTreinoConfig
} from '../../../../database/model/ExercicioTreinoConfig'
import EditaConfigTreinoDialog from './EditaConfigTreinoDialog'

interface ExercicioTreinoProps {
  exercicio: ExercicioTreinoConfig
  excluiExercicio: (exercicio: ExercicioTreinoConfig) => void
  handleEditExercicio: (exercicioId: string, exercicio: ExercicioSetup) => void
}
const ExercicioTreino = ({
  exercicio,
  excluiExercicio,
  handleEditExercicio
}: ExercicioTreinoProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <TouchableOpacity style={styles.card}>
      <View style={{ width: isMenuOpen ? '70%' : '90%' }}>
        <Text>{exercicio.nomeExercicio}</Text>
      </View>
      <TouchableOpacity
        style={isMenuOpen ? styles.openMenuView : styles.closeMenuView}
        onPress={() => setIsMenuOpen((prev) => !prev)}
      >
        <FontAwesome5 name={'ellipsis-v'} />
      </TouchableOpacity>
      {isMenuOpen && (
        <TouchableOpacity
          onPress={() => setIsModalOpen(true)}
          style={styles.editView}
        >
          <FontAwesome5 name={'pen'} color={'white'} size={15} />
        </TouchableOpacity>
      )}
      {isMenuOpen && (
        <TouchableOpacity
          onPress={() => excluiExercicio(exercicio)}
          style={styles.deleteView}
        >
          <FontAwesome5 name={'trash'} color={'white'} size={15} />
        </TouchableOpacity>
      )}
      <EditaConfigTreinoDialog
        isOpen={isModalOpen}
        exercicio={exercicio.exercicioSet}
        nomeExercicio={exercicio.nomeExercicio}
        handleClose={() => setIsModalOpen(false)}
        handleSave={(ex) => handleEditExercicio(exercicio.id, ex)}
      />
    </TouchableOpacity>
  )
}

export default ExercicioTreino
