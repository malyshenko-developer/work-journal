import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/shared/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'

import { workLogsApi } from '@/shared/api/work-logs'

interface DeleteWorkLogButtonProps {
    id: number
}

export function DeleteWorkLogButton({ id }: DeleteWorkLogButtonProps) {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: () => workLogsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['work-logs'] })
        },
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    Удалить
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя отменить.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => mutate()}
                        disabled={isPending}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        {isPending ? 'Удаление...' : 'Удалить'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}