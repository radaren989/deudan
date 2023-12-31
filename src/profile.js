const userInfo = document.getElementById("userInfo");
const advertsParent = document.getElementById("displayAdverts");
function displayPage() {
    fetch("/api/profile", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            generateUserInfo(data.data.profile);
            let i = 0;
            while (data.data.adverts[i]) {
                generateAdvert(data.data.adverts[i]);
                i++;
            }
        });
}

function generateUserInfo(item) {
    userInfo.innerHTML = `<h2 class="text-center">Profil Özellikleri</h2>
        <hr>
        <div>
        <label for="name"><h4>İsim:</h4></label>
        <p>
        ${item.name}
        </p>
        <hr>
        </div>
        <div>
        <label for="surname"><h4>Soyisim:</h4></label>
        <p>
        ${item.surname}
        </p>
        <hr>
        </div>
        <div>
        <label for="email"><h4>Kullancı Epostası</h4></label>
        <p>
        ${item.email}
        </p> 
        <hr>
        </div>`;
}

function generateAdvert(item) {
    const advertsParent = document.getElementById("displayAdverts");
    const advertDisplay = document.createElement("article");
    const image = imageFormatter(item.photo);
    advertDisplay.innerHTML = `<article id="${
        item.advert_id
    }" class="row mb-3 border border-secondary">
        <div class="col-8">
        
        <span class="small ml-1">${item.user_name + " " + item.user_surname}
        </span>
        <h6 class="mt-2">
        <strong>
        <a class="underline-hover">${item.advert_title}</a>
        </strong>
        </h6>
        <p>
        ${item.details}
        </p>
        <ul class="list-inline small">
        <li class="list-inline-item">${formatISODate(item.ad_date)}</li>
        <button type="submit" class="btn btn-dark btn-block delete-btn">
        ilani sil
        </button>
        <li class="list-inline-item">
        <i class="far fa-star"></i>
        </li>
        </ul>
        </div>
        <div class="col-4" style="height: 200px">
        <img src="${image}" alt="" class="h-100">
        </div>
        </article>`;
    advertsParent.appendChild(advertDisplay);

    const deleteButton = advertDisplay.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
        fetch(`/api/delete/${item.advert_id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.msg);
                location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
}
function deleteAdvert() {}

function imageFormatter(image) {
    // Assuming 'data' is your array of integers
    const uint8Array = new Uint8Array(image.data);
    const blob = new Blob([uint8Array], { type: "image/png" });

    // Create an Object URL
    return URL.createObjectURL(blob);
}

function formatISODate(isoDateTime) {
    const date = new Date(isoDateTime);

    const options = { year: "numeric", month: "long", day: "numeric" };

    const dateTimeFormat = new Intl.DateTimeFormat("tr-TR", options);

    const formattedDate = dateTimeFormat.format(date);

    return formattedDate;
}
function goToAdvert(e) {
    if (e.target.tagName.toLowerCase() === "button") return;
    const clickedArticle = e.target.closest("article");
    const advertId = clickedArticle.id;

    fetch(`/advert/${advertId}`, {
        method: "GET",
    }).then((response) => routeAdvertPage(response, advertId));
}
const routeAdvertPage = (response, id) => {
    switch (response.status) {
        case 200: //successful
            window.location.href = `/advert/${id}`;
            break;
        case 400: //un successful
            window.alert("hata");
            break;
        case 401:
            window.alert("hata");
            break;
        default:
            console.error("Unhandled status code:", response.status);
            break;
    }
};

function init() {
    advertsParent.addEventListener("click", goToAdvert);
    displayPage();
}

init();
