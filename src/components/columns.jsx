import TaskCard from './Taskcard'

export default function Column({ title, tasks, onMove, onEdit, onDelete }) {
  return (
    <section className="rounded-xl bg-gray-100 p-3 dark:bg-gray-900">
      <h2 className="mb-3 flex items-center justify-between font-semibold text-gray-800 dark:text-gray-200">
        {title}
        <span className="rounded-full bg-gray-300 px-2 py-0.5 text-sm dark:bg-gray-700">
          {tasks.length}
        </span>
      </h2>

      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}