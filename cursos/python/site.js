// Variable que almacena la lista de quizzes y sus puntuaciones
let quizzes = [
  { nombre: 'Quiz 1: Variables', puntuacion: 0, codigo: 'codigo-quiz-1' },
  { nombre: 'Quiz 2: Condicionales', puntuacion: 0, codigo: 'codigo-quiz-2' },
  { nombre: 'Quiz 3: Ciclos', puntuacion: 0, codigo: 'codigo-quiz-3' },
  { nombre: 'Quiz 4: Funciones', puntuacion: 0, codigo: 'codigo-quiz-4' },
  { nombre: 'Quiz 5: Estructuras de Datos', puntuacion: 0, codigo: 'codigo-quiz-5' },
  { nombre: 'Quiz 6: POO', puntuacion: 0, codigo: 'codigo-quiz-6' }
];

// Variable que indica si el usuario ha aprobado al menos un quiz
let haAprobadoQuiz = false;

// Función para guardar la puntuación en el localStorage
function guardarPuntuacion(quizNombre, puntuacion) {
  const puntuaciones = obtenerPuntuaciones();
  const indice = puntuaciones.findIndex(p => p.nombre === quizNombre);
  if (indice !== -1) {
    puntuaciones[indice].puntuacion = puntuacion;
  } else {
    puntuaciones.push({ nombre: quizNombre, puntuacion: puntuacion });
  }
  localStorage.setItem('puntuaciones-python', JSON.stringify(puntuaciones));
}

// Función para obtener las puntuaciones desde el localStorage
function obtenerPuntuaciones() {
  const puntuaciones = localStorage.getItem('puntuaciones-python');
  if (puntuaciones) {
    return JSON.parse(puntuaciones);
  } else {
    return [];
  }
}


// Función para actualizar la lista de quizzes en la página
function actualizarQuizzesLista() {
  const puntuaciones = obtenerPuntuaciones();
  quizzes.forEach((quiz, index) => {
    const quizPuntuacionElement = document.getElementById(`quiz-${index + 1}-puntuacion`);
    const puntuacion = puntuaciones.find(p => p.nombre === quiz.nombre);
    if (puntuacion) {
      quizPuntuacionElement.textContent = puntuacion.puntuacion;
    } else {
      quizPuntuacionElement.textContent = 0;
    }
  });
  
  // Actualiza la puntuación total
  const puntuacionTotal = puntuaciones.reduce((acumulado, puntuacion) => acumulado + parseInt(puntuacion.puntuacion), 0);
  document.getElementById('puntuacion-total').textContent = `Puntuación total: ${puntuacionTotal}`;
  
  // Actualiza la variable haAprobadoQuiz
  haAprobadoQuiz = puntuaciones.some(p => p.puntuacion >= 10);
}

// Función para aprobar un quiz
function aprobarQuiz(quizNombre, puntuacion) {
  guardarPuntuacion(quizNombre, puntuacion);
  actualizarQuizzesLista();
}

// Función para cambiar de curso si se ha aprobado un quiz
function cambiarCurso() {
  if (haAprobadoQuiz) {
    // Redirige a la página de C++
    window.location.href = '../../../c++/index.html';
  } else {
    // Si no ha aprobado ningún quiz con una puntuación mínima de 10, muestra un mensaje de error
    alert('Debes aprobar al menos un quiz con una puntuación mínima de 10 para cambiar de curso');
  }
}

// Evento para cambiar de curso
document.getElementById('cambiar-curso').addEventListener('click', cambiarCurso);

// Evento para imprimir certificado
document.getElementById('imprimir-certificado').addEventListener('click', imprimirCertificado);
function imprimirCertificado() {
  if (quizzes.every(quiz => quiz.puntuacion >= 10)) {
    const rutaCertificado = './resources/image/Diplomado python.png'; // Ruta del archivo del certificado
    const a = document.createElement('a');
    a.href = rutaCertificado;
    a.download = 'Diplomado python.png';
    a.click();
  } else {
    alert('Debes aprobar todos los quizzes con una puntuación mínima de 10 para imprimir el certificado');
  }
}

// Carga inicial
window.addEventListener('load', function() {
  const puntuacion = localStorage.getItem('puntuacion');
  if (puntuacion) {
    const puntuacionObj = JSON.parse(puntuacion);
    aprobarQuiz(puntuacionObj.quizNombre, puntuacionObj.puntuacion);
  }
  actualizarQuizzesLista();
  haAprobadoQuiz = quizzes.some(quiz => quiz.puntuacion >= 10);
  console.log(haAprobadoQuiz); // Verifica que se esté actualizando correctamente
});
