import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Vérifier si Chart.js est disponible
  if (typeof Chart === "undefined") {
    console.error("Chart.js n'est pas chargé. Assurez-vous d'inclure la bibliothèque Chart.js dans votre HTML.")

    // Ajouter dynamiquement Chart.js s'il n'est pas déjà inclus
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/chart.js"
    script.onload = initDashboard
    document.head.appendChild(script)
    return
  }

  // Initialize data
  const dashboardData = {
    today: {
      users: 254,
      sales: 54,
      visits: 1432,
      revenue: 2345,
      salesChart: {
        labels: ["8h", "10h", "12h", "14h", "16h", "18h", "20h"],
        data: [10, 25, 15, 30, 20, 35, 45],
      },
      usersChart: {
        labels: ["Nouveaux", "Récurrents", "Inactifs"],
        data: [30, 50, 20],
      },
    },
    week: {
      users: 1254,
      sales: 854,
      visits: 5432,
      revenue: 12345,
      salesChart: {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        data: [150, 230, 180, 290, 350, 200, 300],
      },
      usersChart: {
        labels: ["Nouveaux", "Récurrents", "Inactifs"],
        data: [25, 60, 15],
      },
    },
    month: {
      users: 5254,
      sales: 3854,
      visits: 25432,
      revenue: 52345,
      salesChart: {
        labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
        data: [1200, 1500, 1800, 2100],
      },
      usersChart: {
        labels: ["Nouveaux", "Récurrents", "Inactifs"],
        data: [20, 65, 15],
      },
    },
    year: {
      users: 25254,
      sales: 18854,
      visits: 125432,
      revenue: 352345,
      salesChart: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
        data: [5000, 6000, 7500, 8000, 9500, 10000, 11000, 10500, 12000, 12500, 13000, 15000],
      },
      usersChart: {
        labels: ["Nouveaux", "Récurrents", "Inactifs"],
        data: [15, 70, 15],
      },
    },
  }

  // DOM Elements
  const dateRangeSelect = document.getElementById("date-range")
  const usersCountElement = document.getElementById("users-count")
  const salesCountElement = document.getElementById("sales-count")
  const visitsCountElement = document.getElementById("visits-count")
  const revenueCountElement = document.getElementById("revenue-count")
  const salesChartCanvas = document.getElementById("sales-chart")
  const usersChartCanvas = document.getElementById("users-chart")
  const chartActions = document.querySelectorAll(".chart-action")

  // Vérifier si tous les éléments DOM sont présents
  const requiredElements = [
    { el: dateRangeSelect, name: "date-range" },
    { el: usersCountElement, name: "users-count" },
    { el: salesCountElement, name: "sales-count" },
    { el: visitsCountElement, name: "visits-count" },
    { el: revenueCountElement, name: "revenue-count" },
    { el: salesChartCanvas, name: "sales-chart" },
    { el: usersChartCanvas, name: "users-chart" },
  ]

  const missingElements = requiredElements.filter((item) => !item.el)
  if (missingElements.length > 0) {
    console.error("Éléments manquants dans le DOM:", missingElements.map((item) => item.name).join(", "))
    return
  }

  // Chart instances
  let salesChart
  let usersChart

  // Initialize charts
  function initCharts(period, chartType = "line") {
    try {
      // Sales Chart
      if (salesChart) {
        salesChart.destroy()
      }

      salesChart = new Chart(salesChartCanvas, {
        type: chartType,
        data: {
          labels: dashboardData[period].salesChart.labels,
          datasets: [
            {
              label: "Ventes",
              data: dashboardData[period].salesChart.data,
              backgroundColor: "rgba(108, 99, 255, 0.2)",
              borderColor: "rgba(108, 99, 255, 1)",
              borderWidth: 2,
              tension: 0.4,
              pointBackgroundColor: "rgba(108, 99, 255, 1)",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "rgba(108, 99, 255, 0.7)",
              borderWidth: 1,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      })

      // Users Chart
      if (usersChart) {
        usersChart.destroy()
      }

      usersChart = new Chart(usersChartCanvas, {
        type: "doughnut",
        data: {
          labels: dashboardData[period].usersChart.labels,
          datasets: [
            {
              data: dashboardData[period].usersChart.data,
              backgroundColor: ["rgba(108, 99, 255, 0.7)", "rgba(76, 175, 80, 0.7)", "rgba(244, 67, 54, 0.7)"],
              borderColor: ["rgba(108, 99, 255, 1)", "rgba(76, 175, 80, 1)", "rgba(244, 67, 54, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                boxWidth: 12,
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "rgba(108, 99, 255, 0.7)",
              borderWidth: 1,
            },
          },
          cutout: "70%",
        },
      })
    } catch (error) {
      console.error("Erreur lors de l'initialisation des graphiques:", error)
    }
  }

  // Update dashboard data
  function updateDashboard(period) {
    try {
      if (!dashboardData[period]) {
        console.error(`Période non valide: ${period}`)
        return
      }

      // Update stats
      usersCountElement.textContent = dashboardData[period].users.toLocaleString()
      salesCountElement.textContent = dashboardData[period].sales.toLocaleString()
      visitsCountElement.textContent = dashboardData[period].visits.toLocaleString()
      revenueCountElement.textContent = dashboardData[period].revenue.toLocaleString() + " €"

      // Get active chart type
      const activeChartAction = document.querySelector(".chart-action.active")
      const activeChartType = activeChartAction ? activeChartAction.dataset.type : "line"

      // Update charts
      initCharts(period, activeChartType)

      // Add animation to stats
      const statElements = [usersCountElement, salesCountElement, visitsCountElement, revenueCountElement]
      statElements.forEach((element) => {
        element.classList.add("updated")
        setTimeout(() => {
          element.classList.remove("updated")
        }, 1000)
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour du tableau de bord:", error)
    }
  }

  // Event Listeners
  function setupEventListeners() {
    if (dateRangeSelect) {
      dateRangeSelect.addEventListener("change", function () {
        updateDashboard(this.value)
      })
    }

    if (chartActions.length > 0) {
      chartActions.forEach((action) => {
        action.addEventListener("click", function (e) {
          e.preventDefault()
          chartActions.forEach((btn) => btn.classList.remove("active"))
          this.classList.add("active")

          const chartType = this.dataset.type
          const period = dateRangeSelect ? dateRangeSelect.value : "today"

          initCharts(period, chartType)
        })
      })
    } else {
      console.warn("Aucun élément .chart-action trouvé")
    }
  }

  // Save dashboard data to localStorage
  function saveDashboardData() {
    try {
      localStorage.setItem("dashboardData", JSON.stringify(dashboardData))
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données:", error)
    }
  }

  // Load dashboard data from localStorage
  function loadDashboardData() {
    try {
      const savedData = localStorage.getItem("dashboardData")
      if (savedData) {
        return JSON.parse(savedData)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
      // En cas d'erreur, supprimer les données corrompues
      localStorage.removeItem("dashboardData")
    }
    return null
  }

  // Initialize dashboard
  function initDashboard() {
    try {
      const savedData = loadDashboardData()
      if (savedData) {
        Object.assign(dashboardData, savedData)
      }

      // S'assurer qu'au moins un élément chart-action est actif
      if (chartActions.length > 0 && !document.querySelector(".chart-action.active")) {
        chartActions[0].classList.add("active")
      }

      const defaultPeriod = dateRangeSelect ? dateRangeSelect.value : "today"
      updateDashboard(defaultPeriod)

      // Add CSS for stats animation if not already present
      if (!document.getElementById("dashboard-animations")) {
        const style = document.createElement("style")
        style.id = "dashboard-animations"
        style.textContent = `
          .stat-info p.updated {
              animation: pulse 1s ease;
          }
          
          @keyframes pulse {
              0% {
                  transform: scale(1);
              }
              50% {
                  transform: scale(1.1);
              }
              100% {
                  transform: scale(1);
              }
          }
        `
        document.head.appendChild(style)
      }

      // Configurer les écouteurs d'événements
      setupEventListeners()

      console.log("Tableau de bord initialisé avec succès")
    } catch (error) {
      console.error("Erreur lors de l'initialisation du tableau de bord:", error)
    }
  }

  // Initialize the dashboard
  initDashboard()
})

