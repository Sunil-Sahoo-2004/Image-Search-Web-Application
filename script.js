const accessKey = "AXO3GdWkjfcB5xlSremCTtUw4_4VDwUY-8Lw0U04zK4";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// We use async function because we want response and fetch
async function searchImages() {
    // Hold the value from the input section
    inputData = inputEl.value;

    // We are creating a dynamic URL based on input data
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();  // Await the JSON conversion

    // It collects the images from the server as per search
    const results = data.results;

    // It shows the default images
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    // Inside the results array, we have a lot of data, but we want to show some data; that's why we perform map
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;  
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    // after clicking enter website is loaded
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});