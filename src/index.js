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
  let totalLikes = event.target.parentNode.children[2].innerText[0]
  let theToysLikes = parseInt(totalLikes)
  theToysLikes = theToysLikes + 1


  let id = event.target.id
  return fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, body: JSON.stringify({
      "likes": theToysLikes
    })
  }).then(data=>{
     data.json()
     totalLikes = `${theToysLikes}`
    })
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

const addToyForm = document.querySelector('form.add-toy-form')
const createToy = document.querySelector('input.submit')

toyForm.addEventListener("submit", addNewToy)

function addNewToy(event) {
  submitToy(event.target[0].value, event.target[1].value)
 // event.preventDefault();
}

function submitToy(name, img) {
  console.log(name)
  let formData = {
    name: name,
    image: img,
    likes: 0
  };
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }).then(response => response.json())
  .then(data=> data.json)
  .catch(function (error) {
    document.body.innerHTML = error.message;
  })
}

