const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

let toyCollection = document.getElementById("toy-collection");
let newToyForm = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", getToys);

function renderToys(json) {
  for (const toy of json) {
    //brings back the hash
    let name = toy.name;
    let image = toy.image;
    let likes = toy.likes;
    let id = toy.id 
    let nameElement = document.createElement("h2");
    let imageElement = document.createElement("img");
    let button = document.createElement("button");
    let toyDiv = document.createElement("div");
    toyDiv.className = "card";
    button.className = "like-button";
    button.innerText = "Like";
    button.setAttribute('data-id', id )
    button.addEventListener("click", event => addLike(event));
    imageElement.setAttribute("class", "toy-avatar");
    let likesElement = document.createElement("p");
    nameElement.innerText = name;
    imageElement.src = image;
    likesElement.innerText = likes;
    toyCollection.appendChild(toyDiv);
    toyDiv.appendChild(nameElement);
    toyDiv.appendChild(imageElement);
    toyDiv.appendChild(likesElement);
    toyDiv.appendChild(button);
  }
}

function getToys() {
  return fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => renderToys(json));
}

newToyForm.addEventListener("submit", addNewToy);

let nameForm = document.querySelector("form>input[name='name']");
let imageForm = document.querySelector("form>input[name='image']");


// name: event.target.querySelector("input[name='name']"), 
//       image: event.target.querySelector("input[name'image']"

function addNewToy(event) {
  event.preventDefault();
  let configToyObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      { name: nameForm.value,
        image: imageForm.value,
      likes: 0    
     })
  }
  fetch("http://localhost:3000/toys", configToyObj).then(getToys)
  toyForm.style.display = "none"  
  }

function addLike(event){ 
   numLikes = event.target.parentNode.querySelector("p").innerText
   numLikes++
   idUrl = event.target.dataset.id
   url = `http://localhost:3000/toys/${idUrl}`
    let configLikeObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      { likes: numLikes  
     })
  }
  fetch(url, configLikeObj)
}
 
