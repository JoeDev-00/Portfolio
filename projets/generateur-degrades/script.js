document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const gradientPreview = document.getElementById("gradient-preview")
    const gradientTypeInputs = document.querySelectorAll('input[name="gradient-type"]')
    const directionButtons = document.querySelectorAll(".direction-btn")
    const angleInput = document.getElementById("angle-input")
    const colorsContainer = document.getElementById("colors-container")
    const addColorBtn = document.getElementById("add-color-btn")
    const cssCode = document.getElementById("css-code")
    const copyBtn = document.getElementById("copy-btn")
    const saveBtn = document.getElementById("save-btn")
    const randomBtn = document.getElementById("random-btn")
    const resetBtn = document.getElementById("reset-btn")
    const savedGradientsGrid = document.getElementById("saved-gradients-grid")
    const notification = document.getElementById("notification")
    const notificationText = document.getElementById("notification-text")
    const directionControl = document.getElementById("direction-control")
    const radialOptions = document.getElementById("radial-options")
    const conicOptions = document.getElementById("conic-options")
    const radialShape = document.getElementById("radial-shape")
    const radialPosition = document.getElementById("radial-position")
    const conicAngle = document.getElementById("conic-angle")
    const conicPosition = document.getElementById("conic-position")
  
    // Variables
    let currentGradientType = "linear"
    let currentDirection = "to bottom"
    let currentAngle = 180
    let currentRadialShape = "circle"
    let currentRadialPosition = "center"
    let currentConicAngle = 0
    let currentConicPosition = "center"
    const savedGradients = JSON.parse(localStorage.getItem("savedGradients")) || []
  
    // Functions
    function updateGradient() {
      let gradientCSS = ""
  
      // Get colors
      const colorStops = []
      const colorInputs = colorsContainer.querySelectorAll(".color-stop")
  
      colorInputs.forEach((colorInput) => {
        const color = colorInput.querySelector(".color-picker").value
        const position = colorInput.querySelector(".color-position").value
        colorStops.push(`${color} ${position}%`)
      })
  
      // Create gradient CSS based on type
      switch (currentGradientType) {
        case "linear":
          if (currentDirection.startsWith("to ")) {
            gradientCSS = `linear-gradient(${currentDirection}, ${colorStops.join(", ")})`
          } else {
            gradientCSS = `linear-gradient(${currentAngle}deg, ${colorStops.join(", ")})`
          }
          break
        case "radial":
          gradientCSS = `radial-gradient(${currentRadialShape} at ${currentRadialPosition}, ${colorStops.join(", ")})`
          break
        case "conic":
          gradientCSS = `conic-gradient(from ${currentConicAngle}deg at ${currentConicPosition}, ${colorStops.join(", ")})`
          break
      }
  
      // Update preview
      gradientPreview.style.background = gradientCSS
  
      // Update CSS code
      cssCode.textContent = `.gradient {\n  background: ${gradientCSS};\n}`
    }
  
    function addColorStop() {
      const colorStops = colorsContainer.querySelectorAll(".color-stop")
  
      // Generate a random color
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
  
      // Create new color stop
      const newColorStop = document.createElement("div")
      newColorStop.classList.add("color-stop")
  
      newColorStop.innerHTML = `
              <input type="color" value="${randomColor}" class="color-picker">
              <input type="number" value="50" min="0" max="100" class="color-position">
              <span>%</span>
              <button class="remove-color">
                  <i class="fas fa-times"></i>
              </button>
          `
  
      // Add event listeners
      const colorPicker = newColorStop.querySelector(".color-picker")
      const colorPosition = newColorStop.querySelector(".color-position")
      const removeBtn = newColorStop.querySelector(".remove-color")
  
      colorPicker.addEventListener("input", updateGradient)
      colorPosition.addEventListener("input", updateGradient)
      removeBtn.addEventListener("click", () => {
        newColorStop.remove()
        updateRemoveButtons()
        updateGradient()
      })
  
      // Add to container
      colorsContainer.appendChild(newColorStop)
  
      // Update remove buttons
      updateRemoveButtons()
  
      // Update gradient
      updateGradient()
    }
  
    function updateRemoveButtons() {
      const colorStops = colorsContainer.querySelectorAll(".color-stop")
      const removeButtons = colorsContainer.querySelectorAll(".remove-color")
  
      // Disable remove button if only one color stop
      if (colorStops.length <= 2) {
        removeButtons.forEach((btn) => {
          btn.disabled = true
        })
      } else {
        removeButtons.forEach((btn) => {
          btn.disabled = false
        })
      }
    }
  
    function copyCSS() {
      const cssText = cssCode.textContent
  
      // Create a temporary textarea
      const textarea = document.createElement("textarea")
      textarea.value = cssText
      document.body.appendChild(textarea)
  
      // Select and copy
      textarea.select()
      document.execCommand("copy")
  
      // Remove textarea
      document.body.removeChild(textarea)
  
      // Show notification
      showNotification("Code copié dans le presse-papier!")
    }
  
    function saveGradient() {
      const gradientCSS = gradientPreview.style.background
  
      // Check if already saved
      if (savedGradients.includes(gradientCSS)) {
        showNotification("Ce dégradé est déjà sauvegardé!")
        return
      }
  
      // Add to saved gradients
      savedGradients.push(gradientCSS)
  
      // Save to localStorage
      localStorage.setItem("savedGradients", JSON.stringify(savedGradients))
  
      // Update saved gradients grid
      renderSavedGradients()
  
      // Show notification
      showNotification("Dégradé sauvegardé!")
    }
  
    function renderSavedGradients() {
      // Clear grid
      savedGradientsGrid.innerHTML = ""
  
      // Add saved gradients
      savedGradients.forEach((gradient, index) => {
        const gradientItem = document.createElement("div")
        gradientItem.classList.add("saved-gradient")
        gradientItem.style.background = gradient
  
        // Add delete button
        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-gradient")
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
  
        // Add event listeners
        gradientItem.addEventListener("click", () => {
          loadGradient(gradient)
        })
  
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation()
          deleteSavedGradient(index)
        })
  
        gradientItem.appendChild(deleteBtn)
        savedGradientsGrid.appendChild(gradientItem)
      })
  
      // Show message if no saved gradients
      if (savedGradients.length === 0) {
        const message = document.createElement("p")
        message.textContent = "Aucun dégradé sauvegardé."
        message.style.gridColumn = "1 / -1"
        message.style.textAlign = "center"
        message.style.color = "#999"
        savedGradientsGrid.appendChild(message)
      }
    }
  
    function deleteSavedGradient(index) {
      // Remove from array
      savedGradients.splice(index, 1)
  
      // Save to localStorage
      localStorage.setItem("savedGradients", JSON.stringify(savedGradients))
  
      // Update saved gradients grid
      renderSavedGradients()
  
      // Show notification
      showNotification("Dégradé supprimé!")
    }
  
    function loadGradient(gradientCSS) {
      // Set preview
      gradientPreview.style.background = gradientCSS
  
      // Update CSS code
      cssCode.textContent = `.gradient {\n  background: ${gradientCSS};\n}`
  
      // Show notification
      showNotification("Dégradé chargé!")
    }
  
    function generateRandomGradient() {
      // Random gradient type
      const types = ["linear", "radial", "conic"]
      const randomType = types[Math.floor(Math.random() * types.length)]
  
      // Set gradient type
      gradientTypeInputs.forEach((input) => {
        if (input.value === randomType) {
          input.checked = true
          handleGradientTypeChange({ target: input })
        }
      })
  
      // Random direction for linear gradient
      if (randomType === "linear") {
        const directions = Array.from(directionButtons).map((btn) => btn.dataset.direction)
        const randomDirection = directions[Math.floor(Math.random() * directions.length)]
  
        // Set direction
        directionButtons.forEach((btn) => {
          if (btn.dataset.direction === randomDirection) {
            btn.click()
          }
        })
  
        // Random angle
        angleInput.value = Math.floor(Math.random() * 360)
        currentAngle = Number.parseInt(angleInput.value)
      }
  
      // Random options for radial gradient
      if (randomType === "radial") {
        const shapes = ["circle", "ellipse"]
        const positions = [
          "center",
          "top",
          "right",
          "bottom",
          "left",
          "top left",
          "top right",
          "bottom left",
          "bottom right",
        ]
  
        radialShape.value = shapes[Math.floor(Math.random() * shapes.length)]
        radialPosition.value = positions[Math.floor(Math.random() * positions.length)]
  
        currentRadialShape = radialShape.value
        currentRadialPosition = radialPosition.value
      }
  
      // Random options for conic gradient
      if (randomType === "conic") {
        const positions = [
          "center",
          "top",
          "right",
          "bottom",
          "left",
          "top left",
          "top right",
          "bottom left",
          "bottom right",
        ]
  
        conicAngle.value = Math.floor(Math.random() * 360)
        conicPosition.value = positions[Math.floor(Math.random() * positions.length)]
  
        currentConicAngle = Number.parseInt(conicAngle.value)
        currentConicPosition = conicPosition.value
      }
  
      // Random colors
      const colorStops = colorsContainer.querySelectorAll(".color-stop")
  
      // Remove existing color stops except first two
      for (let i = 2; i < colorStops.length; i++) {
        colorStops[i].remove()
      }
  
      // Random number of color stops (2-5)
      const numColorStops = Math.floor(Math.random() * 4) + 2
  
      // Set random colors for existing color stops
      colorStops[0].querySelector(".color-picker").value = getRandomColor()
      colorStops[0].querySelector(".color-position").value = 0
  
      colorStops[1].querySelector(".color-picker").value = getRandomColor()
      colorStops[1].querySelector(".color-position").value = 100
  
      // Add additional color stops if needed
      for (let i = 2; i < numColorStops; i++) {
        addColorStop()
  
        const newColorStop = colorsContainer.querySelectorAll(".color-stop")[i]
        newColorStop.querySelector(".color-picker").value = getRandomColor()
        newColorStop.querySelector(".color-position").value = Math.floor(Math.random() * 100)
      }
  
      // Update gradient
      updateGradient()
  
      // Show notification
      showNotification("Dégradé aléatoire généré!")
    }
  
    function getRandomColor() {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      )
    }
  
    function resetGradient() {
      // Reset gradient type
      gradientTypeInputs[0].checked = true
      currentGradientType = "linear"
  
      // Show/hide options
      directionControl.style.display = "block"
      radialOptions.style.display = "none"
      conicOptions.style.display = "none"
  
      // Reset direction
      directionButtons.forEach((btn) => {
        if (btn.dataset.direction === "to bottom") {
          btn.classList.add("active")
        } else {
          btn.classList.remove("active")
        }
      })
      currentDirection = "to bottom"
  
      // Reset angle
      angleInput.value = 180
      currentAngle = 180
  
      // Reset radial options
      radialShape.value = "circle"
      radialPosition.value = "center"
      currentRadialShape = "circle"
      currentRadialPosition = "center"
  
      // Reset conic options
      conicAngle.value = 0
      conicPosition.value = "center"
      currentConicAngle = 0
      currentConicPosition = "center"
  
      // Reset colors
      colorsContainer.innerHTML = ""
  
      // Add default color stops
      const colorStop1 = document.createElement("div")
      colorStop1.classList.add("color-stop")
      colorStop1.innerHTML = `
              <input type="color" value="#6c63ff" class="color-picker">
              <input type="number" value="0" min="0" max="100" class="color-position">
              <span>%</span>
              <button class="remove-color" disabled>
                  <i class="fas fa-times"></i>
              </button>
          `
  
      const colorStop2 = document.createElement("div")
      colorStop2.classList.add("color-stop")
      colorStop2.innerHTML = `
              <input type="color" value="#ff6584" class="color-picker">
              <input type="number" value="100" min="0" max="100" class="color-position">
              <span>%</span>
              <button class="remove-color" disabled>
                  <i class="fas fa-times"></i>
              </button>
          `
  
      colorsContainer.appendChild(colorStop1)
      colorsContainer.appendChild(colorStop2)
  
      // Add event listeners
      const colorPickers = colorsContainer.querySelectorAll(".color-picker")
      const colorPositions = colorsContainer.querySelectorAll(".color-position")
      const removeButtons = colorsContainer.querySelectorAll(".remove-color")
  
      colorPickers.forEach((picker) => {
        picker.addEventListener("input", updateGradient)
      })
  
      colorPositions.forEach((position) => {
        position.addEventListener("input", updateGradient)
      })
  
      removeButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          const colorStop = btn.closest(".color-stop")
          colorStop.remove()
          updateRemoveButtons()
          updateGradient()
        })
      })
  
      // Update gradient
      updateGradient()
  
      // Show notification
      showNotification("Dégradé réinitialisé!")
    }
  
    function showNotification(message) {
      notificationText.textContent = message
      notification.classList.add("show")
  
      setTimeout(() => {
        notification.classList.remove("show")
      }, 3000)
    }
  
    function handleGradientTypeChange(e) {
      currentGradientType = e.target.value
  
      // Show/hide options based on gradient type
      switch (currentGradientType) {
        case "linear":
          directionControl.style.display = "block"
          radialOptions.style.display = "none"
          conicOptions.style.display = "none"
          break
        case "radial":
          directionControl.style.display = "none"
          radialOptions.style.display = "block"
          conicOptions.style.display = "none"
          break
        case "conic":
          directionControl.style.display = "none"
          radialOptions.style.display = "none"
          conicOptions.style.display = "block"
          break
      }
  
      updateGradient()
    }
  
    // Event Listeners
    gradientTypeInputs.forEach((input) => {
      input.addEventListener("change", handleGradientTypeChange)
    })
  
    directionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active button
        directionButtons.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
  
        // Update direction
        currentDirection = btn.dataset.direction
  
        // Update angle based on direction
        switch (currentDirection) {
          case "to top":
            angleInput.value = 0
            break
          case "to top right":
            angleInput.value = 45
            break
          case "to right":
            angleInput.value = 90
            break
          case "to bottom right":
            angleInput.value = 135
            break
          case "to bottom":
            angleInput.value = 180
            break
          case "to bottom left":
            angleInput.value = 225
            break
          case "to left":
            angleInput.value = 270
            break
          case "to top left":
            angleInput.value = 315
            break
        }
  
        currentAngle = Number.parseInt(angleInput.value)
  
        updateGradient()
      })
    })
  
    angleInput.addEventListener("input", () => {
      currentAngle = Number.parseInt(angleInput.value)
  
      // Remove active class from direction buttons
      directionButtons.forEach((btn) => btn.classList.remove("active"))
  
      // Set direction to angle
      currentDirection = `${currentAngle}deg`
  
      updateGradient()
    })
  
    // Initial color stop event listeners
    const initialColorPickers = colorsContainer.querySelectorAll(".color-picker")
    const initialColorPositions = colorsContainer.querySelectorAll(".color-position")
    const initialRemoveButtons = colorsContainer.querySelectorAll(".remove-color")
  
    initialColorPickers.forEach((picker) => {
      picker.addEventListener("input", updateGradient)
    })
  
    initialColorPositions.forEach((position) => {
      position.addEventListener("input", updateGradient)
    })
  
    initialRemoveButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const colorStop = btn.closest(".color-stop")
        colorStop.remove()
        updateRemoveButtons()
        updateGradient()
      })
    })
  
    addColorBtn.addEventListener("click", addColorStop)
  
    copyBtn.addEventListener("click", copyCSS)
  
    saveBtn.addEventListener("click", saveGradient)
  
    randomBtn.addEventListener("click", generateRandomGradient)
  
    resetBtn.addEventListener("click", resetGradient)
  
    // Radial gradient options
    radialShape.addEventListener("change", () => {
      currentRadialShape = radialShape.value
      updateGradient()
    })
  
    radialPosition.addEventListener("change", () => {
      currentRadialPosition = radialPosition.value
      updateGradient()
    })
  
    // Conic gradient options
    conicAngle.addEventListener("input", () => {
      currentConicAngle = Number.parseInt(conicAngle.value)
      updateGradient()
    })
  
    conicPosition.addEventListener("change", () => {
      currentConicPosition = conicPosition.value
      updateGradient()
    })
  
    // Initialize
    updateRemoveButtons()
    updateGradient()
    renderSavedGradients()
  })
  
  