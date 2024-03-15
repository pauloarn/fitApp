import { TextInput } from 'react-native-paper'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/useRedux'
import { Null } from '../../../types/genericTypes'
import StyledCustomTextInput from '../../../components/StyledCustomTextInput'
import useDebounce from '../../../hooks/useDebounce'
import CategorySelector from '../../../components/CategorySelector'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import styles from './styles'

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
  const [grupoMuscularSelecionado, setGrupoMuscularSelecionado] =
    useState<Null<number>>(null)
  const [tipoEquipamentoSelecionado, setTipoEquipamentoSelecionado] =
    useState<Null<number>>(null)

  const [tipoTreinoSelecionado, setTipoTreinoSelecionado] =
    useState<Null<number>>(null)
  const debouncedSearch = useDebounce(searchText, 600)
  const { grupoMuscular, tipoTreino, tipoEquipamento } = useAppSelector(
    (state) => state.exercisesSlice
  )

  const showClearFilter = useCallback(() => {
    const validation: boolean[] = []
    validation.push(searchText !== '')
    validation.push(grupoMuscularSelecionado !== null)
    validation.push(tipoEquipamentoSelecionado !== null)
    validation.push(tipoTreinoSelecionado !== null)
    return validation.some(Boolean)
  }, [
    searchText,
    grupoMuscularSelecionado,
    tipoEquipamentoSelecionado,
    tipoTreinoSelecionado
  ])

  const willShowClearFilter = showClearFilter()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setSearchText('')
        handleSearchFilter()
        return true
      }
    )
    backHandler.remove()
  }, [])

  useEffect(() => {
    handleSearchFilter()
  }, [debouncedSearch, tipoEquipamentoSelecionado, grupoMuscularSelecionado])
  const handleSearchFilter = () => {
    handleSearch({
      muscleName: searchText,
      tipoTreino: tipoTreinoSelecionado,
      muscleGroup: grupoMuscularSelecionado,
      tipoEquipamento: tipoEquipamentoSelecionado
    })
  }

  function handleResetSearchFilter() {
    setSearchText('')
    setGrupoMuscularSelecionado(null)
    setTipoEquipamentoSelecionado(null)
  }

  return (
    <View style={styles.filterArea}>
      <StyledCustomTextInput
        placeholder={'Procurar Exercício'}
        mode={'outlined'}
        onSubmitEditing={handleSearchFilter}
        left={
          <TextInput.Icon
            icon={() => (
              <FontAwesome5 name={'search'} color={'white'} size={15} />
            )}
          />
        }
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.categorySelectorArea}>
        <View
          style={{
            width: willShowClearFilter ? '42%' : '48%',
            height: heightPercentageToDP(4)
          }}
        >
          <CategorySelector
            fieldLabel={'Tipo de Equipamento'}
            noSelectedLabel={'Todos Equipamentos'}
            onSelect={(selected) => {
              setTipoEquipamentoSelecionado(selected.value)
            }}
            options={tipoEquipamento}
            selectedOption={tipoEquipamentoSelecionado}
          />
        </View>
        <View style={{ width: willShowClearFilter ? '42%' : '48%' }}>
          <CategorySelector
            fieldLabel={'Músculo'}
            noSelectedLabel={'Todos os Músculos'}
            onSelect={(selected) => {
              setGrupoMuscularSelecionado(selected.value)
            }}
            options={grupoMuscular}
            selectedOption={grupoMuscularSelecionado}
          />
        </View>
        {willShowClearFilter ? (
          <TouchableOpacity
            onPress={() => handleResetSearchFilter()}
            style={styles.resetFilterButton}
          >
            <FontAwesome size={20} name={'close'} color={`white`} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export default SearchArea
