let container = document.querySelector(".carousel-inner-slider");
let carousel = [];

fetch('./js/carousel.json')
.then(data => data.json())
.then(result => {
    carousel = carousel.concat(result);
    slider(carousel, "#carouselExampleSlidesOnly .carousel-inner-slider");
})
.catch(error => {
    console.error('Error:', error);
})


function slider (flick) {
    let result = "";
    flick.forEach((pic, index) => {
      const activeClass = index === 0 ? "active" : "";
      result += `
      <div class="carousel-item ${activeClass}">
        <img src="${pic.picture}" class="foto" alt="...">
        <h2 class="title_film"><b>${pic.name}</b></h2>
		<p class="description_film">
            ${pic.descripcion}
		</p>
      </div>`
    })
    container.innerHTML = result;
};


let romance = []; 
let action = [];
let animated = [];
let scifi = [];


//Pasamos la informacion del JSON y con los datos obtenidos construimos las cards
fetch('./js/romance.json')
.then(data => data.json())
.then(result => {
    //Concatenar en el array movies las peliculas de una categoria
    romance = romance.concat(result);
    //Construir una funcion que tome estas peliculas y las coloque en las cards
    cardSlide(romance, "#myCarousel .carousel-inner");
})
.catch(error => {
    //Devuelve un error si hay algun problema con los datos
    console.error('Error:', error);
})

fetch('./js/action.json')
.then(data => data.json())
.then(result => {
  
    action = action.concat(result);
    cardSlide(action, "#myCarousel1 .carousel-innerr");
})
.catch(error => {

    console.error('Error:', error);
})

fetch('./js/scifi.json')
.then(data => data.json())
.then(result => {
    console.log(result, "scifi");
    scifi = scifi.concat(result);
    cardSlide(scifi, "#myCarousel2 .carousel-innerrr");
})
.catch(error => {
    console.error('Error:', error);
})

fetch('./js/animated.json')
.then(data => data.json())
.then(result => {
    console.log(result, "animated");
    animated = animated.concat(result);
    cardSlide(animated, "#myCarousel3 .carousel-innerrrr");
})
.catch(error => {
    console.error('Error:', error);
})

//Funcion que toma la data de los JSON y las pasa a cards

function cardSlide(movies, boxContainer){
    const box = document.querySelector(boxContainer);
    //Variable vacia para almacenar el codigo HTML
    let resultCard = "";

    for(let i = 0; movies.length > i; i += 3){
        const activeClass = i === 0 ? "active" : ""; 
        const slideMovie = movies.slice(i, i + 4); 
        resultCard += `
        <div class="carousel-item ${activeClass}">
        <div class="cards-wrapper">
        `

        slideMovie.forEach(film =>{
            //por cada slide de 4 peliculas recorrido voy generando el codigo HTML
            resultCard += generateCardsHtml(film);
        });
    
    resultCard += `
        </div>         
    </div>
    `
    }
    box.innerHTML = resultCard;
}

function generateCardsHtml(film){
    return `
    <div class="card" style="width: 18rem;">
    <a href="${film.url}"> <img src="${film.picture}" class="card-img-top" alt="..."> </a>
    </div>
    `;
}


//Informacion de login
const logIn = document.querySelector(".logIn")
const admin = document.querySelector(".admin")
let users = JSON.parse(sessionStorage.getItem('user'))
if (users != null && users.username == "admin") {
    logIn.textContent = `Bienvenido ${users.username}`
    let admin_nav = 
    `<li class="nav-item">
        <a class="nav-link active text-warning" aria-current="page" href="./paginas/administration.html">Administracion</a>
    </li>
    <li class="nav-item">
    <a class="nav-link active text-warning" aria-current="page" href="#" onclick="closeSession()">Cerrar Sesion</a>
    </li>`
    admin.innerHTML += admin_nav


} else if (users != null) {
    logIn.textContent = `Bienvenido ${users.username}`
    let admin_nav = `<li class="nav-item">
    <a class="nav-link active text-warning" aria-current="page" href="#" onclick="closeSession()">Cerrar Sesion</a>
    </li>`
    admin.innerHTML += admin_nav
}

else logIn.textContent = `MBP PLUS`

function closeSession () {
    sessionStorage.clear('user')
    location.reload();
}
