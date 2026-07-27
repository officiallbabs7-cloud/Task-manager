import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    // Combine date + time into one ISO-like string, or leave separate — your choice
    const combinedDueDate = dueDate && dueTime ? `${dueDate}T${dueTime}` : dueDate

    onAddTask({
      id: Date.now(),
      title,
      priority,
      dueDate: combinedDueDate,
      completed: false,
    })

    setTitle('')
    setPriority('Medium')
    setDueDate('')
    setDueTime('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
      />

      <div className="flex gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 cursor-pointer"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 cursor-pointer"
        />

        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm