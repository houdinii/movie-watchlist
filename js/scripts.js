// region Switches

// Simple css to style it like a toggle switch
// Tutorial:
// https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8

const modeToggleSwitch = document.querySelector('#mode-checkbox');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    modeToggleSwitch.checked = true;
  }
}

modeToggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark'); //add this
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light'); //add this
  }
}
// endregion


const MAX_DESCRIPTION_LENGTH = 132

let watchlist = []

const emptyWatchlistHtml = `
        <p class="empty-results-message">Your watchlist is looking a little empty...</p>
        <div class="lets-add-movies-row">
          <img src="../images/add-icon.png" alt="Add Movies Icon" class="lets-add-some-movies-icon">
          <p class="lets-add-some-movies-msg">Let's add some movies</p>
        </div>`
const emptyWatchlistMsgElement = document.getElementById("empty-watchlist-msg")
if(emptyWatchlistMsgElement) emptyWatchlistMsgElement.innerHTML = emptyWatchlistHtml

const emptySearchResultsHtml = `<p class="empty-results-message">Unable to find what you're looking for. Please try another search.</p>`
const emptySearchResultsMsgElement = document.getElementById("no-search-results-message")
if(emptySearchResultsMsgElement) emptySearchResultsMsgElement.innerHTML = emptySearchResultsHtml

const initialMessageHtml = `
        <img src="../images/film-reel.svg" alt="Film Reel" class="no-results-icon">
        <p class="empty-results-message">Start exploring</p>`
const initialMessageElement = document.getElementById("initial-message")
if(initialMessageElement) initialMessageElement.innerHTML = initialMessageHtml

const parseDescription = (description) => description.length > MAX_DESCRIPTION_LENGTH
    ? `<p class="description">${description.slice(0, MAX_DESCRIPTION_LENGTH)}...<span class="read-more-badge">Read more</span></p>`
    : `<p class="description">${description}</p>`
const getResultHtml = (result) => `<div class="result bottom-rule">
          <div class="cover">
            <img src="${result.Poster}" alt="${result.Title} Movie Cover" class="cover-img">
          </div>
          <div class="info">
            <div class="title-row">
              <p class="title">${result.Title}</p>
              <img src="../images/rating-star.png" alt="" class="rating-icon">
              <p class="rating">${result.imdbRating}</p>
            </div>
            <div class="info-row">
              <p class="runtime">${result.Runtime}</p>
              <p class="genres">${result.Genre}</p>
              <div class="watchlist-section">
                <img src="../images/add-icon.png" alt="" class="watchlist-cta-icon">
                <p class="add-text watchlist-cta">Watchlist</p>
              </div>
            </div>
            <div class="description-row">
              <p class="description">${parseDescription(result.Plot)}</p>
            </div>
          </div>
        </div>`
const movieRowsSection = document.getElementById("movie-rows")
const tempMovie = {
  Title:"Blade Runner 2049",
  Year:"2017",
  Rated:"R",
  Released:"06 Oct 2017",
  Runtime:"164 min",
  Genre:"Action, Drama, Mystery",
  Director:"Denis Villeneuve",
  Writer:"Hampton Fancher, Michael Green, Philip K. Dick",
  Actors:"Harrison Ford, Ryan Gosling, Ana de Armas",
  Plot:"Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
  Language:"English, Finnish, Japanese, Hungarian, Russian, Somali, Spanish",
  Country:"United States, United Kingdom, Canada, Spain",
  Awards:"Won 2 Oscars. 100 wins & 165 nominations total",
  Poster:"https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg",
  Ratings:[
    {
      Source:"Internet Movie Database",
      Value:"8.0/10"
    },{
      Source:"Rotten Tomatoes",
      Value:"88%"
    },{
      Source:"Metacritic",
      Value:"81/100"
    }
  ],
  Metascore:"81",
  imdbRating:"8.0",
  imdbVotes:"588,681",
  imdbID:"tt1856101",
  Type:"movie",
  DVD:"16 Jan 2018",
  BoxOffice:"$92,071,675",
  Production:"N/A",
  Website:"N/A",
  Response:"True"
}

movieRowsSection.innerHTML = ""
if(initialMessageElement) initialMessageElement.style.display = "flex";
if(emptyWatchlistMsgElement && watchlist.length === 0) emptyWatchlistMsgElement.style.display = "flex"

const searchBox = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")

searchBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const searchTerm = encodeURI(searchBox.value);
  // noinspection HttpUrlsUsage
  const baseUrl = `https://www.omdbapi.com/?apikey=e584017&t=${searchTerm}&r="json"&plot="full"`
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "json",
      "Access-Control-Allow-Origin": "*"
    }
  }
  fetch(baseUrl, options)
      .then(response => response.json())
      .then(data => console.log(data))

})