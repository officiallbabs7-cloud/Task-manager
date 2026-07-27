import { useState } from 'react'

const priorityColors = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
}

function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  function handleSave() {
    if (!editedTitle.trim()) return
    onEdit(task.id, editedTitle)
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 w-full max-w-xl">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="w-5 h-5 cursor-pointer accent-green-600"
      />

      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        ) : (
          <p
            className={`font-medium ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </p>
        )}

        <div className="flex gap-2 mt-1 items-center">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-500">Due {task.dueDate}</span>
          )}
        </div>
      </div>

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-green-600 hover:text-green-800 font-medium cursor-pointer"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
        >
          Edit
        </button>
      )}

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
      >
        Delete
      </button>
    </div>
  )
}

export default TaskItem