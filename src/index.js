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
  button.innerText = "Like <3"

  let frame = document.createElement('div')
  frame.setAttribute("class", "card")
  
  frame.appendChild(name)
  frame.appendChild(img)
  frame.appendChild(likes)
  frame.appendChild(button)

  toyCollection.appendChild(frame)
}

const likeButton = document.querySelectorAll("like-button")

//When page loads, make a get request to fetch all toys
document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(obj => {
      for (let i=0; i<obj.length; i++) {
          addToyToCollection(obj[i])
      }
    })

})


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
