import { useEffect, useState } from "react"

export default function Header({
    search,
    onSearchChange,
    assignee,
    onAssigneeChange,
    assignees,
    onAddClick,
}) {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark)
    }, [dark])

    return (
        <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 p-4 md:flex-row md:items-center">
                {/* العنوان + زرار الدارك */}
                <div className="flex items-center justify-between md:mr-auto">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Team Task Board
                    </h1>
                    <button
                        onClick={() => setDark(!dark)}
                        aria-label="Toggle dark mode"
                        className="min-h-11 min-w-11 rounded-lg border border-gray-300 text-lg dark:border-gray-700 md:hidden"
                    >
                        {dark ? '☀️' : '🌙'}
                    </button>
                </div>

                {/* البحث */}
                <input
                    type="search"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by title..."
                    className="min-h-11 rounded-lg border border-gray-300 bg-white px-3 text-gray-900 placeholder-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 md:w-64"
                />

                {/* فلتر الـ assignee */}
                <select
                    value={assignee}
                    onChange={(e) => onAssigneeChange(e.target.value)}
                    className="min-h-11 rounded-lg border border-gray-300 bg-white px-3 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                    <option value="">All assignees</option>
                    {assignees.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                {/* زرار الإضافة */}
                <button
                    onClick={onAddClick}
                    className="min-h-11 rounded-lg bg-blue-600 px-4 font-medium text-white hover:bg-blue-700"
                >
                    + Add task
                </button>

                {/* زرار الدارك على الشاشات الكبيرة */}
                <button
                    onClick={() => setDark(!dark)}
                    aria-label="Toggle dark mode"
                    className="hidden min-h-11 min-w-11 rounded-lg border border-gray-300 text-lg dark:border-gray-700 md:block"
                >
                    {dark ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    )
}