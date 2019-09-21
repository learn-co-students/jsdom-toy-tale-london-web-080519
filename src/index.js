const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollectionDiv = document.querySelector("div#toy-collection");
const addNewToyForm = document.querySelector("form.add-toy-form");
const toyUrl = "http://localhost:3000/toys";

let addToy = false;

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", event => {
  // APPEND TOY TO HTML

  function addToyH2(toy) {
    const newH2 = document.createElement("h2");
    newH2.innerText = toy.name;
    return newH2;
  }

  function addToyImg(toy) {
    const newImg = new Image();
    newImg.classList = "toy-avatar";
    newImg.src = toy.image;
    return newImg;
  }
  function addToyLikes(toy) {
    if (document.getElementById(`${toy.id}`)) {
      const newP = document.getElementById(`${toy.id}`).querySelector("p");
      newP.innerText = ` ${toy.likes} Likes `;
      return newP;
    } else {
      const newP = document.createElement("p");
      newP.innerText = ` ${toy.likes} Likes `;
      return newP;
    }
  }
  function addToyLikeButton() {
    const newLikeButton = document.createElement("button");
    newLikeButton.classList = "like-btn";
    newLikeButton.innerText = "Like <3";
    return newLikeButton;
  }

  function addToyDeleteButton() {
    const newDeleteButton = document.createElement("button");
    newDeleteButton.classList = "delete-btn";
    newDeleteButton.innerText = "Delete";
    return newDeleteButton;
  }

  function appendToy(toy) {
    newDiv = document.createElement("div");
    newDiv.id = toy.id;
    newDiv.classList = "card";

    const newH2 = addToyH2(toy);
    const newImg = addToyImg(toy);
    const newP = addToyLikes(toy);
    const newLikeButton = addToyLikeButton();
    const newDeleteButton = addToyDeleteButton();

    toyCollectionDiv.appendChild(newDiv);
    newDiv.appendChild(newH2);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newP);
    newDiv.appendChild(newLikeButton);
    newDiv.appendChild(newDeleteButton);
  }

  function appendToyCollection(json) {
    for (const toy of json) {
      appendToy(toy);
    }
  }

  // FETCH ALL TOYS

  fetch(toyUrl)
    .then(response => response.json())
    .then(json => appendToyCollection(json));

  // CREATE NEW TOY

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  function addNewToy(url, data) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(json => appendToy(json))
  }

  function handleSubmit(event) {
    event.preventDefault();
    const toyName = event.target[0].value;
    const toyImg = event.target[1].value;
    const data = {
      name: toyName,
      image: toyImg,
      likes: 0
    };
    addNewToy(toyUrl, data);
    event.target.reset();
  }
  
  addNewToyForm.addEventListener("submit", handleSubmit);

  // LIKE BUTTON

  function handleLike(url, json) {
    const toy = json;
    const toyNewLikes = toy.likes + 1;
    fetch(`${url}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: toyNewLikes })
    })
      .then(response => response.json())
      .then(json => addToyLikes(json));
  }

  function fetchToyLikes(id) {
    fetch(`${toyUrl}/${id}`)
      .then(response => response.json())
      .then(json => handleLike(toyUrl, json));
  }

  function getElementIdToPatch(event) {
    const elementId = event.path[1].id;
    fetchToyLikes(elementId);
  }


  document.addEventListener("click", event => {
    if (
      event.target.tagName == "BUTTON" &&
      event.target.className == "like-btn"
    ) {
      getElementIdToPatch(event);
    }
  });

  // DELETE BUTTON

  function fetchToyDelete(url, elementId) {
    fetch(`${url}/${elementId}`, {
      method: "DELETE"
    }).then(response => response.json());
    document.getElementById(elementId).remove()
  }

  function getElementIdToDelete(event) {
    const elementId = event.path[1].id;
    fetchToyDelete(toyUrl, elementId);
  }

  document.addEventListener("click", event => {
    if (
      event.target.tagName == "BUTTON" &&
      event.target.className == "delete-btn"
    ) {
      getElementIdToDelete(event);
    }
  });
});

// OR HERE!
