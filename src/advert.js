const advertInfo = document.getElementById('advertInfo');
const advertId = window.location.href.split('/').pop();
displayInfo();

function displayPage() {
  fetch(`/advert/${advertId}`)
    .then((response) => response.json())
    .then((data) => displayInfo(data.data[0]));
}

function displayInfo(item) {
  advertInfo.innerHTML = `<h2 class="text-center">İlan Özellikleri</h2>
  <hr>
      <div>
          <label for="title"><h4>Başlık:</h4></label>
          <p>
              ${item.title}
          </p>
          <hr>
      </div>
      <div>
          <label for="description"><h4>Açıklama:</h4></label>
          <p>
              ${item.details}
          </p>
          <hr>
      </div>
      <div>
          <label for="price"><h4>Fiyat:</h4></label>
          <p>
              ${item.price}
          </p>
          <hr>
      </div>
      <div>
          <label for="category"><h4>Kategori:</h4></label>
          <p>
              ${item.category}
          </p>
          <hr>
      </div>
      <div>
          <label for="price"><h4>İlan Sahibi Epostası</h4></label>
          <p>
              ${item.email}
          </p> 
          <hr>
      </div>`;
}
