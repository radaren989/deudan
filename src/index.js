let currentPage = 1;
previousBtn = document.getElementById('previousPage');
nextBtn = document.getElementById('nextPage');

const data = {
  success: true,
  data: [
    {
      advert_id: 1,
      advert_title: 'title',
      price: 'price',
      category: 'tugrul.demirozer@ogr.deu.edu.tr',
      passwrd: '$2b$10$YLhjIG2erq10Ayikfo5/JuL4f1NGG6LVuyzOUXoEN9WzNFEBc/lSK',
    },
    {
      user_id: 42,
      name: 'Vildan',
      surname: 'Çolak',
      email: 'vildan.colak@ogr.deu.edu.tr',
      passwrd: '$2b$10$pRthg2pXQBvn7CD5Mn1SuesuJBG5Y59byNT1NE/I.NrL2shwKjoge',
    },
  ],
};
console.log(data.data[2]);
displayAdvert(1);
function displayAdvert(item) {
  const advertsParent = document.getElementById('displayAdverts');
  const advertDisplay = document.createElement('article');
  advertDisplay.innerHTML = `<article class="row mb-3">
  <div class="col-8">
      
      <span class="small ml-1"
          >${data.data[0]}
      </span>
      <h6 class="mt-2">
          <strong>
              ${data.data[0].advert_title}
          </strong>
      </h6>
      <p>
          Life is a journey of twists and turns, peaks
          and valleys, mountains to climb and oceans
          to explore.
      </p>
      <ul class="list-inline small">
          <li class="list-inline-item">
              26 Mart 2024
          </li>
          <li class="list-inline-item">
              <i class="far fa-star"></i>
          </li>
      </ul>
  </div>
  <div class="col-4">
      <img
          src="https://picsum.photos/id/55/400/250"
          alt=""
          class="w-100"
      />
  </div>
</article>`;
  advertsParent.appendChild(advertDisplay);
}

// generateAdvert();

// function generateAdvert() {
//   fetch('index.json')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.data[0].title);
//     });
// }

function updatePageNumber() {
  document.getElementById('pageNumber').innerText = currentPage;
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

function init() {
  previousBtn.addEventListener('click', previousPage);
  nextBtn.addEventListener('click', nextPage);
}

init();
