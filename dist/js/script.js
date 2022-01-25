const mainContainer = document.querySelector('.main');
const signUpHeaderBtn = document.querySelector('.signup-header');
const loginHeaderBtn = document.querySelector('.login-header');

signUpHeaderBtn.addEventListener('click', () => {
	mainContainer.classList.remove('login-active');
});

loginHeaderBtn.addEventListener('click', () => {
	mainContainer.classList.add('login-active');
});

const getFormData = (form) => {
	let ob = {};
	let data = new FormData(form);
	for(let pair of data.entries()) {
		ob[pair[0]] = pair[1];
	}
	return ob;
}

const sendRequest = async (url, data) => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const register = async (userData) => {
	let response = await sendRequest('/api/user/register', userData);
	console.log(response);
}

const login = async (userData) => {
	let response = await sendRequest('/api/user/login', userData);
	console.log(response);
}

const loginForm = document.querySelector('#loginForm');
const registrationForm = document.querySelector('#registrationForm');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	login(getFormData(e.target)).then(() => {
		console.log('login done');
	});
});

registrationForm.addEventListener('submit', (e) => {
	e.preventDefault();
	register(getFormData(e.target)).then(() => {
		console.log('register done');
	});
});
