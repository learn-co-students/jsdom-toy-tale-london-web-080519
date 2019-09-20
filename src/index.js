const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const newToy = document.querySelector(".add-toy-form");
const indexUrl = "http://localhost:3000/toys/";
let addToy = false;

// YOUR CODE HERE
getToys();

addBtn.addEventListener("click", () => {
	// hide & seek with the form
	addToy = !addToy;
	if (addToy) {
		toyForm.style.display = "block";
	} else {
		toyForm.style.display = "none";
	}
});

newToy.addEventListener("submit", event => {
	let data = {
		name: event.target[0].value,
		image: event.target[1].value,
		likes: 0,
	};
	createToy(indexUrl, data);
	event.preventDefault();
});

function createToy(url, data) {
	createCard(data);
	return fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	}).then(response => response.json());
}

// OR HERE!
function getToys() {
	return fetch(indexUrl)
		.then(response => response.json())
		.then(json => renderToys(json))
		.catch(error => alert(error));
}

function renderToys(json) {
	json.forEach(function(element) {
		createCard(element);
	});
}

function createCard(info) {
	let card = document.createElement("div");
	card.className = "card";
	let title = document.createElement("h2");
	title.innerText = info.name;
	card.appendChild(title);
	let image = document.createElement("img");
	image.className = "toy-avatar";
	image.src = info.image;
	card.appendChild(image);
	let text = document.createElement("p");
	let number = document.createElement("span");
	let likes = document.createElement("span");
	number.innerText = parseInt(info.likes);
	text.appendChild(number);
	likes.innerText = parseInt(number) > 1 ? " likes" : " like";
	text.appendChild(likes);
	card.appendChild(text);
	let button = document.createElement("button");
	button.id = info.id;
	button.className = "like-btn";
	button.innerText = "Like";
	button.addEventListener("click", event => {
		addLike(event);
	});
	card.appendChild(button);
	toyCollection.appendChild(card);
}

function addLike(event) {
	let number = event.target.parentNode.children[2].children[0];
	number.innerText = parseInt(number.innerText) + 1;
	let updateUrl = indexUrl + event.target.id;
	let data = { likes: number.innerText };
	return fetch(updateUrl, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	}).then(response => response.json());
}
