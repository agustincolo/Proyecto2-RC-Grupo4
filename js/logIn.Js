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
                    <a href="#" class="register mx-5">Registrate</a>
                </div>
                <button type="submit" class="btn btn-light text-dark forms-general">Enviar</button>
            </form>
        </div>
    `
 
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Registrarse',
    html: '<input type="email" id="swal-input-email" class="swal2-input" placeholder="Ingresa tu dirección de email">' +
          '<input type="password" id="swal-input-password" class="swal2-input" placeholder="Ingresa tu contraseña">',
    showCancelButton: true,
    confirmButtonText: 'Registrarse',
    cancelButtonText: 'Cancelar',
    reverseButtons: false,
    preConfirm: () => {
      return {
        email: document.getElementById('swal-input-email').value,
        password: document.getElementById('swal-input-password').value
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const email = result.value.email;
      const password = result.value.password;
      swalWithBootstrapButtons.fire(
        'Se ha registrado correctamente!',
        `Usuario: ${email}<br>Contraseña: ${password}`,
        'success'
      )
    }
  })
document.write(login)

