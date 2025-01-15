"use strict";

// API : https://api.jikan.moe/v4/anime?q=naruto
// Buscador de series
// cambiar la parte naruto por lo que escribe el usuario
//"https://api.jikan.moe/v4/anime?q=" + value


const buttonSearch = document.querySelector(".js-submit-bttn");
const searchSeries = document.querySelector(".js-search-series");
const inputSearch = document.querySelector(".js-input");


function handleSearchSeries (event){
    event.preventDefault();
    const value = inputSearch.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${value}`)

    .then ((res) => res.json())
    .then((data) => {
        renderResults(data.data);
    });
}
buttonSearch.addEventListener("click", handleSearchSeries);

const placeholderImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV."


function renderResults(animeList) {
    searchSeries.innerHTML = '';
    let resultsHTML = '';
    for (const anime of animeList) {
        const titleSeries = anime.title;
        let imageSeries;
        if (anime.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            imageSeries = placeholderImage;
        } else {
            imageSeries = anime.images.jpg.image_url;
        }
        resultsHTML += `
            <div class="anime-card">
                <img src="${imageSeries}" alt="${titleSeries}">
                <h3>${titleSeries}</h3>
            </div>`;
        searchSeries.innerHTML += resultsHTML; 
    };
}
