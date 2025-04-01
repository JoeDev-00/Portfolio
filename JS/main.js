// Custom cursor
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.7)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0.7)"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    })
  
    // Hover effect on links and buttons
    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorFollower.style.borderColor = "transparent"
        cursor.style.backgroundColor = "transparent"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.borderColor = "var(--primary-color)"
        cursor.style.backgroundColor = "var(--primary-color)"
      })
    })
  
    // Header scroll effect
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector("nav")
  
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains("active")) {
        nav.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    })
  
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll("nav ul li a")
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        })
  
        // Close mobile menu after clicking a link
        nav.classList.remove("active")
        menuToggle.classList.remove("active")
      })
    })
  
    // Active link on scroll
    const sections = document.querySelectorAll("section")
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active")
        }
      })
    })
  
    // Form submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        console.log("Form submitted:", { name, email, message })
  
        // Reset form
        contactForm.reset()
  
        // Show success message (you can create a better UI for this)
        alert("Message sent successfully!")
      })
    }
  
    // Scroll reveal animation
    const revealElements = document.querySelectorAll("[data-aos]")
    const revealOptions = {
      threshold: 0.1,
    }
  
    const revealCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
        }
      })
    }
  
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions)
  
    revealElements.forEach((element) => {
      element.classList.add("aos-init")
      revealObserver.observe(element)
    })
  })
  
  