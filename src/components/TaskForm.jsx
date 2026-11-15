import { useState } from 'react'

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState({
    title: task?.title ?? '',
    description: task?.description ?? '',
    assignee: task?.assignee ?? '',
    dueDate: task?.dueDate ?? '',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      setError('Title is required')
      return
    }

    setSaving(true)
    await onSave({
      ...form,
      title: form.title.trim(),
      assignee: form.assignee.trim(),
    })
    setSaving(false)
  }

  const inputClass =
    'min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
  const labelClass = 'mb-1 block text-sm text-gray-700 dark:text-gray-300'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-md space-y-3 overflow-y-auto rounded-t-2xl bg-white p-5 dark:bg-gray-900 sm:rounded-2xl"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {task ? 'Edit task' : 'New task'}
        </h2>

        <div>
          <label htmlFor="title" className={labelClass}>Title *</label>
          <input
            id="title"
            autoFocus
            value={form.title}
            onChange={update('title')}
            className={inputClass}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={update('description')}
            className={`${inputClass} py-2`}
          />
        </div>

        <div>
          <label htmlFor="assignee" className={labelClass}>Assignee</label>
          <input
            id="assignee"
            value={form.assignee}
            onChange={update('assignee')}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="dueDate" className={labelClass}>Due date</label>
          <input
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={update('dueDate')}
            className={inputClass}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-lg border border-gray-300 text-gray-900 dark:border-gray-700 dark:text-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="min-h-11 flex-1 rounded-lg bg-blue-600 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}