import {useState} from "react";

import {WorkLogsTable} from "@/widgets/work-logs-table";
import {FilterWorkLogs} from "@/features/filter-work-logs";

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
            <h1 className="text-2xl font-semibold mb-6">Журнал работ</h1>
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