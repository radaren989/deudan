displayPage();
function displayPage() {
    fetch(`/api/profile`, {
        method: "GET",
    }).then((response) => response.json());
}
