const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector("div#toy-collection")
const url = "http://localhost:3000/toys/"
// YOUR CODE HERE

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
document.addEventListener('DOMContentLoaded', e => {
  fetch(url)
    .then(resp => resp.json())
    .then(handleToyCardsFetch)

})


function handleToyCardsFetch(toys) {

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
      likes.innerText = toy.likes

      let likeBtn = document.createElement('button')
      likeBtn.classList.add('like-btn')
      likeBtn.innerText = "Like <3"
      likeBtn.addEventListener('click', handleLikeBtnClick)


      toyCard.append(toyName, toyImg, likes, likeBtn)
      toyCollection.appendChild(toyCard)
    })
  } else {
    const toyCard = document.createElement('div')
    toyCard.classList.add("card")
    toyCard.setAttribute("data-id", toy.id)

    let toyName = document.createElement('h2')
    toyName.innerText = toys.name

    let toyImg = document.createElement('img')
    toyImg.setAttribute('src', toys.image)
    toyImg.classList.add('toy-avatar')

    let likes = document.createElement('p')
    likes.innerText = toys.likes

    let likeBtn = document.createElement('button')
    likeBtn.classList.add('like-btn')
    likeBtn.innerText = "Like <3"
    likeBtn.addEventListener('click', handleLikeBtnClick)


    toyCard.append(toyName, toyImg, likes, likeBtn)
    toyCollection.appendChild(toyCard)
  }
}


// Create new Toy
const addToyForm = document.querySelector('form.add-toy-form')
const addToyName = document.querySelector('form.add-toy-form input[name="name"]')
const addToyImage = document.querySelector('form.add-toy-form input[name="image"]')


addToyForm.addEventListener('submit', handleNewToyFormSubmission)

function handleNewToyFormSubmission(e) {
  e.preventDefault()
  let name = addToyName.value
  let image = addToyImage.value


  data = {
    name,
    image,
    likes: 0
  }
  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch(url, configObj).then(resp => resp.json()).then(handleToyCardsFetch)
  toyForm.style.display = 'none'
}

// Like button


function handleLikeBtnClick(e) {
  let button = e.target;
  let card = e.target.parentNode;
  let likes = button.previousElementSibling
  let likesInt = parseInt(likes.innerText, 10)
  likes.innerText = ++likesInt
  let data = {
    likes: likesInt
  }
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }
  
  fetch(url + card.dataset.id, configObj)
}