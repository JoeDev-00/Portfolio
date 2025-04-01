document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const taskInput = document.getElementById("task-input")
    const addBtn = document.getElementById("add-btn")
    const tasksList = document.getElementById("tasks-list")
    const tasksCount = document.getElementById("tasks-count")
    const filterBtns = document.querySelectorAll(".filter-btn")
    const clearCompletedBtn = document.getElementById("clear-completed")
  
    // Variables
    let tasks = []
    let currentFilter = "all"
  
    // Functions
    function loadTasks() {
      const savedTasks = localStorage.getItem("tasks")
      if (savedTasks) {
        tasks = JSON.parse(savedTasks)
        renderTasks()
      }
    }
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  
    function addTask(text) {
      if (text.trim() === "") return
  
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
      }
  
      tasks.unshift(newTask)
      saveTasks()
      renderTasks()
      taskInput.value = ""
    }
  
    function deleteTask(id) {
      const taskElement = document.querySelector(`[data-id="${id}"]`)
      taskElement.classList.add("removing")
  
      setTimeout(() => {
        tasks = tasks.filter((task) => task.id !== id)
        saveTasks()
        renderTasks()
      }, 300)
    }
  
    function toggleTaskStatus(id) {
      tasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        }
        return task
      })
  
      saveTasks()
      renderTasks()
    }
  
    function editTask(id, newText) {
      if (newText.trim() === "") return
  
      tasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: newText }
        }
        return task
      })
  
      saveTasks()
      renderTasks()
    }
  
    function clearCompleted() {
      tasks = tasks.filter((task) => !task.completed)
      saveTasks()
      renderTasks()
    }
  
    function filterTasks(filter) {
      currentFilter = filter
  
      filterBtns.forEach((btn) => {
        if (btn.dataset.filter === filter) {
          btn.classList.add("active")
        } else {
          btn.classList.remove("active")
        }
      })
  
      renderTasks()
    }
  
    function renderTasks() {
      let filteredTasks = []
  
      switch (currentFilter) {
        case "active":
          filteredTasks = tasks.filter((task) => !task.completed)
          break
        case "completed":
          filteredTasks = tasks.filter((task) => task.completed)
          break
        default:
          filteredTasks = tasks
      }
  
      tasksList.innerHTML = ""
  
      filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement("li")
        taskElement.classList.add("task-item")
        if (task.completed) {
          taskElement.classList.add("completed")
        }
        taskElement.classList.add("diposition")
        taskElement.dataset.id = task.id
        taskElement.style.animationDelay = `${index * 0.05}s`
  
        taskElement.innerHTML = `
        <label class="task-checkbox">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span class="checkmark"></span>
        </label> 
        <div class="task-number">${index + 1}-
        <span class="task-text">${task.text}</span></div>
        <div class="task-actions">
        <button class="edit-btn">
                          <i class="fas fa-edit"></i>
                      </button>
                      <button class="delete-btn">
                          <i class="fas fa-trash"></i>
                      </button>
                  </div>
              `
  
        tasksList.appendChild(taskElement)
  
        // Add event listeners to the task element
        const checkbox = taskElement.querySelector('input[type="checkbox"]')
        const editBtn = taskElement.querySelector(".edit-btn")
        const deleteBtn = taskElement.querySelector(".delete-btn")
  
        checkbox.addEventListener("change", () => {
          toggleTaskStatus(task.id)
        })
  
        editBtn.addEventListener("click", () => {
          const taskText = taskElement.querySelector(".task-text")
          const currentText = taskText.textContent
  
          // Replace task text with input field
          taskText.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`
          const editInput = taskText.querySelector(".edit-input")
          editInput.focus()
  
          // Set cursor at the end of the text
          editInput.selectionStart = editInput.selectionEnd = editInput.value.length
  
          // Save on enter or blur
          editInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
              editTask(task.id, editInput.value)
            }
          })
  
          editInput.addEventListener("blur", () => {
            editTask(task.id, editInput.value)
          })
        })
  
        deleteBtn.addEventListener("click", () => {
          deleteTask(task.id)
        })
      })
  
      // Update tasks count
      const activeTasks = tasks.filter((task) => !task.completed).length
      tasksCount.textContent = activeTasks
    }
  
    // Event Listeners
    addBtn.addEventListener("click", () => {
      addTask(taskInput.value)
    })
  
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask(taskInput.value)
      }
    })
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterTasks(btn.dataset.filter)
      })
    })
  
    clearCompletedBtn.addEventListener("click", clearCompleted)
  
    // Initialize
    loadTasks()
  })
  
  