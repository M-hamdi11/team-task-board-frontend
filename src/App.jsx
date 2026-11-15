import { useState } from 'react'
import Header from './components/Header'
import Column from './components/columns'
import TaskForm from './components/TaskForm'
import useTasks from './hooks/useTasks'

const COLUMNS = [
  { id: 'todo', title: 'To do' },
  { id: 'inprogress', title: 'In progress' },
  { id: 'done', title: 'Done' },
]

export default function App() {
  const {
    filteredTasks,
    assignees,
    loading,
    error,
    retry,
    search,
    setSearch,
    assignee,
    setAssignee,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useTasks()

  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null) // null = إضافة

  const openAdd = () => {
    setEditingTask(null)
    setFormOpen(true)
  }

  const openEdit = (task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleSave = async (data) => {
    const ok = editingTask
      ? await updateTask(editingTask._id, data)
      : await addTask(data)
    if (ok) setFormOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) deleteTask(id)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header
        search={search}
        onSearchChange={setSearch}
        assignee={assignee}
        onAssigneeChange={setAssignee}
        assignees={assignees}
        onAddClick={openAdd}
      />

      {error && (
        <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between gap-3 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          <span>{error}</span>
          <button onClick={retry} className="font-medium underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <p className="p-8 text-center text-gray-500">Loading...</p>
      ) : (
        <main className="mx-auto grid max-w-7xl gap-4 p-4 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              title={col.title}
              tasks={filteredTasks.filter((t) => t.status === col.id)}
              onMove={moveTask}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </main>
      )}

      {formOpen && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  )
}