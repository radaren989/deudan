const form = document.getElementById("form");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const image4 = document.getElementById("image4");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const category = document.getElementById("category");

document.getElementById("image1").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        // Display preview
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview1").src = e.target.result;
        };
        reader.readAsDataURL(file);
        document.getElementById("labelImage1").innerText = "";
    } else {
        // Clear preview if no file selected
        document.getElementById("imagePreview1").src = "";
    }
});

document.getElementById("image2").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        // Display preview
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview2").src = e.target.result;
        };
        reader.readAsDataURL(file);
        document.getElementById("labelImage2").innerText = "";
    } else {
        // Clear preview if no file selected
        document.getElementById("imagePreview2").src = "";
    }
});

document.getElementById("image3").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        // Display preview
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview3").src = e.target.result;
        };
        reader.readAsDataURL(file);
        document.getElementById("labelImage3").innerText = "";
    } else {
        // Clear preview if no file selected
        document.getElementById("imagePreview3").src = "";
    }
});

document.getElementById("image4").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        // Display preview
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview4").src = e.target.result;
        };
        reader.readAsDataURL(file);
        document.getElementById("labelImage4").innerText = "";
    } else {
        // Clear preview if no file selected
        document.getElementById("imagePreview4").src = "";
    }
});

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
    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value;

    if (
        !image1.files[0] &&
        !image2.files[0] &&
        !image3.files[0] &&
        !image4.files[0]
    ) {
        setError(image1, "En az 1 tane resim yukleyin");
        flag = false;
    } else {
        setSucces(image1);
    }
    if (titleValue.length > 254) {
        setError(title, "Maksimum siniri astiniz");
        flag = false;
    } else {
        setSucces(title);
    }
    if (descriptionValue.length > 499) {
        setError(description, "Maksimum siniri astiniz");
        flag = false;
    } else {
        setSucces(description);
    }
    if (priceValue.length > 20 || isNaN(price.value)) {
        setError(price, "Sayi giriniz");
        flag = false;
    } else {
        setSucces(price);
    }
    return flag;
};

const createPost = async () => {
    const url = window.location.href;

    // Create a FormData object
    const formData = new FormData();

    // Append the file and other form data to the FormData object
    if (image1.files[0]) {
        formData.append("image", image1.files[0]);
    }
    if (image2.files[0]) {
        formData.append("image", image2.files[0]);
    }
    if (image3.files[0]) {
        formData.append("image", image3.files[0]);
    }
    if (image4.files[0]) {
        formData.append("image", image4.files[0]);
    }
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("category", category.value);

    try {
        // Use the fetch API to send the FormData
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        // Handle the response
        await routePage(response);
    } catch (error) {
        console.error("Error:", error);
    }
};

const routePage = (response) => {
    switch (response.status) {
        case 201: //successful
            window.location.href = "/";
            break;
        case 400: //unsuccessful
            window.alert("Uru yukleme hatasi");
            break;
        default:
            console.error("Unhandled status code:", response.status);
            break;
    }
};
