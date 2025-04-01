document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const loginForm = document.getElementById("login-form")
    const notification = document.getElementById("notification")
  
    // Event Listeners
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Show notification
      notification.classList.add("show")
  
      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.classList.remove("show")
      }, 3000)
    })
  
    // Add focus effect for input fields
    const inputFields = document.querySelectorAll(".form-group input")
  
    inputFields.forEach((input) => {
      // Check if input has value on page load
      if (input.value !== "") {
        input.nextElementSibling.classList.add("active")
      }
  
      // Add event listeners for focus and blur
      input.addEventListener("focus", () => {
        input.nextElementSibling.classList.add("active")
      })
  
      input.addEventListener("blur", () => {
        if (input.value === "") {
          input.nextElementSibling.classList.remove("active")
        }
      })
    })
  
    // Add animation for login button
    const loginBtn = document.querySelector(".login-btn")
  
    loginBtn.addEventListener("mousedown", () => {
      loginBtn.style.transform = "scale(0.95)"
    })
  
    loginBtn.addEventListener("mouseup", () => {
      loginBtn.style.transform = "scale(1)"
    })
  
    loginBtn.addEventListener("mouseleave", () => {
      loginBtn.style.transform = "scale(1)"
    })
  })
  
  