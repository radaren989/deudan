const userInfo = document.getElementById("userInfo");
const advertsParent = document.getElementById("displayAdverts");
displayPage();
function displayPage() {
    fetch("/api/profile")
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
    const advertDisplay = document.createElement("article");
    advertDisplay.innerHTML = `<article class="row mb-3">
    <div class="col-8">
        
        <span class="small ml-1">${item.user_name + " " + item.user_surname}
        </span>
        <h6 class="mt-2">
            <strong>
                <a href='#' class="underline-hover">${item.advert_title}</a>
            </strong>
        </h6>
        <p>
            ${item.details}
        </p>
        <ul class="list-inline small">
            <li class="list-inline-item">${formatISODate(item.ad_date)}</li>
            <button type="submit" class="btn btn-dark btn-block">
                        ilani sil
                    </button>
            <li class="list-inline-item">
                <i class="far fa-star"></i>
            </li>
        </ul>
    </div>
    <div class="col-4">
        <img src="https://picsum.photos/400/250" alt="" class="w-100">
    </div>
</article>`;
    advertsParent.appendChild(advertDisplay);
}

function formatISODate(isoDateTime) {
    const date = new Date(isoDateTime);

    const options = { year: "numeric", month: "long", day: "numeric" };

    const dateTimeFormat = new Intl.DateTimeFormat("tr-TR", options);

    const formattedDate = dateTimeFormat.format(date);

    return formattedDate;
}
function goToAdvert(e) {
    const advertId =
        e.target.parentElement.parentElement.parentElement.parentElement.id;
    console.log(advertId);

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

advertsParent.addEventListener("click", goToAdvert);
