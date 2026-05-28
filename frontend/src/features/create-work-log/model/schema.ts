import { z } from 'zod'

export const workLogSchema = z.object({
    date: z.string().min(1, 'Дата обязательна'),
    work_type_id: z.coerce.number().min(1, 'Выберите вид работ'),
    volume: z.coerce.number().positive('Объём должен быть больше нуля'),
    unit: z.string().min(1, 'Единица измерения обязательна'),
    executor: z.string().min(1, 'Исполнитель обязателен'),
})

export type WorkLogFormValues = z.infer<typeof workLogSchema>