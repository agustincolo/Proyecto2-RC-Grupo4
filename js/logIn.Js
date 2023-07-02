

function setUser(email, password) {
    localStorage.setItem('nombre', email);
    localStorage.setItem('password', password);
}

function getUser() {
    let usuario = localStorage.getItem("nombre")
    let usuarioObjeto = JSON.stringify(usuario)
    return usuarioObjeto
}


let login = `
        <div class="main">
            <img class="welcomePhoto" src="../img/Bienvenido!!.png" alt="">
            <form>
                <div class="mb-3 forms-general">
                <label for="exampleInputEmail1" class="form-label">Usuario</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3 forms-general">
                  <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check forms-general">
                    <div>
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">Recordarme</label>
                    </div>
                    <a href="#" class="register mx-5" onclick="registerAlert()">Registrate</a>
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
      if (name )
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
    }
  });
}
    
let main = document.querySelector(".container")
main.innerHTML += login;

let arrayUsers = [];

function newUser(name, password) {
    const data = {
      username: name,
      password: password
  };
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
    if (user === objData[i].username) {
      return true
    }
  } return false
}



