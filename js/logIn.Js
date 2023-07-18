function getUser() {
  let usuario = localStorage.getItem("usuarios")
  let usuarioObjeto = JSON.parse(usuario)
  return usuarioObjeto
}


let login = `
      <div class="main">
          <img class="welcomePhoto" src="../img/Bienvenido!!.png" alt="">
          <form class="forms">
              <div class="mb-3 forms-general">
              <label for="exampleInputEmail1" class="form-label">Usuario</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div class="mb-3 forms-general">
                <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
              </div>
              <div class="mb-3 form-check forms-general">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Recordarme</label>
                <a href="#" class="register mx-5 px-4" onclick="registerAlert()">Registrate</a>
              </div>
              <button type="submit" class="btn btn-light text-dark forms-general">Enviar</button>
          </form>
      </div>
  `


function registerAlert() {
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

swalWithBootstrapButtons.fire({
  title: 'Registrarse',
  html: '<form id="registration-form">' +
        '<input type="text" id="swal-input-username" class="swal2-input" placeholder="Ingresa tu nombre">' +
        '<input type="password" id="swal-input-password" class="swal2-input" placeholder="Ingresa tu contraseña">' +
        '</form>',
  showCancelButton: true,
  confirmButtonText: 'Registrarse',
  cancelButtonText: 'Cancelar',
  reverseButtons: false
}).then((result) => {
  if (result.isConfirmed) {
    const name = document.getElementById('swal-input-username').value;
    const password = document.getElementById('swal-input-password').value
    check = localStorage.getItem('usuarios')
    if (check == null && name !=""  && password != "") {newUser(name, password)}
    else {
      if (check != null && name !=""  && password != "") {
        if (checkUser(name)){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `El usuario ${name} ya existe`,
          })
        } else {
          newUser(name, password);
          swalWithBootstrapButtons.fire(
            '¡Se ha registrado correctamente!',
            `Gracias por registrarte ${name}`,
            'success'
          );
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `La contraseña o el usuario estan vacios`,
        })
      }
    }
  }
});
}
  
let main = document.querySelector(".container")
main.innerHTML += login;

let arrayUsers = [];

function newUser(name, password) {
  let data = {
    username: name,
    password: password,
    admin:false
  }
  if (name == "admin"){
      data = {
      username: name,
      password: password,
      admin: true
    };
  }

let safeData = localStorage.getItem("usuarios");
if (safeData != null) {
  let obj = JSON.parse(safeData);
  if (checkUser(data.username)) 
  {
    console.log(`El usuario ${data.username} ya existe`)
  } 
  else 
  {
    arrayUsers = obj;
    arrayUsers.push(data);
    localStorage.setItem("usuarios", JSON.stringify(arrayUsers));
  }
} 
else 
{
    arrayUsers.push(data);
    localStorage.setItem("usuarios", JSON.stringify(arrayUsers));
}
Swal.close();
};


function checkUser(user) {
let safeData = localStorage.getItem("usuarios");
let objData = JSON.parse(safeData)
for (let i = 0; i < objData.length; i++) {
  if (user == objData[i].username) {
    return true
  }
} return false
}

function validate(data,users) {
if(users !=null)
{
  let array = [];
  users.forEach(u=>{
      array.push(u.username);
  })
  return array.includes(data.username);
}
else
{
  return false;
}

}

document.querySelector(".forms").addEventListener("submit", (e) => {
  e.preventDefault()
  let username = document.getElementById('exampleInputEmail1').value
  let data = {
    username: document.getElementById('exampleInputEmail1').value,
    password: document.getElementById('exampleInputPassword1').value,
    admin: false
  };
  let users = getUser()
  users.forEach(user_ => {
    if (user_.admin == true && username == "admin") {
      data = {
            username: document.getElementById('exampleInputEmail1').value,
            password: document.getElementById('exampleInputPassword1').value,
            admin: true
          };
    }
  })
  if(validate(data,users)){

    for (let i = 0; i < users.length; i++) {
      if (users[i].password == data.password) {

        sessionStorage.setItem("user", JSON.stringify(data));
        Swal.fire({
          icon: 'success',
          title: 'Se logueo correctamente',
          showConfirmButton: false,
          timer: 1500,
          width: '300px',
        }).then(() => {
          window.location.href = '../index.html'
        })
        break
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `La contraseña es incorrecta`,
        })
      }
    }}
    
  else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Nombre de usuario incorrecto`,
    })
  } 
})