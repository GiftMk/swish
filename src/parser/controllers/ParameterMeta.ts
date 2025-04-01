export type ParameterType = 'query' | 'body' | 'path'

export type ParameterMeta = {
	type: ParameterType
	name: string
} & (QueryParameterMeta | RequestBodyParameterMeta | PathVariableParameterMeta)

export type QueryParameterMeta = {
	type: 'query'
	key: string
}

export type RequestBodyParameterMeta = {
	type: 'body'
}

export type PathVariableParameterMeta = {
	type: 'path'
}
