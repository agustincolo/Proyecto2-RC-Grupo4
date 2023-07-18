
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