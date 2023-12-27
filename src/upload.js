const form = document.getElementById("form");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const image4 = document.getElementById("image4");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const category = document.getElementById("category");

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
    if (priceValue.length > 12) {
        setError(price, "Maksimum siniri astiniz");
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
    formData.append("image", image1.files[0]);
    formData.append("image", image2.files[0]);
    formData.append("image", image3.files[0]);
    formData.append("image", image4.files[0]);
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
