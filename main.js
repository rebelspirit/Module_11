const buttonGetUser = document.querySelector("#js-btn");
const tBody = document.querySelector("#js-tbody");
const allUsers = document.querySelector("#all-user").textContent.trim();
const buttonSearchById = document.querySelector("#js-search-by-ID");
const buttonAddUser = document.querySelector("#js-add-user");
const buttunDeleteUser = document.querySelector("#js-delete-by-ID");
const buttonUpdateUser = document.querySelector("#js-update-by-ID");

//Шаблон
const compile = _.template(allUsers);
const updateView = user => {
	let userString = "";
	user.map((index) => {
		userString += compile(index);
	});
	tBody.innerHTML = userString;
};

//Получаем пользователей БД
const getAllUsers = event => {
	event.preventDefault();
	fetch("https://test-users-api.herokuapp.com/users/")
	.then(response => {
		if (response.ok) return response.json();
		throw new Error("Error fetching data");
	})
	.then(user => {
	updateView(user.data);

})
	.catch(error => {
		console.error("Error: ", error);
	});
};

buttonGetUser.addEventListener("click", getAllUsers);

//Получаем пользователя по ID
const getUserById = id => {	
	id = document.querySelector("#input-ID");
	const resultById = document.querySelector(".result-ID");		
	fetch("https://test-users-api.herokuapp.com/users/" + id.value)
	.then(response => {
		if (response.ok) return response.json();
		throw new Error("Error fetching data");
	})
	.then(user => {
		console.log(user.data); 
	resultById.textContent = JSON.stringify(user.data.name);   
})
	.catch(error => {
		console.error("Error: ", error);
	});		
};

const getById = event => {
	event.preventDefault();
	getUserById(id);
};
buttonSearchById.addEventListener("click", getById);


//Добавляем юзера используя имя и возраст
const addUser = (name, age) => {	
	name = document.querySelector("#newUserName");
	age = document.querySelector("#newUserAge");
	fetch('https://test-users-api.herokuapp.com/users/', {
		method: 'POST',
		body: JSON.stringify({name: name.value, age: age.value}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	});	
};
const add = event => {
	event.preventDefault();
	addUser(name, age);
};
buttonAddUser.addEventListener("click", add);

//Удаляем юзера по ID
const removeUser = id => {	
	id = document.querySelector("#delete-user");
	fetch('https://test-users-api.herokuapp.com/users/' + id.value , {
		method: 'DELETE',
		headers: {
			"X-Custom-Header": "",
		}
	});		
};
const remove = event => {
	event.preventDefault();
	removeUser(id);
};
buttunDeleteUser.addEventListener("click", remove);

//Обновляем юзера используя ID добавляя новое имя и возраст
const updateUser = (id, name, age) => {	
	id = document.querySelector("#update-user");
	name = document.querySelector("#updetetUserName");
	age = document.querySelector("#updetetUserAge");

	const user = {
		name: name.value,
		age: age.value
	};
	console.log('success ' + user.name, user.age)
	fetch('https://test-users-api.herokuapp.com/users/' + id.value, {
		method: 'PUT',
		body: JSON.stringify({ name: user.name, age: user.age}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	});		
};
const update = event => {
	event.preventDefault();
	updateUser(id, name, age);
};
buttonUpdateUser.addEventListener("click", update);