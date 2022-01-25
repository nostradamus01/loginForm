const mainContainer = document.querySelector('.main');
const signUpHeaderBtn = document.querySelector('.signup-header');
const loginHeaderBtn = document.querySelector('.login-header');

const loginMsgBox = document.querySelector('#loginMsg');
const signupMsgBox = document.querySelector('#signupMsg');

signUpHeaderBtn.addEventListener('click', () => {
	mainContainer.classList.remove('login-active');
});

loginHeaderBtn.addEventListener('click', () => {
	mainContainer.classList.add('login-active');
});

const getRegistrationData = (data) => {
	let ob = {};
	for (let [key, value] of data.entries()) {
		ob[key] = value;
	}
	return ob;
}

const getFormData = (form) => {
	let ob = {};
	let data = new FormData(form);
	for (let [key, value] of data.entries()) {
		ob[key] = value;
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
	return await sendRequest('/.netlify/functions/mongo/register', userData);
}

const login = async (userData) => {
	return await sendRequest('/.netlify/functions/mongo/login', userData);
}

const loginForm = document.querySelector('#loginForm');
const registrationForm = document.querySelector('#registrationForm');

loginForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	let res = await login(getFormData(e.target));
	console.log(res);
});

registrationForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	let formData = getFormData(e.target);
	if (formData.password === formData.repassword) {
		delete formData.repassword;
		signupMsgBox.innerHTML = ``;
	} else {
		signupMsgBox.innerHTML = `Password mismatch`;
	}
	console.log(formData);
	// register().then(() => {
	// 	console.log('register done');
	// });
});
