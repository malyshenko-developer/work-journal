export interface WorkType {
    id: number
    name: string
}

export interface WorkLog {
    id: number
    date: string
    work_type_id: number
    work_type: WorkType
    volume: number
    unit: string
    executor: string
    created_at: string
}

export interface WorkLogInput {
    date: string
    work_type_id: number
    volume: number
    unit: string
    executor: string
}