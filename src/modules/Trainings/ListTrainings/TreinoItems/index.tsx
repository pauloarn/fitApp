import { Text, TouchableOpacity, View } from 'react-native'
import { Treino } from '../../../../database/model/Treino'
import styles from './styles'
import { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

interface TreinoItemsProps {
  treino: Treino
  excluiTreino: (treino: Treino) => void
  editaTreino: (treino: Treino) => void
  onClickTreino: (treino: Treino) => void
}

const TreinoItems = ({
  treino,
  excluiTreino,
  editaTreino,
  onClickTreino
}: TreinoItemsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <TouchableOpacity style={styles.card} onPress={() => onClickTreino(treino)}>
      <View style={{ width: isMenuOpen ? '70%' : '90%' }}>
        <Text>{treino.nome}</Text>
      </View>
      <TouchableOpacity
        style={isMenuOpen ? styles.openMenuView : styles.closeMenuView}
        onPress={() => setIsMenuOpen((prev) => !prev)}
      >
        <FontAwesome5 name={'ellipsis-v'} />
      </TouchableOpacity>
      {isMenuOpen && (
        <TouchableOpacity
          onPress={() => editaTreino(treino)}
          style={styles.editView}
        >
          <FontAwesome5 name={'pen'} color={'white'} size={15} />
        </TouchableOpacity>
      )}
      {isMenuOpen && (
        <TouchableOpacity
          onPress={() => excluiTreino(treino)}
          style={styles.deleteView}
        >
          <FontAwesome5 name={'trash'} color={'white'} size={15} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

export default TreinoItems
