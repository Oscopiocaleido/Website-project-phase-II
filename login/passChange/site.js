const form = document.getElementById('form-cambiar-contraseña');

form.addEventListener('submit', cambiarContraseña);

function cambiarContraseña(event) {
    event.preventDefault();
    const nicknameInput = document.getElementById('nickname');
    const antiguaContraseñaInput = document.getElementById('antigua-contraseña');
    const nuevaContraseñaInput = document.getElementById('nueva-contraseña');

    const nickname = nicknameInput.value.trim();
    const antiguaContraseña = antiguaContraseñaInput.value.trim();
    const nuevaContraseña = nuevaContraseñaInput.value.trim();

    // Cargar la lista de usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar usuario en la lista de usuarios
    const usuario = usuarios.find(usuario => usuario.nickname === nickname);
    if (usuario) {
        // Verificar si la antigua contraseña coincide con la contraseña asociada al usuario
        if (usuario.contraseña === antiguaContraseña) {
            // Actualizar la contraseña del usuario
            usuario.contraseña = nuevaContraseña;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Contraseña cambiada con éxito');
            if (usuario.curso === 'C') {
              window.location.href = "../cursos/c++/index.html";
            } else {
              window.location.href = "../cursos/python/index.html";
            }
        } else {
            alert('La antigua contraseña no coincide con la contraseña asociada al usuario');
        }
    } else {
        alert('Nickname no encontrado');
    }
}