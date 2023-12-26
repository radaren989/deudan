const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const name = document.getElementById("name");
const surname = document.getElementById("surname");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateInputs()) {
        createPost();
    }
});

const setError = (element, message) => {
    if (element.classList.contains("border-danger")) {
        return;
    }
    element.classList.add("border-danger");

    const div = document.createElement("div");
    div.innerText = message;
    div.classList.add("text-danger");
    element.parentElement.appendChild(div);
};

const setSucces = (element) => {
    if (!element.classList.contains("border-danger")) {
        return;
    } else {
        element.classList.remove("border-danger");
        element.parentElement.querySelector(":nth-child(3)").remove();
    }
};

const validateInputs = () => {
    let flag = true;
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const nameValue = name.value.trim();
    const surnameValue = surname.value.trim();

    if (emailValue.substring(emailValue.length - 15) !== "@ogr.deu.edu.tr") {
        setError(email, "@ogr.deu.edu.tr ile bitmeli");
        flag = false;
    } else {
        setSucces(email);
    }

    if (passwordValue.length < 8) {
        setError(password, "sifre 8 karekterden uzun olmali");
        flag = false;
    } else {
        setSucces(password);
    }
    if (nameValue === "") {
        setError(nameValue, "lutfen isim giriniz");
        flag = false;
    } else {
        setSucces(name);
    }
    if (surnameValue === "") {
        setError(surnameValue, "lutfen soyisim giriniz");
        flag = false;
    } else {
        setSucces(surname);
    }
    return flag;
};

const createPost = () => {
    const url = window.location.href;
    const data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => routePage(response))
        .catch((error) => console.error("Error:", error));
};

const routePage = (response) => {
    switch (response.status) {
        case 201: //successful
            window.location.href = "/login";
            break;
        case 204: //unsuccessful
            window.alert("Hesap Oluşturma Hatası!");
        default:
            console.error("Unhandled status code:", response.status);
            break;
    }
};
