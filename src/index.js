let currentPage = 1;
const previousBtn = document.getElementById('previousPage');
const nextBtn = document.getElementById('nextPage');
const displayAdverts = document.getElementById('displayAdverts');

displayAdvertList();

function displayAdvertList() {
  fetch(`url/${currentPage}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 10; i++) {
        if (data.data[i]) {
          displayAdvert(data.data[i]);
        }
      }
    });
}

//displayAdvert(1);
function displayAdvert(item) {
  const advertsParent = document.getElementById('displayAdverts');
  const advertDisplay = document.createElement('article');
  advertDisplay.innerHTML = `<article id="${item.advert_id}" class="row mb-3">
  <div class="col-8">
      
      <span class="small ml-1"
          >${item.user_name + ' ' + item.user_surname}
      </span>
      <h6 class="mt-2">
          <strong>
              ${item.advert_title}
          </strong>
      </h6>
      <p>
          ${item.details}
      </p>
      <ul class="list-inline small">
          <li class="list-inline-item">
              ${formatISODate(item.ad_date)}
          </li>
          <li class="list-inline-item">
              <i class="far fa-star"></i>
          </li>
      </ul>
  </div>
  <div class="col-4">
      <img
          ${item.image}
      />
  </div>
</article>`;
  advertsParent.appendChild(advertDisplay);
}

function formatISODate(isoDateTime) {
  const date = new Date(isoDateTime);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const dateTimeFormat = new Intl.DateTimeFormat('tr-TR', options);

  const formattedDate = dateTimeFormat.format(date);

  return formattedDate;
}

function updatePageNumber() {
  document.getElementById('pageNumber').innerText = currentPage;
  displayAdvertList();
}

function nextPage() {
  currentPage++;
  updatePageNumber();
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageNumber();
  }
}

function goToAdvert(e) {
  const advertId = e.target.parentElement.parentElement.parentElement.id;

  fetch(`/advert/${advertId}`, {
    method: 'GET',
  }).then((response) => routePage(response, advertId));
}
const routePage = (response, id) => {
  switch (response.status) {
    case 200: //successful
      window.location.href = `/advert/${id}`;
      break;
    case 400: //un successful
      window.alert('hata');
      break;
    case 401:
      window.alert('hata');
      break;
    default:
      console.error('Unhandled status code:', response.status);
      break;
  }
};
function init() {
  previousBtn.addEventListener('click', previousPage);
  nextBtn.addEventListener('click', nextPage);
  displayAdverts.addEventListener('click', goToAdvert);
}

init();
