import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'

interface AnotacoesAreaProps {
  isObservacaoAreaOpen: boolean
  setIsObservacaoAreaOpen: (isOpen: boolean) => void
  observacao: string
}

const AnotacoesArea = ({
  isObservacaoAreaOpen,
  setIsObservacaoAreaOpen,
  observacao
}: AnotacoesAreaProps) => {
  return (
    <View
      style={{
        height: isObservacaoAreaOpen ? '20%' : '6%',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10
      }}
    >
      <TouchableOpacity
        onPress={() => setIsObservacaoAreaOpen(!isObservacaoAreaOpen)}
        style={{
          width: '98%',
          padding: 5,
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
          alignItems: `center`
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5
          }}
        >
          Observações
        </Text>
        <FontAwesome5
          name={isObservacaoAreaOpen ? 'arrow-up' : 'arrow-down'}
          size={15}
        />
      </TouchableOpacity>
      {isObservacaoAreaOpen && (
        <ScrollView>
          <Text>{observacao}</Text>
        </ScrollView>
      )}
    </View>
  )
}

export default AnotacoesArea
