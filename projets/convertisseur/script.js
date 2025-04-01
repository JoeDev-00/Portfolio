document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const tabButtons = document.querySelectorAll(".tab-btn")
    const fromValueInput = document.getElementById("from-value")
    const toValueInput = document.getElementById("to-value")
    const fromUnitSelect = document.getElementById("from-unit")
    const toUnitSelect = document.getElementById("to-unit")
    const swapBtn = document.getElementById("swap-btn")
    const formulaText = document.getElementById("formula")
    const historyList = document.getElementById("history-list")
    const clearHistoryBtn = document.getElementById("clear-history-btn")
  
    // Conversion units by category
    const units = {
      length: [
        { name: "Kilomètre", abbr: "km", factor: 1000 },
        { name: "Mètre", abbr: "m", factor: 1 },
        { name: "Centimètre", abbr: "cm", factor: 0.01 },
        { name: "Millimètre", abbr: "mm", factor: 0.001 },
        { name: "Mile", abbr: "mi", factor: 1609.34 },
        { name: "Yard", abbr: "yd", factor: 0.9144 },
        { name: "Pied", abbr: "ft", factor: 0.3048 },
        { name: "Pouce", abbr: "in", factor: 0.0254 },
      ],
      mass: [
        { name: "Tonne", abbr: "t", factor: 1000 },
        { name: "Kilogramme", abbr: "kg", factor: 1 },
        { name: "Gramme", abbr: "g", factor: 0.001 },
        { name: "Milligramme", abbr: "mg", factor: 0.000001 },
        { name: "Livre", abbr: "lb", factor: 0.453592 },
        { name: "Once", abbr: "oz", factor: 0.0283495 },
      ],
      temperature: [
        { name: "Celsius", abbr: "°C" },
        { name: "Fahrenheit", abbr: "°F" },
        { name: "Kelvin", abbr: "K" },
      ],
      area: [
        { name: "Kilomètre carré", abbr: "km²", factor: 1000000 },
        { name: "Mètre carré", abbr: "m²", factor: 1 },
        { name: "Centimètre carré", abbr: "cm²", factor: 0.0001 },
        { name: "Millimètre carré", abbr: "mm²", factor: 0.000001 },
        { name: "Hectare", abbr: "ha", factor: 10000 },
        { name: "Acre", abbr: "ac", factor: 4046.86 },
        { name: "Pied carré", abbr: "ft²", factor: 0.092903 },
      ],
      volume: [
        { name: "Mètre cube", abbr: "m³", factor: 1 },
        { name: "Litre", abbr: "L", factor: 0.001 },
        { name: "Millilitre", abbr: "mL", factor: 0.000001 },
        { name: "Gallon (US)", abbr: "gal", factor: 0.00378541 },
        { name: "Quart (US)", abbr: "qt", factor: 0.000946353 },
        { name: "Pinte (US)", abbr: "pt", factor: 0.000473176 },
        { name: "Tasse", abbr: "cup", factor: 0.000236588 },
        { name: "Once liquide (US)", abbr: "fl oz", factor: 0.0000295735 },
      ],
      time: [
        { name: "Année", abbr: "an", factor: 31536000 },
        { name: "Mois", abbr: "mois", factor: 2592000 },
        { name: "Semaine", abbr: "sem", factor: 604800 },
        { name: "Jour", abbr: "j", factor: 86400 },
        { name: "Heure", abbr: "h", factor: 3600 },
        { name: "Minute", abbr: "min", factor: 60 },
        { name: "Seconde", abbr: "s", factor: 1 },
        { name: "Milliseconde", abbr: "ms", factor: 0.001 },
      ],
      speed: [
        { name: "Kilomètre par heure", abbr: "km/h", factor: 0.277778 },
        { name: "Mètre par seconde", abbr: "m/s", factor: 1 },
        { name: "Mile par heure", abbr: "mph", factor: 0.44704 },
        { name: "Nœud", abbr: "kn", factor: 0.514444 },
      ],
      currency: [
        { name: "Euro", abbr: "€", factor: 1 },
        { name: "Dollar US", abbr: "$", factor: 0.92 },
        { name: "Livre Sterling", abbr: "£", factor: 1.17 },
        { name: "Yen Japonais", abbr: "¥", factor: 0.0064 },
        { name: "Franc Suisse", abbr: "CHF", factor: 1.04 },
        { name: "Dollar Canadien", abbr: "CAD", factor: 0.68 },
        { name: "Franc CFA", abbr: "FCFA", factor: 0.00152 },
      ],
    }
  
    // Current category
    let currentCategory = "length"
  
    // Load conversion history from localStorage
    let conversionHistory = JSON.parse(localStorage.getItem("conversionHistory")) || []
  
    // Initialize the converter
    function init() {
      // Set up tab buttons
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          tabButtons.forEach((btn) => btn.classList.remove("active"))
          button.classList.add("active")
          currentCategory = button.dataset.category
          populateUnitDropdowns()
          convert()
        })
      })
  
      // Set up event listeners
      fromValueInput.addEventListener("input", convert)
      fromUnitSelect.addEventListener("change", convert)
      toUnitSelect.addEventListener("change", convert)
      swapBtn.addEventListener("click", swapUnits)
      clearHistoryBtn.addEventListener("click", clearHistory)
  
      // Initialize with default category (length)
      populateUnitDropdowns()
      updateHistoryList()
      convert()
    }
  
    // Populate unit dropdowns based on current category
    function populateUnitDropdowns() {
      fromUnitSelect.innerHTML = ""
      toUnitSelect.innerHTML = ""
  
      units[currentCategory].forEach((unit) => {
        const fromOption = document.createElement("option")
        fromOption.value = unit.abbr
        fromOption.textContent = `${unit.name} (${unit.abbr})`
        fromUnitSelect.appendChild(fromOption)
  
        const toOption = document.createElement("option")
        toOption.value = unit.abbr
        toOption.textContent = `${unit.name} (${unit.abbr})`
        toUnitSelect.appendChild(toOption)
      })
  
      // Set default selections (first and second options)
      if (fromUnitSelect.options.length > 0) {
        fromUnitSelect.selectedIndex = 0
      }
      if (toUnitSelect.options.length > 1) {
        toUnitSelect.selectedIndex = 1
      }
    }
  
    // Convert from one unit to another
    function convert() {
      const fromValue = Number.parseFloat(fromValueInput.value)
      if (isNaN(fromValue)) {
        toValueInput.value = ""
        formulaText.textContent = "Veuillez entrer une valeur numérique"
        return
      }
  
      const fromUnit = fromUnitSelect.value
      const toUnit = toUnitSelect.value
  
      let result
      let formula
  
      if (currentCategory === "temperature") {
        result = convertTemperature(fromValue, fromUnit, toUnit)
        formula = getTemperatureFormula(fromUnit, toUnit)
      } else {
        const fromUnitObj = units[currentCategory].find((u) => u.abbr === fromUnit)
        const toUnitObj = units[currentCategory].find((u) => u.abbr === toUnit)
  
        if (fromUnitObj && toUnitObj) {
          // Convert to base unit then to target unit
          result = fromValue * (fromUnitObj.factor / toUnitObj.factor)
          formula = `1 ${fromUnitObj.name} = ${(fromUnitObj.factor / toUnitObj.factor).toLocaleString("fr-FR")} ${toUnitObj.name}`
        }
      }
  
      if (result !== undefined) {
        // Format the result based on its magnitude
        toValueInput.value = formatNumber(result)
        formulaText.textContent = formula
  
        // Add to history
        addToHistory(fromValue, fromUnit, result, toUnit)
      }
    }
  
    // Format number based on its magnitude
    function formatNumber(num) {
      if (Math.abs(num) < 0.000001 || Math.abs(num) >= 1000000) {
        return num.toExponential(6)
      } else if (Number.isInteger(num)) {
        return num.toString()
      } else {
        return num.toPrecision(6).replace(/\.?0+$/, "")
      }
    }
  
    // Temperature conversion requires special formulas
    function convertTemperature(value, fromUnit, toUnit) {
      if (fromUnit === toUnit) return value
  
      // Convert to Kelvin first (as base unit)
      let kelvin
      if (fromUnit === "°C") {
        kelvin = value + 273.15
      } else if (fromUnit === "°F") {
        kelvin = (value + 459.67) * (5 / 9)
      } else {
        // Kelvin
        kelvin = value
      }
  
      // Convert from Kelvin to target unit
      if (toUnit === "°C") {
        return kelvin - 273.15
      } else if (toUnit === "°F") {
        return kelvin * (9 / 5) - 459.67
      } else {
        // Kelvin
        return kelvin
      }
    }
  
    // Get temperature conversion formula
    function getTemperatureFormula(fromUnit, toUnit) {
      if (fromUnit === toUnit) return `${fromUnit} = ${toUnit}`
  
      const formulas = {
        "°C_°F": "Fahrenheit = Celsius × 9/5 + 32",
        "°F_°C": "Celsius = (Fahrenheit - 32) × 5/9",
        "°C_K": "Kelvin = Celsius + 273.15",
        "K_°C": "Celsius = Kelvin - 273.15",
        "°F_K": "Kelvin = (Fahrenheit + 459.67) × 5/9",
        "K_°F": "Fahrenheit = Kelvin × 9/5 - 459.67",
      }
  
      return formulas[`${fromUnit}_${toUnit}`] || "Formule non disponible"
    }
  
    // Swap from and to units
    function swapUnits() {
      const tempValue = fromValueInput.value
      const tempUnit = fromUnitSelect.value
  
      // Swap units
      fromUnitSelect.value = toUnitSelect.value
      toUnitSelect.value = tempUnit
  
      // Set from value to current to value
      fromValueInput.value = toValueInput.value
  
      // Recalculate
      convert()
    }
  
    // Add conversion to history
    function addToHistory(fromValue, fromUnit, toValue, toUnit) {
      const fromUnitObj = units[currentCategory].find((u) => u.abbr === fromUnit)
      const toUnitObj = units[currentCategory].find((u) => u.abbr === toUnit)
  
      if (!fromUnitObj || !toUnitObj) return
  
      const historyItem = {
        category: currentCategory,
        fromValue: fromValue,
        fromUnit: fromUnit,
        fromUnitName: fromUnitObj.name,
        toValue: toValue,
        toUnit: toUnit,
        toUnitName: toUnitObj.name,
        timestamp: new Date().toISOString(),
      }
  
      // Add to beginning of array (most recent first)
      conversionHistory.unshift(historyItem)
  
      // Limit history to 10 items
      if (conversionHistory.length > 10) {
        conversionHistory.pop()
      }
  
      // Save to localStorage
      localStorage.setItem("conversionHistory", JSON.stringify(conversionHistory))
  
      // Update history list
      updateHistoryList()
    }
  
    // Update history list in UI
    function updateHistoryList() {
      historyList.innerHTML = ""
  
      if (conversionHistory.length === 0) {
        const emptyItem = document.createElement("li")
        emptyItem.textContent = "Aucune conversion récente"
        emptyItem.classList.add("empty-history")
        historyList.appendChild(emptyItem)
        return
      }
  
      conversionHistory.forEach((item) => {
        const listItem = document.createElement("li")
  
        // Format date
        const date = new Date(item.timestamp)
        const formattedDate = date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
  
        // Create history item content
        listItem.innerHTML = `
                  <div class="history-item">
                      <div class="history-details">
                          <span class="history-value">${formatNumber(item.fromValue)} ${item.fromUnit}</span>
                          <span class="history-arrow">→</span>
                          <span class="history-value">${formatNumber(item.toValue)} ${item.toUnit}</span>
                      </div>
                      <div class="history-category">
                          <i class="fas fa-tag"></i> ${getCategoryName(item.category)}
                      </div>
                      <div class="history-time">
                          <i class="fas fa-clock"></i> ${formattedDate}
                      </div>
                  </div>
              `
  
        // Add click event to reuse this conversion
        listItem.addEventListener("click", () => {
          // Switch to the correct category tab
          tabButtons.forEach((btn) => {
            if (btn.dataset.category === item.category) {
              btn.click()
            }
          })
  
          // Set values and units
          fromValueInput.value = item.fromValue
  
          // Wait for dropdowns to be populated
          setTimeout(() => {
            fromUnitSelect.value = item.fromUnit
            toUnitSelect.value = item.toUnit
            convert()
          }, 0)
        })
  
        historyList.appendChild(listItem)
      })
    }
  
    // Get category name in French
    function getCategoryName(category) {
      const categoryNames = {
        length: "Longueur",
        mass: "Masse",
        temperature: "Température",
        area: "Surface",
        volume: "Volume",
        time: "Temps",
        speed: "Vitesse",
        currency: "Devise",
      }
  
      return categoryNames[category] || category
    }
  
    // Clear history
    function clearHistory() {
      conversionHistory = []
      localStorage.removeItem("conversionHistory")
      updateHistoryList()
    }
  
    // Initialize the app
    init()
  })
  
  