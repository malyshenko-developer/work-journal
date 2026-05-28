import {WorkLogsTable} from "@/widgets/work-logs-table";

function App() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-semibold mb-6">Журнал работ</h1>
            <WorkLogsTable />
        </div>
    )
}

export default App