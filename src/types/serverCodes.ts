export const listServerCode = [
  'REQUEST_DONE',
  'UNKNOWN_ERROR',
  'PRODUCAO_EXCEDENTE_SEM_JUSTIFICATIVA',
  'PRODUCAO_EXCEDENTE_SEM_JUSTIFICATIVA_PREVISAO',
  'PRECO_EMPREENDIMENTO_GET_ERROR',
  'CIDADE_NAO_ENCONTRADA'
] as const

export type ServerCodeType = (typeof listServerCode)[number] | string
