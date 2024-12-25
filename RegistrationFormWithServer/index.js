document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginBtn.addEventListener('click', () => {
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerBtn.addEventListener('click', () => {
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });
});

document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  const messageElement = document.getElementById('register-message');

  if (password !== confirmPassword) {
      showMessage(messageElement, 'Пароли не совпадают', false);
      return;
  }

  fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === 'Email уже зарегистрирован') {
          showMessage(messageElement, 'Email уже зарегистрирован. Пожалуйста, используйте другой email.', false);
      }
      else {
          showMessage(messageElement, 'Пользователь добавлен успешно!', true);
          clearForm();
      }
  })
  .catch(error => {
      showMessage(messageElement, 'Ошибка регистрации', false);
      console.error('Error:', error);
  });
});

function showMessage(element, message, isSuccess) {
  element.innerText = message;
  element.classList.toggle('success', isSuccess);
}

function clearForm() {
  document.getElementById('register-name').value = '';
  document.getElementById('register-email').value = '';
  document.getElementById('register-password').value = '';
  document.getElementById('register-confirm-password').value = '';
}

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const messageElement = document.getElementById('login-message');

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Неверный email или пароль') {
      showMessage(messageElement, 'Неверный email или пароль', false);
    }
    else {
      showMessage(messageElement, 'Вход выполнен успешно!', true);
    }
  })
  .catch(error => {
    showMessage(messageElement, 'Ошибка входа', false);
    console.error('Error:', error);
  });
});