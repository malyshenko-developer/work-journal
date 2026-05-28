import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

interface FilterWorkLogsProps {
    dateFrom: string
    dateTo: string
    order: string
    onDateFromChange: (value: string) => void
    onDateToChange: (value: string) => void
    onOrderToggle: () => void
    onReset: () => void
}

export function FilterWorkLogs({
                                   dateFrom,
                                   dateTo,
                                   order,
                                   onDateFromChange,
                                   onDateToChange,
                                   onOrderToggle,
                                   onReset,
                               }: FilterWorkLogsProps) {
    return (
        <div className="flex items-end gap-4 mb-6">
            <div className="flex flex-col gap-1">
                <label className="text-sm text-muted-foreground">Дата с</label>
                <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => onDateFromChange(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-muted-foreground">Дата по</label>
                <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                />
            </div>
            <Button variant="outline" onClick={onOrderToggle}>
                Дата {order === 'asc' ? '↑' : '↓'}
            </Button>
            <Button variant="ghost" onClick={onReset}>
                Сбросить
            </Button>
        </div>
    )
}