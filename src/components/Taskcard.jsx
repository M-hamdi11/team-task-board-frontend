import { isOverdue } from '../utils/date'

const STATUSES = [
  { id: 'todo', label: 'To do' },
  { id: 'inprogress', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

export default function TaskCard({ task, onMove, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.status)

  return (
    <article
      className={`rounded-lg border-l-4 p-3 shadow-sm ${
        overdue
          ? 'border-red-500 bg-red-50 dark:bg-red-950'
          : 'border-blue-500 bg-white dark:bg-gray-800'
      }`}
    >
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
        {task.assignee && <span>👤 {task.assignee}</span>}
        {task.dueDate && <span>📅 {task.dueDate}</span>}
        {overdue && (
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
            Overdue
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) => onMove(task._id, e.target.value)}
          aria-label="Move task"
          className="min-h-11 flex-1 rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          className="min-h-11 min-w-11 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
          className="min-h-11 min-w-11 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          🗑️
        </button>
      </div>
    </article>
  )
}