import {useState} from "react";

import {WorkLogsTable} from "@/widgets/work-logs-table";

import {FilterWorkLogs} from "@/features/filter-work-logs";
import {CreateWorkLogDialog} from "@/features/create-work-log";

function App() {
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [order, setOrder] = useState('asc')

    const handleReset = () => {
        setDateFrom('')
        setDateTo('')
        setOrder('asc')
    }


    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Журнал работ</h1>
                <CreateWorkLogDialog />
            </div>
            <FilterWorkLogs
                dateFrom={dateFrom}
                dateTo={dateTo}
                order={order}
                onDateFromChange={setDateFrom}
                onDateToChange={setDateTo}
                onOrderToggle={() => setOrder(o => o === 'asc' ? 'desc' : 'asc')}
                onReset={handleReset}
            />
            <WorkLogsTable
                dateFrom={dateFrom}
                dateTo={dateTo}
                order={order}
            />
        </div>
    )
}

export default App