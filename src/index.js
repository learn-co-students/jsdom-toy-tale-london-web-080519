const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE


//FETCH
//with response data, make div.card for each toy & append to #toy-collection
const toyCollection = document.getElementById("toy-collection")

function addToyToCollection(toy) {
  let name = document.createElement('h2')
  name.innerText = toy["name"]

  let img = document.createElement('img')
  img.setAttribute("src", toy['image'])
  img.setAttribute("class", "toy-avatar")

  let likes = document.createElement('p')
  likes.innerText = toy['likes'] + " Likes"

  let button = document.createElement('button')
  button.setAttribute("class", "like-btn")
  button.setAttribute("id", toy['id'])
  button.innerText = "Like <3"
  button.addEventListener("click", increaseLikes)

  let frame = document.createElement('div')
  frame.setAttribute("class", "card")
  
  frame.appendChild(name)
  frame.appendChild(img)
  frame.appendChild(likes)
  frame.appendChild(button)

  toyCollection.appendChild(frame)
}

const url = "http://localhost:3000/toys"

// 1. get the button
const likeButton = document.querySelectorAll(".like-button")

//patch request should pass in url id of toy and increase its id['likes'] by 1
function increaseLikes(event) {
  // let toySelected = event.target.parentNode.firstElementChild.innerText;
  let id = event.target.id
  return fetch(`${url}/${id}`, {
    method: 'PATCH',
    //mode: 'cors', 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, body: JSON.stringify({
      "likes": "get elements id, increase by 1"
    })
  })
 // .then(response=>response.json())
}

//When page loads, make a get request to fetch all toys
document.addEventListener("DOMContentLoaded", function() {
  fetch(url)
    .then(response => response.json())
    .then(obj => {
      for (let i=0; i<obj.length; i++) {
          addToyToCollection(obj[i])
      }
    })
})

addBtn.addEventListener("click", addNewToy)

function addNewToy(event) {
 // event.target
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!


