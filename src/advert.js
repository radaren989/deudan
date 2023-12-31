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
    const photo1Box = document.getElementById("box1");
    const image1 = imageFormatter(item.photo_0);
    photo1Box.innerHTML = `<img src="${image1}" class="h-100" />`;

    if (item.photo_1 !== null) {
        const photo2Box = document.getElementById("box2");
        const image2 = imageFormatter(item.photo_1);
        photo2Box.innerHTML = `<img src="${image2}" class="h-100" />`;
    }
    if (item.photo_2 !== null) {
        const photo3Box = document.getElementById("box3");
        const image3 = imageFormatter(item.photo_2);
        photo3Box.innerHTML = `<img src="${image3}" class="h-100" />`;
    }
    if (item.photo_3 !== null) {
        const photo4Box = document.getElementById("box4");
        const image4 = imageFormatter(item.photo_3);
        photo4Box.innerHTML = `<img src="${image4}" class="h-100" />`;
    }

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

function imageFormatter(image) {
    // Assuming 'data' is your array of integers
    const uint8Array = new Uint8Array(image.data);
    const blob = new Blob([uint8Array], { type: "image/png" });

    // Create an Object URL
    return URL.createObjectURL(blob);
}
