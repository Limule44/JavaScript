
class Personne {
    constructor(prenom, nom, status = false) {
      this.prenom = prenom;
      this.nom = nom;
      this.status = status;
    }
  }
  
  let personnes = JSON.parse(localStorage.getItem("personnes")) || [];
  
  function afficherPersonnes() {
    const tbody = document.getElementById("myTbody");
    tbody.innerHTML = ""; 
  
    personnes.forEach((personne, index) => {
      const tr = document.createElement("tr");
      tr.classList.add(personne.status ? "table-success" : "table-danger");
  
      const tdPrenom = document.createElement("td");
      tdPrenom.textContent = personne.prenom;
  
      const tdNom = document.createElement("td");
      tdNom.textContent = personne.nom;
  
      const tdSupprimer = document.createElement("td");
      const btnSupprimer = document.createElement("button");
      btnSupprimer.className = "btn btn-danger btn-sm";
      btnSupprimer.innerHTML = '<i class="fa fa-trash"></i>';
      btnSupprimer.onclick = () => supprimerPersonne(index);
      tdSupprimer.appendChild(btnSupprimer);
  
      const tdChangerStatut = document.createElement("td");
      const btnChangerStatut = document.createElement("button");
      btnChangerStatut.className = "btn btn-warning btn-sm";
      btnChangerStatut.innerHTML = '<i class="fa fa-check"></i>';
      btnChangerStatut.onclick = () => changerStatut(index);
      tdChangerStatut.appendChild(btnChangerStatut);
  
      tr.appendChild(tdPrenom);
      tr.appendChild(tdNom);
      tr.appendChild(tdSupprimer);
      tr.appendChild(tdChangerStatut);

      tbody.appendChild(tr);
    });
  }
  

  function ajouterPersonne(event) {
    event.preventDefault();
    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
  
    if (prenom && nom) {
      personnes.push(new Personne(prenom, nom));
      sauvegarderPersonnes();
      afficherPersonnes();
      document.getElementById("personneForm").reset();
    } else {
      alert("Veuillez remplir les champs Prénom et Nom.");
    }
  }
  
  function supprimerPersonne(index) {
    if (confirm("Voulez-vous vraiment supprimer cette personne ?")) {
      personnes.splice(index, 1);
      sauvegarderPersonnes();
      afficherPersonnes();
    }
  }
  
  function changerStatut(index) {
    personnes[index].status = !personnes[index].status;
    sauvegarderPersonnes();
    afficherPersonnes();
  }
  
  function sauvegarderPersonnes() {
    localStorage.setItem("personnes", JSON.stringify(personnes));
  }
  
  // Événement sur le formulaire
  document.getElementById("personneForm").addEventListener("submit", ajouterPersonne);
  
  // Affichage initial
  afficherPersonnes();