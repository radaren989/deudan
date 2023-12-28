const advertInfo = document.getElementById("advertInfo");
const advertId = window.location.href.split("/").pop();
displayPage();
function displayPage() {
    console.log(advertId);
    fetch(`/api/advert/${advertId}`)
        .then((response) => response.json())
        .then((data) => displayInfo(data.data));
}

function displayInfo(item) {
    console.log(item);
    advertInfo.innerHTML = `<h2 class="text-center">İlan Özellikleri</h2>
  <hr>
      <div>
          <label for="title"><h4>Başlık:</h4></label>
          <p>
              ${item.advert_title}
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
              ${item.user_email}
          </p> 
          <hr>
      </div>`;
}
