document.getElementById("btnAjouter").onclick = () => {
   
    const myTbody = document.getElementById("myTbody");
  
    
    const fruit = document.getElementById("fruit").value.trim();
  
    if (fruit === "") {
      alert("Veuillez entrer un nom de fruit !");
      return;
    }
  
    
    document.getElementById("fruit").value = "";
  
  
    const tr = document.createElement("tr");
  
    
    const td1 = document.createElement("td");
    td1.textContent = fruit;
    tr.appendChild(td1);
  
    
    const td2 = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger");
  
   
    const i = document.createElement("i");
    i.classList.add("fa", "fa-trash");
    button.appendChild(i);
    button.appendChild(document.createTextNode(" Supprimer"));
  
    
    button.onclick = (event) => {
      event.target.closest("tr").remove();
    };
  
    td2.appendChild(button);
    tr.appendChild(td2);
  
   
    myTbody.appendChild(tr);
  };