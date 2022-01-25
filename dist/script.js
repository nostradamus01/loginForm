document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);

const getFormData = (form, deleteKey) => {
	let ob = {};
	let data = new FormData(form);
	if (deleteKey) {
		data.delete(deleteKey);
	}
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
	console.log(response.json());
}

const login = async (userData) => {
	let response = await sendRequest('/api/user/login', userData);
	console.log(await response.json());
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
	register(getFormData(e.target, 'repassword')).then(() => {
		console.log('register done');
	});
});
