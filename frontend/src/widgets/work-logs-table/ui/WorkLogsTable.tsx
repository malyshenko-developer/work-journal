import { useQuery } from '@tanstack/react-query'
import { workLogsApi } from '@/shared/api/work-logs'
import type { WorkLog } from '@/shared/api/types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/table'

interface WorkLogsTableProps {
    dateFrom?: string
    dateTo?: string
    order?: string
}

export function WorkLogsTable({ dateFrom, dateTo, order }: WorkLogsTableProps) {
    const { data: logs, isLoading, isError } = useQuery({
        queryKey: ['work-logs', { dateFrom, dateTo, order }],
        queryFn: () => workLogsApi.getAll({
            date_from: dateFrom,
            date_to: dateTo,
            order,
        }),
    })

    if (isLoading) return <div className="text-center py-8">Загрузка...</div>
    if (isError) return <div className="text-center py-8 text-red-500">Ошибка загрузки данных</div>
    if (!logs?.length) return <div className="text-center py-8 text-muted-foreground">Записей нет</div>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Вид работ</TableHead>
                    <TableHead>Объём</TableHead>
                    <TableHead>Исполнитель</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {logs.map((log: WorkLog) => (
                    <TableRow key={log.id}>
                        <TableCell>{formatDate(log.date)}</TableCell>
                        <TableCell>{log.work_type.name}</TableCell>
                        <TableCell>{log.volume} {log.unit}</TableCell>
                        <TableCell>{log.executor}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('ru-RU')
}