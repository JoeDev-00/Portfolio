document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const userScoreElement = document.getElementById("user-score")
    const computerScoreElement = document.getElementById("computer-score")
    const resultText = document.getElementById("result-text")
    const choices = document.querySelectorAll(".choice")
    const resetBtn = document.getElementById("reset-btn")
    const historyList = document.getElementById("history-list")
    const modal = document.getElementById("win-modal")
    const winnerText = document.getElementById("winner-text")
    const closeModal = document.querySelector(".close")
    const playAgainBtn = document.getElementById("play-again-btn")
    const confetti = document.getElementById("confetti")
  
    // Game variables
    let userScore = 0
    let computerScore = 0
    const winningScore = 5
  
    // Functions
    function getComputerChoice() {
      const choices = ["rock", "paper", "scissors"]
      const randomIndex = Math.floor(Math.random() * 3)
      return choices[randomIndex]
    }
  
    function convertToWord(choice) {
      if (choice === "rock") return "Pierre"
      if (choice === "paper") return "Papier"
      return "Ciseaux"
    }
  
    function win(userChoice, computerChoice) {
      userScore++
      userScoreElement.textContent = userScore
  
      const userChoiceElement = document.getElementById(userChoice)
      userChoiceElement.classList.add("selected")
  
      const computerChoiceElement = document.getElementById(computerChoice)
      computerChoiceElement.classList.add("computer-selected")
  
      resultText.textContent = `${convertToWord(userChoice)} bat ${convertToWord(computerChoice)}. Vous gagnez!`
  
      // Add to history
      addToHistory(
        `Vous: ${convertToWord(userChoice)} | Ordinateur: ${convertToWord(computerChoice)} | Résultat: Vous gagnez`,
      )
  
      // Check if user won the game
      if (userScore === winningScore) {
        endGame("user")
      }
    }
  
    function lose(userChoice, computerChoice) {
      computerScore++
      computerScoreElement.textContent = computerScore
  
      const userChoiceElement = document.getElementById(userChoice)
      userChoiceElement.classList.add("selected")
  
      const computerChoiceElement = document.getElementById(computerChoice)
      computerChoiceElement.classList.add("computer-selected")
  
      resultText.textContent = `${convertToWord(userChoice)} perd contre ${convertToWord(computerChoice)}. Vous perdez.`
  
      // Add to history
      addToHistory(
        `Vous: ${convertToWord(userChoice)} | Ordinateur: ${convertToWord(computerChoice)} | Résultat: Vous perdez`,
      )
  
      // Check if computer won the game
      if (computerScore === winningScore) {
        endGame("computer")
      }
    }
  
    function draw(userChoice, computerChoice) {
      const userChoiceElement = document.getElementById(userChoice)
      userChoiceElement.classList.add("selected")
  
      const computerChoiceElement = document.getElementById(computerChoice)
      computerChoiceElement.classList.add("computer-selected")
  
      resultText.textContent = `${convertToWord(userChoice)} égalise avec ${convertToWord(computerChoice)}. Match nul.`
  
      // Add to history
      addToHistory(
        `Vous: ${convertToWord(userChoice)} | Ordinateur: ${convertToWord(computerChoice)} | Résultat: Match nul`,
      )
    }
  
    function game(userChoice) {
      const computerChoice = getComputerChoice()
  
      switch (userChoice + computerChoice) {
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
          win(userChoice, computerChoice)
          break
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
          lose(userChoice, computerChoice)
          break
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
          draw(userChoice, computerChoice)
          break
      }
    }
  
    function resetChoices() {
      choices.forEach((choice) => {
        choice.classList.remove("selected", "computer-selected")
      })
    }
  
    function addToHistory(text) {
      const li = document.createElement("li")
      li.textContent = text
      historyList.prepend(li)
    }
  
    function resetGame() {
      userScore = 0
      computerScore = 0
      userScoreElement.textContent = userScore
      computerScoreElement.textContent = computerScore
      resultText.textContent = "Choisissez une option pour commencer"
      resetChoices()
      historyList.innerHTML = ""
    }
  
    function endGame(winner) {
      if (winner === "user") {
        winnerText.textContent = "Félicitations! Vous avez gagné!"
        createConfetti()
      } else {
        winnerText.textContent = "Dommage! L'ordinateur a gagné."
      }
  
      modal.style.display = "block"
    }
  
    function createConfetti() {
      const colors = ["#ff6584", "#6c63ff", "#43e97b", "#f9ca24", "#eb4d4b"]
      for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement("div")
        confettiPiece.classList.add("confetti-piece")
        confettiPiece.style.left = Math.random() * 100 + "%"
        confettiPiece.style.top = -10 + "px"
        confettiPiece.style.width = Math.random() * 10 + 5 + "px"
        confettiPiece.style.height = Math.random() * 10 + 5 + "px"
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confettiPiece.style.position = "absolute"
        confettiPiece.style.transform = "rotate(" + Math.random() * 360 + "deg)"
        confettiPiece.style.animation = "fall " + (Math.random() * 3 + 2) + "s linear forwards"
        confetti.appendChild(confettiPiece)
      }
    }
  
    function getRandomColor() {
      const colors = ["#ff6584", "#6c63ff", "#43e97b", "#f9ca24", "#eb4d4b"]
      return colors[Math.floor(Math.random() * colors.length)]
    }
  
    // Event Listeners
    choices.forEach((choice) => {
      choice.addEventListener("click", function () {
        resetChoices()
        const userChoice = this.id
        game(userChoice)
  
        // Add bounce animation
        this.classList.add("bounce")
        setTimeout(() => {
          this.classList.remove("bounce")
        }, 1000)
      })
    })
  
    resetBtn.addEventListener("click", resetGame)
  
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
      confetti.innerHTML = ""
    })
  
    playAgainBtn.addEventListener("click", () => {
      modal.style.display = "none"
      confetti.innerHTML = ""
      resetGame()
    })
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
        confetti.innerHTML = ""
      }
    })
  
    // Add CSS for confetti animation
    const style = document.createElement("style")
    style.textContent = `
          @keyframes fall {
              0% {
                  top: -10px;
                  transform: translateX(0) rotate(0deg);
              }
              100% {
                  top: 100%;
                  transform: translateX(100px) rotate(360deg);
              }
          }
      `
    document.head.appendChild(style)
  })
  
  