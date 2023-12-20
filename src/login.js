const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  if (element.classList.contains('border-danger')) {
    return;
  }
  element.classList.add('border-danger');

  const div = document.createElement('div');
  div.innerText = message;
  div.classList.add('text-danger');
  element.parentElement.appendChild(div);
};

const setSucces = (element) => {
  if (!element.classList.contains('border-danger')) {
    return;
  }
  element.classList.remove('border-danger');
  element.parentElement.querySelector(':nth-child(3)').remove();
};

const validateInputs = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue.substring(emailValue.length - 15) !== '@ogr.deu.edu.tr') {
    setError(email, '@ogr.deu.edu.tr ile bitmeli');
  } else {
    setSucces(email);
  }

  if (passwordValue.length < 8) {
    setError(password, 'sifre 8 karekterden uzun olmali');
  } else {
    setSucces(password);
  }
};
