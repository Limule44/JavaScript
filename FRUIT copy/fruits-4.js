
let fruits = [];


function afficherFruits() {
  const tbody = document.getElementById("myTbody");
  tbody.innerHTML = ""; 
  
  
  console.log("Contenu du tableau JS :", fruits);
  
  fruits.forEach((fruit, index) => {
    
    const tr = document.createElement("tr");

    
    const tdFruit = document.createElement("td");
    tdFruit.textContent = fruit;

    
    const tdAction = document.createElement("td");
    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.onclick = () => supprimerFruit(index); 
    tdAction.appendChild(btnSupprimer);

    
    tr.appendChild(tdFruit);
    tr.appendChild(tdAction);

    
    tbody.appendChild(tr);
  });
}


function ajouterFruit() {
  const input = document.getElementById("fruit");
  const fruit = input.value.trim(); 
  if (!fruit) {
    alert("Veuillez entrer un fruit valide !");
    return;
  }
  fruits.push(fruit); 
  input.value = ""; 
  afficherFruits(); 
}


function supprimerFruit(index) {
  const fruit = fruits[index];
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${fruit}" ?`)) {
    fruits.splice(index, 1); 
    afficherFruits(); 
  }
}


document.getElementById("btnAjouter").addEventListener("click", ajouterFruit);