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
	loginMsgBox.innerHTML = '';
	if (res.ok) {
		if (!res.login) {
			e.target.password.value = '';
			loginMsgBox.innerHTML = res.message;
		} else {
			window.location.replace('https://google.com');
		}
	} else {
		alert('We have a big problem');
	}
});

registrationForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	let formData = getFormData(e.target);
	signupMsgBox.innerHTML = '';
	if (formData.password === formData.repassword) {
		if (formData.password.length >= 8 && formData.password.length <= 32) {
			delete formData.repassword;
			let res = await register(formData);
			if (res.ok) {
				e.target.reset();
				signupMsgBox.innerHTML = 'You have successfully registered';
			} else {
				alert('We have a big problem');
			}
		} else {
			signupMsgBox.innerHTML = 'Password must contain 8-32 symbols';
		}
	} else {
		signupMsgBox.innerHTML = 'Password mismatch';
	}
});
