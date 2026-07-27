import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import TaskFilters from './components/TaskFilters'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleAddTask(newTask) {
    setTasks((prev) => [...prev, newTask])
  }

  function handleToggleComplete(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function handleEdit(id, newTitle) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const taskCounts = {
    All: tasks.length,
    Active: tasks.filter((t) => !t.completed).length,
    Completed: tasks.filter((t) => t.completed).length,
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center gap-8 p-6 py-12">
      <h1 className="text-5xl font-extrabold text-green-600">Task Manager</h1>

      <TaskForm onAddTask={handleAddTask} />

      <TaskFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
      />

      <div className="flex flex-col gap-3 w-full max-w-xl">
        {filteredTasks.length === 0 ? (
          <p className="text-green-600 text-center mt-4">
            No tasks here. Add one above!
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App