import { Button, TextInput } from 'react-native-paper'
import { TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useState } from 'react'
import styles from './styles'
import DropDown from '../../../components/DropDown'
import { useAppSelector } from '../../../hooks/useRedux'
import { Null } from '../../../types/genericTypes'
import StyledCustomTextInput from '../../../components/StyledCustomTextInput'
import Divider from '../../../components/Divider'

export interface SearchFilterForm {
  muscleName: string
  muscleGroup: Null<number>
  tipoTreino: Null<number>
  tipoEquipamento: Null<number>
}

interface SearchAreaProps {
  handleSearch: (searchForm: SearchFilterForm) => void
}

const SearchArea = ({ handleSearch }: SearchAreaProps) => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [grupoMuscularSelecionado, setGrupoMuscularSelecionado] =
    useState<Null<number>>(null)
  const [tipoEquipamentoSelecionado, setTipoEquipamentoSelecionado] =
    useState<Null<number>>(null)

  const [tipoTreinoSelecionado, setTipoTreinoSelecionado] =
    useState<Null<number>>(null)
  const ref = React.createRef<View>()
  const { grupoMuscular, tipoTreino, tipoEquipamento } = useAppSelector(
    (state) => state.exercisesSlice
  )
  const handleOpenFilter = () => {
    setIsModalOpen(true)
  }

  const handleSearchFilter = () => {
    handleSearch({
      muscleName: searchText,
      tipoTreino: tipoTreinoSelecionado,
      muscleGroup: grupoMuscularSelecionado,
      tipoEquipamento: tipoEquipamentoSelecionado
    })
    setIsModalOpen(false)
  }

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 5,
        marginBottom: 10
      }}
    >
      <StyledCustomTextInput
        placeholder={'Buscar Exercício'}
        mode={'outlined'}
        onFocus={handleOpenFilter}
        onSubmitEditing={handleSearchFilter}
        left={
          <TextInput.Icon
            icon={() => (
              <FontAwesome5 name={'search'} color={'white'} size={15} />
            )}
          />
        }
        right={
          <TextInput.Icon
            icon={() => (
              <TouchableOpacity onPress={() => setIsModalOpen((prev) => !prev)}>
                <FontAwesome5
                  name={isModalOpen ? 'arrow-up' : 'arrow-down'}
                  color={'white'}
                  size={15}
                />
              </TouchableOpacity>
            )}
          />
        }
        outlineStyle={{
          borderWidth: 1,
          borderBottomLeftRadius: isModalOpen ? 0 : undefined,
          borderBottomRightRadius: isModalOpen ? 0 : undefined,
          borderBottomWidth: isModalOpen ? 0 : 1
        }}
        value={searchText}
        onChangeText={setSearchText}
      />
      {isModalOpen && (
        <View ref={ref} style={styles.filterArea}>
          <DropDown
            selectedValue={grupoMuscularSelecionado}
            onValueChange={(a) => {
              setGrupoMuscularSelecionado(a)
            }}
            label={'Grupo Muscular'}
            items={grupoMuscular}
          />
          <Divider y={1} />
          <DropDown
            selectedValue={tipoTreinoSelecionado}
            onValueChange={(a) => {
              setTipoTreinoSelecionado(a)
            }}
            label={'Tipo Treino'}
            items={tipoTreino}
          />
          <Divider y={1} />
          <DropDown
            selectedValue={tipoEquipamentoSelecionado}
            onValueChange={(a) => {
              setTipoEquipamentoSelecionado(a)
            }}
            label={'Tipo Equipamento'}
            items={tipoEquipamento}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <Button onPress={handleSearchFilter} textColor={'white'}>
              Buscar
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}

export default SearchArea
