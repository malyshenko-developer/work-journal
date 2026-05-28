import { apiClient } from './client'
import type { WorkType } from './types'

export const workTypesApi = {
    getAll: () => apiClient<WorkType[]>('/work-types'),
}