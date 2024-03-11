import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { FontAwesome5 } from '@expo/vector-icons'
import { useState } from 'react'
import { ExercicioSetup } from '../../../../database/model/ExercicioTreinoConfig'
import EditaConfigTreinoDialog from './EditaConfigTreinoDialog'
import { ExerciseInRoutine } from '../../../../types/exerciseRoutine'
import ConditionalRender from '../../../../components/ConditionalRender'

interface ExercicioTreinoProps {
  exercicio: ExerciseInRoutine
  excluiExercicio: (exercicioId: number) => void
  handleEditExercicio: (exercicioId: number, exercicio: ExercicioSetup) => void
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
        <Text>{exercicio.execise.name}</Text>
      </View>
      <TouchableOpacity
        style={isMenuOpen ? styles.openMenuView : styles.closeMenuView}
        onPress={() => setIsMenuOpen((prev) => !prev)}
      >
        <FontAwesome5 name={'ellipsis-v'} />
      </TouchableOpacity>
      <ConditionalRender validation={isMenuOpen}>
        <TouchableOpacity
          onPress={() => setIsModalOpen(true)}
          style={styles.editView}
        >
          <FontAwesome5 name={'pen'} color={'white'} size={15} />
        </TouchableOpacity>
      </ConditionalRender>
      <ConditionalRender validation={isMenuOpen}>
        <TouchableOpacity
          onPress={() => excluiExercicio(exercicio.routineExerciseId)}
          style={styles.deleteView}
        >
          <FontAwesome5 name={'trash'} color={'white'} size={15} />
        </TouchableOpacity>
      </ConditionalRender>
      <EditaConfigTreinoDialog
        isOpen={isModalOpen}
        exercicio={{
          carga: exercicio.exerciseWeight,
          series: exercicio.series,
          repeticoes: exercicio.repetitions
        }}
        nomeExercicio={exercicio.execise.nome}
        handleClose={() => setIsModalOpen(false)}
        handleSave={(ex) =>
          handleEditExercicio(exercicio.routineExerciseId, ex)
        }
      />
    </TouchableOpacity>
  )
}

export default ExercicioTreino
