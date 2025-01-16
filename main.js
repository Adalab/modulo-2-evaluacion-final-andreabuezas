"use strict";

const buttonSearch = document.querySelector(".js-submit-bttn");
const searchedSeries = document.querySelector(".js-search-series");
const inputSearch = document.querySelector(".js-input");
const favouriteSeries = document.querySelector(".js-favourite-series");
const titleFavourites = document.querySelector(".js-title-favourites");
const titleCard = document.querySelector(".title-card");
const divFavourites = document.querySelector(".js-div-favourites");
const titleSearch = document.querySelector(".js-title-search");
const divSearch = document.querySelector(".js-div-search");
const resetButton = document.querySelector(".js-reset-bttn");





//CREO LAS LISTAS  VACÍAS (ARRAYS)
let animeSeriesList = [];
let favouriteSeriesList = [];


//GUARDAR FAVORITOS EN LOCAL
const savedFavourites = JSON.parse(localStorage.getItem("favouriteSeries"));
if (savedFavourites && savedFavourites.length > 0) {
  favouriteSeriesList = savedFavourites;
  renderResults(favouriteSeriesList, favouriteSeries, true);
  titleFavourites.classList.remove("hidden");
  divFavourites.classList.remove("hidden");
  titleSearch.classList.add("hidden");
  divSearch.classList.add("hidden");
} else {
  titleFavourites.classList.add("hidden");
  divFavourites.classList.add("hidden");
}

//BUSCAR SERIES (donde pone naruto introducimos lo que busca el usuario)
function handleSearchedSeries (event){
    event.preventDefault();
    const value = inputSearch.value;

    fetch(`https://api.jikan.moe/v4/anime?q=${value}`)
        .then ((res) => res.json())
        .then((data) => {
            animeSeriesList = data.data;

        renderResults(animeSeriesList, searchedSeries, false);

    });
}
buttonSearch.addEventListener("click", handleSearchedSeries);


//RENDERIZA BUSQUEDA DE SERIES Y LA MUESTRA EN UN CONTENEDOR

const placeholderImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV.";

function renderResults(animeSeriesList , searchedSeries,) {

    searchedSeries.innerHTML = " ";
    let resultsHTML = " ";

    for (const anime of animeSeriesList) {
        const titleSeries = anime.title;
        const animeId = anime.mal_id;
        let imageSeries;

        if (anime.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            imageSeries = placeholderImage;
        } else {
            imageSeries = anime.images.jpg.image_url;
        }

        resultsHTML += `
        <div class="anime-card js-series" id="${animeId}">
            <h3 class="title-card">${titleSeries}</h3>
            <img src="${imageSeries}" alt="${titleSeries}">

        </div>`;
        

        searchedSeries.innerHTML += resultsHTML; 


        const animeSeries = document.querySelectorAll(".js-series");
        
        for(const animeSerie of animeSeries){
            animeSerie.addEventListener("click", handleFavouriteSeries);
        }
    };
}

// AÑADIR SERIE A FAVORITOS 
function handleFavouriteSeries (event){

    const idClickedAnime = parseInt(event.currentTarget.id);

    const seriesSelected = animeSeriesList.find((anime) =>{
        return idClickedAnime === anime.mal_id;
        }
    );

    event.currentTarget.classList.add('favourite-card');


    const titleClickedAnime = event.currentTarget.querySelector('.title-card');
    titleClickedAnime.classList.add('title-anime-card');

    const indexSeriesFavourites = favouriteSeriesList.findIndex((favouriteAnime)=> {
        return idClickedAnime === favouriteAnime.mal_id;
        }
    );


// SI NO EXISTE COMO FAVORITA 
    if (indexSeriesFavourites === -1){
    favouriteSeriesList.push(seriesSelected);
    renderResults(favouriteSeriesList, favouriteSeries, true);
    titleFavourites.classList.remove("hidden");
    divFavourites.classList.remove("hidden");

    localStorage.setItem("favouriteSeries", JSON.stringify(favouriteSeriesList));
    }

}

//BOTÓN RESET 
function handleResetButton() {
    favouriteSeriesList = [];
    animeSeriesList = [];
  
    localStorage.removeItem("favouriteSeries");
  
    titleFavourites.classList.add("hidden");
    divFavourites.classList.add("hidden");
    titleSearch.classList.add("hidden");
    divSearch.classList.add("hidden");
  
    favouriteSeries.innerHTML = "";
    searchedSeries.innerHTML = "";
  
    inputSearch.value = "";
  }
  
  resetButton.addEventListener("click", handleResetButton);