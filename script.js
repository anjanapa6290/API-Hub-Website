const apis = [
  {name:"JSONPlaceholder",category:"Data",icon:"{ }",tag:"REST API",method:"GET",description:"A free fake REST API for testing and prototyping applications with sample posts, users, and comments.",url:"https://jsonplaceholder.typicode.com/"},
  {name:"Open-Meteo",category:"Data",icon:"☼",tag:"WEATHER",method:"GET",description:"Access weather forecasts and historical weather data without needing an API key for basic use.",url:"https://open-meteo.com/"},
  {name:"REST Countries",category:"Data",icon:"◎",tag:"COUNTRIES",method:"GET",description:"Retrieve information about countries, including names, regions, flags, population, and currencies.",url:"https://restcountries.com/"},
  {name:"GitHub API",category:"Tools",icon:"⌘",tag:"DEVELOPER",method:"GET",description:"Explore public repositories, user profiles, issues, commits, and other GitHub platform data.",url:"https://docs.github.com/en/rest"},
  {name:"The Cat API",category:"Media",icon:"✦",tag:"IMAGES",method:"GET",description:"Discover cat images and breeds for demos, fun side projects, and image gallery experiments.",url:"https://thecatapi.com/"},
  {name:"Dictionary API",category:"Learning",icon:"Aa",tag:"LANGUAGE",method:"GET",description:"Look up word meanings, phonetics, and definitions through a simple dictionary endpoint.",url:"https://dictionaryapi.dev/"}
];

const grid = document.getElementById("apiGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";

function renderApis() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = apis.filter(api =>
    (activeCategory === "All" || api.category === activeCategory) &&
    [api.name, api.category, api.tag, api.description].some(value => value.toLowerCase().includes(term))
  );
  grid.innerHTML = filtered.map(api => `
    <article class="api-card">
      <div class="card-top"><div class="api-icon">${api.icon}</div><span class="tag">${api.tag}</span></div>
      <h3>${api.name}</h3>
      <p>${api.description}</p>
      <div class="card-bottom"><span class="method">${api.method} REQUEST</span><a class="card-link" href="${api.url}" target="_blank" rel="noreferrer">Documentation ↗</a></div>
    </article>`).join("");
  emptyState.hidden = filtered.length !== 0;
}

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderApis();
});
searchInput.addEventListener("input", renderApis);
document.getElementById("year").textContent = new Date().getFullYear();
renderApis();
