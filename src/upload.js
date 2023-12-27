const form = document.getElementById('form');
const image = document.getElementById('image');
const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const category = document.getElementById('category');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateInputs()) {
    createPost();
  }
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
  } else {
    element.classList.remove('border-danger');
    element.parentElement.querySelector(':nth-child(3)').remove();
  }
};

const validateInputs = () => {
  let flag = true;
  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value;

  if (titleValue.length > 254) {
    setError(title, 'Maksimum siniri astiniz');
    flag = false;
  } else {
    setSucces(title);
  }
  if (descriptionValue.length > 499) {
    setError(description, 'Maksimum siniri astiniz');
    flag = false;
  } else {
    setSucces(description);
  }
  if (priceValue.length > 12) {
    setError(price, 'Maksimum siniri astiniz');
    flag = false;
  } else {
    setSucces(price);
  }
  return flag;
};

const createPost = () => {
  const url = window.location.href;
  // const file = image.files[0];
  // const data = new FormData();
  const data = {
    // image: file,
    title: title.value,
    description: description.value,
    price: price.value,
    category: category.value,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => routePage(response))
    .catch((error) => console.error('Error:', error));
};

const routePage = (response) => {
  switch (response.status) {
    case 201: //successful
      window.location.href = '/';
      break;
    case 400: //unsuccessful
      window.alert('Uru yukleme hatasi');
      break;
    default:
      console.error('Unhandled status code:', response.status);
      break;
  }
};
