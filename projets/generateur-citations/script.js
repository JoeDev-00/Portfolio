document.addEventListener("DOMContentLoaded", () => {
  const quoteText = document.getElementById("quote");
  const authorText = document.getElementById("author");
  const twitterBtn = document.getElementById("twitter");
  const facebookBtn = document.getElementById("facebook");
  const whatsappBtn = document.getElementById("whatsapp");
  const newQuoteBtn = document.getElementById("new-quote");

  // Citations en français (normalement on utiliserait une API)
  const quotes = [
    {
      text: "Le plus grand risque est de ne prendre aucun risque. Dans un monde qui change très rapidement, la seule stratégie qui échoue à coup sûr est de ne pas prendre de risques.",
      author: "Mark Zuckerberg",
    },
    {
      text: "La logique vous mènera de A à B. L'imagination vous mènera partout.",
      author: "Albert Einstein",
    },
    {
      text: "Ce n'est pas ce que vous regardez qui compte, c'est ce que vous voyez.",
      author: "Henry David Thoreau",
    },
    {
      text: "La seule limite à notre réalisation de demain sera nos doutes d'aujourd'hui.",
      author: "Franklin D. Roosevelt",
    },
    {
      text: "Le succès n'est pas définitif, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
      author: "Winston Churchill",
    },
    {
      text: "La créativité, c'est l'intelligence qui s'amuse.",
      author: "Albert Einstein",
    },
    {
      text: "L'avenir a un nom merveilleux : le possible.",
      author: "Victor Hugo",
    },
    {
      text: "La vie est une aventure audacieuse ou rien du tout.",
      author: "Helen Keller",
    },
    {
      text: "Le bonheur n'est pas d'avoir tout ce qu'on désire, mais d'aimer ce qu'on a.",
      author: "Confucius",
    },
    {
      text: "La curiosité est le moteur de la connaissance.",
      author: "Albert Einstein",
    },
    {
      text: "Le temps que vous aimez perdre n'est pas perdu.",
      author: "Bertrand Russell",
    },
    {
      text: "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi.",
      author: "Georges Clemenceau",
    },
    {
      text: "La persévérance est la clé de tous les succès.",
      author: "Victor Hugo",
    },
    {
      text: "N'aie pas peur de la perfection, tu ne l'atteindras jamais.",
      author: "Salvador Dali",
    },
    {
      text: "Le plus grand plaisir de la vie est de faire ce que les gens disent que vous ne pouvez pas faire.",
      author: "Walter Bagehot",
    },
    {
      text: "La vie est trop courte pour être petite.",
      author: "Benjamin Disraeli",
    },
    {
      text: "Le bonheur est un choix que nous faisons, pas un endroit où nous arrivons.",
      author: "Walt Disney",
    },
    {
      text: "La meilleure vengeance est un succès massif.",
      author: "Frank Sinatra",
    },

    {
      text: "Le plus grand risque est de ne prendre aucun risque. Dans un monde qui change très rapidement, la seule stratégie qui échoue à coup sûr est de ne pas prendre de risques.",
      author: "Mark Zuckerberg",
    },
    {
      text: "La logique vous mènera de A à B. L'imagination vous mènera partout.",
      author: "Albert Einstein",
    },
    {
      text: "Ce n'est pas ce que vous regardez qui compte, c'est ce que vous voyez.",
      author: "Henry David Thoreau",
    },
    {
      text: "La seule limite à notre réalisation de demain sera nos doutes d'aujourd'hui.",
      author: "Franklin D. Roosevelt",
    },
    {
      text: "Le succès n'est pas définitif, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
      author: "Winston Churchill",
    },
    {
      text: "La créativité, c'est l'intelligence qui s'amuse.",
      author: "Albert Einstein",
    },
    {
      text: "L'avenir a un nom merveilleux : le possible.",
      author: "Victor Hugo",
    },
    {
      text: "La vie est une aventure audacieuse ou rien du tout.",
      author: "Helen Keller",
    },
    {
      text: "Le bonheur n'est pas d'avoir tout ce qu'on désire, mais d'aimer ce qu'on a.",
      author: "Confucius",
    },
    {
      text: "La curiosité est le moteur de la connaissance.",
      author: "Albert Einstein",
    },
    {
      text: "Le temps que vous aimez perdre n'est pas perdu.",
      author: "Bertrand Russell",
    },
    {
      text: "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi.",
      author: "Georges Clemenceau",
    },
    {
      text: "La persévérance est la clé de tous les succès.",
      author: "Victor Hugo",
    },
    {
      text: "N'aie pas peur de la perfection, tu ne l'atteindras jamais.",
      author: "Salvador Dali",
    },
    {
      text: "Le plus grand plaisir de la vie est de faire ce que les gens disent que vous ne pouvez pas faire.",
      author: "Walter Bagehot",
    },
    {
      text: "La vie est trop courte pour être petite.",
      author: "Benjamin Disraeli",
    },
    {
      text: "Le bonheur est un choix que nous faisons, pas un endroit où nous arrivons.",
      author: "Walt Disney",
    },
    {
      text: "La meilleure vengeance est un succès massif.",
      author: "Frank Sinatra",
    },

    {
      text: "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.",
      author: "Gandhi",
    },
    {
      text: "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
      author: "Winston Churchill",
    },
    {
      text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
      author: "Steve Jobs",
    },
    {
      text: "La créativité, c'est l'intelligence qui s'amuse.",
      author: "Albert Einstein",
    },
    {
      text: "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il découle de vos propres actions.",
      author: "Dalaï Lama",
    },
    {
      text: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.",
      author: "Confucius",
    },
    {
      text: "Soyez le changement que vous voulez voir dans le monde.",
      author: "Gandhi",
    },
    {
      text: "La simplicité est la sophistication suprême.",
      author: "Léonard de Vinci",
    },
    {
      text: "L'imagination est plus importante que le savoir.",
      author: "Albert Einstein",
    },
    {
      text: "Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant.",
      author: "Proverbe chinois",
    },
  ];

  // Fonction pour générer une citation aléatoire
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  // Fonction pour afficher une nouvelle citation
  function newQuote() {
    // Ajouter une animation de sortie
    quoteText.style.opacity = 0;
    authorText.style.opacity = 0;

    setTimeout(() => {
      const quote = getRandomQuote();
      quoteText.textContent = quote.text;
      authorText.textContent = quote.author;

      // Ajouter une animation d'entrée
      quoteText.style.opacity = 1;
      authorText.style.opacity = 1;
    }, 500);
  }

  // Fonction pour tweeter la citation
  function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
  }

  function shareOnFacebook() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const text = `${quote} - ${author}`;

    navigator.clipboard.writeText(text).then(() => {
      alert("Texte copié ! Collez-le dans votre statut/publication Facebook.");
      window.open("https://www.facebook.com/sharer", "_blank");
    });
  }

  function shareOnWhatsApp() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      quote + " - " + author
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  // Event listeners
  newQuoteBtn.addEventListener("click", newQuote);
  twitterBtn.addEventListener("click", tweetQuote);
  facebookBtn.addEventListener("click", shareOnFacebook);
  whatsappBtn.addEventListener("click", shareOnWhatsApp);

  // Générer une citation au chargement
  newQuote();

  // Ajouter des animations CSS pour les transitions
  quoteText.style.transition = "opacity 0.5s ease";
  authorText.style.transition = "opacity 0.5s ease";
});
