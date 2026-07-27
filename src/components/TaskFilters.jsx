function TaskFilters({ currentFilter, onFilterChange, taskCounts }) {
  const filters = ['All', 'Active', 'Completed']

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            currentFilter === filter
              ? 'bg-green-600 text-white'
              : 'bg-white text-black'
          }`}
        >
          {filter} {taskCounts[filter] !== undefined && `(${taskCounts[filter]})`}
        </button>
      ))}
    </div>
  )
}

export default TaskFilters