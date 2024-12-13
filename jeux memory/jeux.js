// Mélange un tableau de manière aléatoire
function melanger(tab) {
  let list_plateau = [];
  for (let i = 0; i < tab.length; i++) {
      do {
          // Je génère un nombre aléatoire de 0 à la taille du tableau
          x = Math.floor(Math.random() * tab.length);
      } while (list_plateau[x] != undefined);
      // Tant que l'emplacement n'est pas vide
      list_plateau[x] = tab[i];
  }
  return list_plateau;
}

// Création des cartes doublées
function creerPlateau(list_img) {
  return melanger([...list_img, ...list_img]);
}

// Affichage des cartes dans le conteneur
function afficherCartes(tab) {
  const container = document.querySelector(".container");
  if (container) {
      container.innerHTML = ""; // S'assurer que le conteneur est vide
      tab.forEach(valeur => {
          const div = document.createElement("div");
          div.classList.add("carte-container");
          const img = document.createElement("img");
          img.src = `img/${valeur}.webp`;
          div.appendChild(img);
          container.appendChild(div);
      });
  }
}

// Gestion des clics sur les cartes
function gestionClics(cartes, tab, startTime, stopChrono) {
  let selection = [];
  let matchedPairs = 0;

  cartes.forEach((carte, index) => {
      carte.addEventListener("click", function onClick() {
          if (selection.length < 2 && !carte.classList.contains("matched")) {
              carte.parentElement.classList.add("selected");
              selection.push({ index, carte });

              if (selection.length === 2) {
                  const [first, second] = selection;
                  // Vérifie que les deux cartes sont différentes
                  if (first.index !== second.index) {
                      if (tab[first.index] === tab[second.index]) {
                          // Bonne correspondance
                          first.carte.parentElement.classList.add("matched");
                          second.carte.parentElement.classList.add("matched");

                          // Faire disparaître les cartes
                          first.carte.parentElement.style.visibility = "hidden";
                          second.carte.parentElement.style.visibility = "hidden";

                          matchedPairs++;

                          if (matchedPairs === 12) {
                              const endTime = new Date();
                              stopChrono(); // Arrêter le chronomètre
                              alert(`Temps écoulé : ${(endTime - startTime) / 1000} secondes`);
                          }
                      } else {
                          // Mauvaise correspondance
                          first.carte.parentElement.classList.remove("selected");
                          second.carte.parentElement.classList.remove("selected");
                      }
                  } else {
                      // Réinitialise la sélection si la même carte est cliquée deux fois
                      first.carte.parentElement.classList.remove("selected");
                      second.carte.parentElement.classList.remove("selected");
                  }
                  selection = [];
              }
          }
      });
  });
}

// Fonction de gestion du chronomètre
function lancerChrono(displayElement) {
  let secondes = 0;
  let minutes = 0;

  const intervalId = setInterval(() => {
      secondes++;
      if (secondes === 60) {
          secondes = 0;
          minutes++;
      }

      // Formatage de l'affichage
      displayElement.textContent = `${minutes.toString().padStart(2, "0")}:${secondes.toString().padStart(2, "0")}`;
  }, 1000);

  // Retourne une fonction pour arrêter le chronomètre
  return () => clearInterval(intervalId);
}

// Initialisation du jeu
function initJeu() {
  const list_img = Array.from({ length: 12 }, (_, i) => i);
  const list_plateau = creerPlateau(list_img);
  afficherCartes(list_plateau);

  const chronoElement = document.querySelector(".chrono");
  const stopChrono = lancerChrono(chronoElement); // Lance le chrono et récupère la fonction d'arrêt

  const startTime = new Date();
  const cartes = document.querySelectorAll(".container img");
  gestionClics(cartes, list_plateau, startTime, stopChrono);
}

// Lancer le jeu
initJeu();
