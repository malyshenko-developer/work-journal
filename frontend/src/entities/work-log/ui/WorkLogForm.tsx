import type { UseFormReturn } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import type { WorkLogFormValues } from '../model/schema'
import { workTypesApi } from '@/shared/api/work-types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select'

interface WorkLogFormProps {
    form: UseFormReturn<WorkLogFormValues>
    onSubmit: (values: WorkLogFormValues) => void
    onCancel: () => void
    isPending: boolean
    defaultWorkTypeId?: number
}

export function WorkLogForm({
                                form,
                                onSubmit,
                                onCancel,
                                isPending,
                                defaultWorkTypeId,
                            }: WorkLogFormProps) {
    const { data: workTypes } = useQuery({
        queryKey: ['work-types'],
        queryFn: workTypesApi.getAll,
    })

    const { register, handleSubmit, setValue, formState: { errors } } = form

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Дата</label>
                <Input type="date" {...register('date')} />
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Вид работ</label>
                <Select
                    defaultValue={defaultWorkTypeId ? String(defaultWorkTypeId) : undefined}
                    onValueChange={(v) => setValue('work_type_id', Number(v))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите вид работ" />
                    </SelectTrigger>
                    <SelectContent>
                        {workTypes?.map((wt) => (
                            <SelectItem key={wt.id} value={String(wt.id)}>
                                {wt.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.work_type_id && <p className="text-sm text-red-500">{errors.work_type_id.message}</p>}
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium">Объём</label>
                    <Input type="number" step="0.01" {...register('volume', { valueAsNumber: true })} />
                    {errors.volume && <p className="text-sm text-red-500">{errors.volume.message}</p>}
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium">Единица измерения</label>
                    <Input placeholder="м³, м², шт" {...register('unit')} />
                    {errors.unit && <p className="text-sm text-red-500">{errors.unit.message}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Исполнитель</label>
                <Input placeholder="Иванов И.И." {...register('executor')} />
                {errors.executor && <p className="text-sm text-red-500">{errors.executor.message}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Отмена
                </Button>
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Сохранение...' : 'Сохранить'}
                </Button>
            </div>
        </form>
    )
}