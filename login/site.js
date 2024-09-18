const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function procesarRegistro(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const edad = document.getElementById('edad').value;
  const nickname = document.getElementById('nickname').value;
  const contraseña = document.getElementById('contraseña').value;
  const curso = document.getElementById('curso').value;

  // Validar datos
  if (nombre === '' || correo === '' || edad === '' || nickname === '' || contraseña === '') {
    alert('Debes completar todos los campos');
    return;
  }

  // Verificar si el nickname ya existe
  const usuarioExistente = usuarios.find(usuario => usuario.nickname === nickname);
  if (usuarioExistente) {
    alert('El nickname ya existe');
    return;
  }

  // Agregar usuario a la lista de usuarios
  usuarios.push({
    nombre,
    correo,
    edad,
    nickname,
    contraseña,
    curso
  });

  // Guardar la lista de usuarios en localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Redirigir a la página correspondiente según la opción seleccionada
  if (curso === 'C') {
    window.location.href = "../cursos/c++/index.html";
  } else {
    window.location.href = "../cursos/python/index.html";
  }
}

function procesarInicioSesion(event) {
    event.preventDefault();
    const nickname = document.getElementById('nicknamelog').value;
    const contraseña = document.getElementById('contraseñalog').value;
  
    // Cargar la lista de usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    // Buscar usuario en la lista de usuarios
    const usuario = usuarios.find(usuario => usuario.nickname === nickname && usuario.contraseña === contraseña);
    if (usuario) {
      // Redirigir a la página correspondiente según la opción seleccionada
      if (usuario.curso === 'C') {
        window.location.href = "../cursos/c++/index.html";
      } else {
        window.location.href = "../cursos/python/index.html";
      }
    } else {
      alert('Nickname o contraseña incorrectos');
    }
  }

document.getElementById('registro-form').addEventListener('submit', procesarRegistro);
document.getElementById('inicio-sesion-form').addEventListener('submit', procesarInicioSesion);
