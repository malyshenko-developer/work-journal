import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { workLogSchema, type WorkLogFormValues, WorkLogForm } from '@/entities/work-log'
import { workLogsApi } from '@/shared/api/work-logs'
import type { WorkLog } from '@/shared/api/types'
import { Button } from '@/shared/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog'

interface EditWorkLogDialogProps {
    workLog: WorkLog
}

export function EditWorkLogDialog({ workLog }: EditWorkLogDialogProps) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const form = useForm<WorkLogFormValues>({
        resolver: zodResolver(workLogSchema),
        defaultValues: {
            date: workLog.date.split('T')[0],
            work_type_id: workLog.work_type_id,
            volume: workLog.volume,
            unit: workLog.unit,
            executor: workLog.executor,
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (values: WorkLogFormValues) => workLogsApi.update(workLog.id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['work-logs'] })
            setOpen(false)
        },
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    Редактировать
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать запись</DialogTitle>
                </DialogHeader>
                <WorkLogForm
                    form={form}
                    onSubmit={(values) => mutate(values)}
                    onCancel={() => setOpen(false)}
                    isPending={isPending}
                    defaultWorkTypeId={workLog.work_type_id}
                />
            </DialogContent>
        </Dialog>
    )
}