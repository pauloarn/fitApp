import { Text, TouchableOpacity, View } from 'react-native'
import useStyles from './styles'
import { useState } from 'react'
import { ExerciseRoutineItem } from '../../../../types/exerciseRoutine'
import TreinoOptionComponent from './TreinoOptionComponent'
import OptionsDialogComponent from '../../../../components/OptionsDialogComponent'
import { stringLimit } from '../../../../utils/stringUtils'

interface TreinoItemsProps {
  treino: ExerciseRoutineItem
  excluiTreino: (treino: ExerciseRoutineItem) => void
  editaTreino: (treino: ExerciseRoutineItem) => void
  onClickTreino: (treino: ExerciseRoutineItem) => void
}

const TreinoItems = ({
  treino,
  excluiTreino,
  editaTreino,
  onClickTreino
}: TreinoItemsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const exercicios = treino.exercises.join(', ')
  const styles = useStyles(isMenuOpen)

  return (
    <View style={styles.card}>
      <View style={{ ...styles.cardHeaderView }}>
        <View style={{ width: '90%' }}>
          <Text style={{ fontSize: 15, fontWeight: `bold` }}>
            {treino.routineName}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <TreinoOptionComponent
            style={styles.menuView}
            onPress={() => setIsMenuOpen((prev) => !prev)}
            iconName={'ellipsis-v'}
            isVisible={true}
          />
        </View>
      </View>
      <View style={styles.exercisesContainer}>
        <Text>{stringLimit(exercicios, 100)}</Text>
      </View>
      <View style={styles.startTrainingButtonContainer}>
        <TouchableOpacity
          style={styles.startTrainingButton}
          onPress={() => onClickTreino(treino)}
        >
          <Text style={{ color: 'white' }}>Iniciar Treino</Text>
        </TouchableOpacity>
      </View>
      <OptionsDialogComponent
        isOptionsDialogOpen={isMenuOpen}
        handleCloseDialogOption={() => setIsMenuOpen(false)}
        options={[
          { label: `Editar Treino`, onPress: () => editaTreino(treino) },
          { label: 'Excluir Treino', onPress: () => excluiTreino(treino) }
        ]}
      />
    </View>
  )
}

export default TreinoItems
