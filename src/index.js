// API Functions

function get(url) {
  return fetch(url).then(resp => resp.json())
}

function post(url, data) {
  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(data)
  }
  return fetch(url, configObj).then(resp => resp.json())
}

function patch(url, id, data) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }
  return fetch(url + id, configObj).then(resp => resp.json())
}

function destroy(url, id) {
  let configObj = {
    method: "DELETE",
  }
  return fetch(url + id, configObj)
}

const API = {
  get,
  post,
  patch,
  destroy
}


// Variable declarations
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector("div#toy-collection")
const url = "http://localhost:3000/toys/"

const addToyForm = document.querySelector('form.add-toy-form')
const addToyName = document.querySelector('form.add-toy-form input[name="name"]')
const addToyImage = document.querySelector('form.add-toy-form input[name="image"]')


// Function definitions

function handleGetToyCards(toys) {

  if (Array.isArray(toys)) {
    toys.forEach(toy => {
      const toyCard = document.createElement('div')
      toyCard.classList.add("card")
      toyCard.setAttribute("data-id", toy.id)

      let toyName = document.createElement('h2')
      toyName.innerText = toy.name

      let toyImg = document.createElement('img')
      toyImg.setAttribute('src', toy.image)
      toyImg.classList.add('toy-avatar')

      let likes = document.createElement('p')
      likes.innerText = `${toy.likes} like${toy.likes === 1 ? '' : 's'}`

      let likeBtn = document.createElement('button')
      likeBtn.classList.add('like-btn')
      likeBtn.innerText = "Like <3"
      likeBtn.addEventListener('click', handleLikeBtnClick)

      let delBtn = document.createElement('button')
      delBtn.classList.add('del-btn')
      delBtn.innerText = 'Delete Toy'
      delBtn.addEventListener('click', handleDeleteBtnClick)


      toyCard.append(toyName, toyImg, likes, likeBtn, delBtn)
      toyCollection.appendChild(toyCard)
    })
  } else {
    const toyCard = document.createElement('div')
    toyCard.classList.add("card")
    toyCard.setAttribute("data-id", toys.id)

    let toyName = document.createElement('h2')
    toyName.innerText = toys.name

    let toyImg = document.createElement('img')
    toyImg.setAttribute('src', toys.image)
    toyImg.classList.add('toy-avatar')

    let likes = document.createElement('p')
    likes.innerText = `${toys.likes} like${toys.likes === 1 ? '' : 's'}`

    let likeBtn = document.createElement('button')
    likeBtn.classList.add('like-btn')
    likeBtn.innerText = "Like <3"
    likeBtn.addEventListener('click', handleLikeBtnClick)

    let delBtn = document.createElement('button')
    delBtn.classList.add('del-btn')
    delBtn.innerText = 'Delete Toy'
    delBtn.addEventListener('click', handleDeleteBtnClick)


    toyCard.append(toyName, toyImg, likes, likeBtn, delBtn)
    toyCollection.appendChild(toyCard)
  }
}


// Create new Toy



function handleNewToyFormSubmission(e) {
  e.preventDefault()
  let name = addToyName.value
  let image = addToyImage.value


  data = {
    name,
    image,
    likes: 0
  }

  API.post(url, data).then(handleGetToyCards)
  toyForm.style.display = 'none'
}

// Like button


function handleLikeBtnClick(e) {
  let button = e.target;
  let card = e.target.parentNode;
  let likes = button.previousElementSibling
  let likesInt = parseInt(likes.innerText, 10)

  let data = {
    likes: ++likesInt
  }
  
  API.patch(url, card.dataset.id, data).then(toy => {
    likes.innerText = `${toy.likes} like${toy.likes === 1 ? '' : 's'}`
  })
}

// Del Btn
function handleDeleteBtnClick(e) {
  let button = e.target
  let card = button.parentNode
  
  API.destroy(url, card.dataset.id)
  card.remove()
}

// Event listeners



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    addToyForm.addEventListener('submit', handleNewToyFormSubmission)
  } else {
    toyForm.style.display = 'none'
    addToyForm.removeEventListener('submit', handleNewToyFormSubmission)

  }
})

document.addEventListener('DOMContentLoaded', e => {
  API.get(url)
    .then(handleGetToyCards)

})