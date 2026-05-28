import { apiClient } from './client'
import type { WorkLog, WorkLogInput } from './types'

export const workLogsApi = {
    getAll: (params?: { date_from?: string; date_to?: string; order?: string }) => {
        const query = new URLSearchParams(params as Record<string, string>).toString()
        return apiClient<WorkLog[]>(`/logs${query ? `?${query}` : ''}`)
    },

    create: (data: WorkLogInput) =>
        apiClient<WorkLog>('/logs', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id: number, data: WorkLogInput) =>
        apiClient<WorkLog>(`/logs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: number) =>
        apiClient<{ message: string }>(`/logs/${id}`, {
            method: 'DELETE',
        }),
}