export interface LoadDataType {
  data: [] | EventType[]
  loading: boolean
  error: boolean
}

export interface EventType {
  id?: string
  name: string
  type: string
  dateTime: number
}