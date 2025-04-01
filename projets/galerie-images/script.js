document.addEventListener("DOMContentLoaded", () => {
    // Gallery data
    const galleryData = [
        {
          id: 1,
          title: "Montagnes majestueuses",
          category: "nature",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl_yRZFLeIJFYZt9cHP4cp0fBRIUKRnKWPXQ&s",
          description: "Vue panoramique sur une chaîne de montagnes au lever du soleil.",
        },
        {
          id: 2,
          title: "Gratte-ciel urbains",
          category: "architecture",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjW60SDTOC--CYd6eDbWRdOV9dfWUjwuLUtA&s",
          description: "Skyline d'une métropole moderne avec des gratte-ciels impressionnants.",
        },
        {
          id: 3,
          title: "Plage tropicale",
          category: "travel",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAtkXTCHOKbhT1Y0sYCVmIzKKuwbCiThgCEQ&s",
          description: "Plage de sable blanc avec eau turquoise et palmiers.",
        },
        {
          id: 4,
          title: "Forêt enchantée",
          category: "nature",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeZKbQxT8Qu5C8X81V1P_hPCR_CoX7gIg6bg&s",
          description: "Sentier mystérieux à travers une forêt dense et brumeuse.",
        },
        {
          id: 5,
          title: "Pont historique",
          category: "architecture",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD8z72D_9Mqy221Nsk6X0FwzOdSMDWZ_pWWw&s",
          description: "Pont emblématique traversant une rivière au coucher du soleil.",
        },
        {
          id: 6,
          title: "Marché local",
          category: "travel",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3Fyh1qgKQ9H2waLDskUvJ2WsWT_YoEXbxQ&s",
          description: "Marché coloré avec des produits locaux et artisanaux.",
        },
        {
          id: 7,
          title: "Cascade sauvage",
          category: "nature",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS71yUyvPkFq4YrSBzmUHKMz1RF5B3qIRXu2w&s",
          description: "Puissante cascade au milieu d'une végétation luxuriante.",
        },
        {
          id: 8,
          title: "Cathédrale gothique",
          category: "architecture",
          image: "data:image/jpeg;base64,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",
          description: "Imposante cathédrale de Douala Cameroun avec architecture gothique détaillée.",
        },
        {
          id: 9,
          title: "Village pittoresque",
          category: "travel",
          image: "data:image/jpeg;base64,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",
          description: "Charmant village avec maisons traditionnelles",
        },
        {
          id: 10,
          title: "Eclipse solaire",
          category: "nature",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZLwdPKGj9Lxyq5UL3MP0DrMG3HY9H03doA&s",
          description: "Spectaculaire éclipse solaire vue depuis un endroit dégagé.",
        },
        {
          id: 11,
          title: "Musée Bamoun Cameroon",
          category: "architecture",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyn1jF6lH1EEkaXsRoaFHp4QMtE2Vg3nDSqQ&s",
          description: "Musée d'art traditonnel avec une architecture spectaculaire.",
        },
        {
          id: 12,
          title: "Marché flottant",
          category: "travel",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsp6Q6ku-K1m5hvdenUTz_ZKmjyimu7twBIg&s",
          description: "Marché traditionnel sur l'eau avec des bateaux colorés.",
        },
      ]
      
  
    // DOM Elements
    const galleryGrid = document.getElementById("gallery-grid")
    const filterBtns = document.querySelectorAll(".filter-btn")
    const searchInput = document.getElementById("search-input")
    const searchBtn = document.getElementById("search-btn")
    const loadMoreBtn = document.getElementById("load-more-btn")
    const lightbox = document.getElementById("lightbox")
    const lightboxTitle = document.getElementById("lightbox-title")
    const lightboxImage = document.getElementById("lightbox-image")
    const lightboxDescription = document.getElementById("lightbox-description")
    const lightboxCount = document.getElementById("lightbox-count")
    const closeLightbox = document.getElementById("close-lightbox")
    const prevBtn = document.getElementById("prev-btn")
    const nextBtn = document.getElementById("next-btn")
    const favoriteBtn = document.getElementById("favorite-btn")
    const shareBtn = document.getElementById("share-btn")
    const downloadBtn = document.getElementById("download-btn")
    const shareModal = document.getElementById("share-modal")
    const closeShare = document.getElementById("close-share")
    const shareLinkInput = document.getElementById("share-link-input")
    const copyLinkBtn = document.getElementById("copy-link-btn")
  
    // Variables
    let currentFilter = "all"
    let currentSearch = ""
    let visibleItems = 8
    let currentImageIndex = 0
    let filteredGallery = [...galleryData]
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
  
    // Functions
    function renderGallery() {
      // Filter gallery based on current filter and search
      filteredGallery = galleryData.filter((item) => {
        const matchesFilter = currentFilter === "all" || item.category === currentFilter
        const matchesSearch =
          item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
          item.description.toLowerCase().includes(currentSearch.toLowerCase())
        return matchesFilter && matchesSearch
      })
  
      // Clear gallery
      galleryGrid.innerHTML = ""
  
      // Render visible items
      const itemsToShow = filteredGallery.slice(0, visibleItems)
  
      itemsToShow.forEach((item) => {
        const galleryItem = document.createElement("div")
        galleryItem.classList.add("gallery-item")
        galleryItem.dataset.id = item.id
  
        galleryItem.innerHTML = `
                  <img src="${item.image}" alt="${item.title}">
                  <div class="gallery-item-overlay">
                      <h3 class="gallery-item-title">${item.title}</h3>
                      <p class="gallery-item-category">${item.category}</p>
                  </div>
              `
  
        galleryGrid.appendChild(galleryItem)
  
        // Add animation delay for staggered effect
        galleryItem.style.animationDelay = `${itemsToShow.indexOf(item) * 0.05}s`
      })
  
      // Show/hide load more button
      if (filteredGallery.length <= visibleItems) {
        loadMoreBtn.style.display = "none"
      } else {
        loadMoreBtn.style.display = "inline-block"
      }
  
      // Add click event to gallery items
      const galleryItems = document.querySelectorAll(".gallery-item")
      galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
          const itemId = Number.parseInt(item.dataset.id)
          openLightbox(itemId)
        })
      })
    }
  
    function openLightbox(imageId) {
      // Find image index in filtered gallery
      currentImageIndex = filteredGallery.findIndex((item) => item.id === imageId)
  
      // Update lightbox content
      updateLightboxContent()
  
      // Show lightbox
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  
    function updateLightboxContent() {
      const currentImage = filteredGallery[currentImageIndex]
  
      lightboxTitle.textContent = currentImage.title
      lightboxImage.src = currentImage.image
      lightboxImage.alt = currentImage.title
      lightboxDescription.textContent = currentImage.description
      lightboxCount.textContent = `${currentImageIndex + 1} / ${filteredGallery.length}`
  
      // Update favorite button
      if (favorites.includes(currentImage.id)) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>'
      } else {
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>'
      }
  
      // Update share link
      shareLinkInput.value = `https://example.com/gallery/${currentImage.id}`
    }
  
    function closeLightboxHandler() {
      lightbox.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  
    function navigateGallery(direction) {
      if (direction === "prev") {
        currentImageIndex = (currentImageIndex - 1 + filteredGallery.length) % filteredGallery.length
      } else {
        currentImageIndex = (currentImageIndex + 1) % filteredGallery.length
      }
  
      // Add animation class
      lightboxImage.classList.add("changing")
  
      // Update content after animation
      setTimeout(() => {
        updateLightboxContent()
        lightboxImage.classList.remove("changing")
      }, 300)
    }
  
    function toggleFavorite() {
      const currentImage = filteredGallery[currentImageIndex]
  
      if (favorites.includes(currentImage.id)) {
        // Remove from favorites
        favorites = favorites.filter((id) => id !== currentImage.id)
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>'
      } else {
        // Add to favorites
        favorites.push(currentImage.id)
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>'
  
        // Add heart animation
        favoriteBtn.classList.add("pulse")
        setTimeout(() => {
          favoriteBtn.classList.remove("pulse")
        }, 500)
      }
  
      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  
    function downloadImage() {
      const currentImage = filteredGallery[currentImageIndex]
  
      // Create a temporary link
      const link = document.createElement("a")
      link.href = currentImage.image
      link.download = `${currentImage.title.replace(/\s+/g, "-").toLowerCase()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  
    function openShareModal() {
      shareModal.classList.add("active")
    }
  
    function closeShareModal() {
      shareModal.classList.remove("active")
    }
  
    function copyShareLink() {
      shareLinkInput.select()
      document.execCommand("copy")
  
      // Show copied notification
      copyLinkBtn.textContent = "Copié!"
      setTimeout(() => {
        copyLinkBtn.textContent = "Copier"
      }, 2000)
    }
  
    // Event Listeners
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
  
        // Update filter
        currentFilter = btn.dataset.filter
        visibleItems = 8 // Reset visible items
  
        // Render gallery
        renderGallery()
      })
    })
  
    searchBtn.addEventListener("click", () => {
      currentSearch = searchInput.value.trim()
      visibleItems = 8 // Reset visible items
      renderGallery()
    })
  
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        currentSearch = searchInput.value.trim()
        visibleItems = 8 // Reset visible items
        renderGallery()
      }
    })
  
    loadMoreBtn.addEventListener("click", () => {
      visibleItems += 4
      renderGallery()
    })
  
    closeLightbox.addEventListener("click", closeLightboxHandler)
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightboxHandler()
      }
    })
  
    prevBtn.addEventListener("click", () => navigateGallery("prev"))
    nextBtn.addEventListener("click", () => navigateGallery("next"))
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return
  
      switch (e.key) {
        case "ArrowLeft":
          navigateGallery("prev")
          break
        case "ArrowRight":
          navigateGallery("next")
          break
        case "Escape":
          closeLightboxHandler()
          break
      }
    })
  
    favoriteBtn.addEventListener("click", toggleFavorite)
    downloadBtn.addEventListener("click", downloadImage)
    shareBtn.addEventListener("click", openShareModal)
    closeShare.addEventListener("click", closeShareModal)
    copyLinkBtn.addEventListener("click", copyShareLink)
  
    // Initialize gallery
    renderGallery()
  
    // Add CSS for animations
    const style = document.createElement("style")
    style.textContent = `
          .gallery-item {
              animation: fadeIn 0.5s ease forwards;
              opacity: 0;
          }
          
          @keyframes fadeIn {
              0% {
                  opacity: 0;
                  transform: translateY(20px);
              }
              100% {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          
          #lightbox-image.changing {
              opacity: 0;
              transform: scale(0.9);
              transition: opacity 0.3s ease, transform 0.3s ease;
          }
          
          .pulse {
              animation: pulse 0.5s ease;
          }
          
          @keyframes pulse {
              0% {
                  transform: scale(1);
              }
              50% {
                  transform: scale(1.2);
              }
              100% {
                  transform: scale(1);
              }
          }
      `
    document.head.appendChild(style)
  })
  
  