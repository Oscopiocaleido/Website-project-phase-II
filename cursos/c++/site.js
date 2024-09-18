let haAprobadoQuiz = false;

document.getElementById('cambiar-curso').addEventListener('click', function() {
  // Si el usuario ha aprobado al menos un quiz con una puntuación mínima de 10, permite cambiar de curso
  if (haAprobadoQuiz) {
    // Redirige a la página de Python
    window.location.href = '../../../python/index.html';
  } else {
    // Si no ha aprobado ningún quiz con una puntuación mínima de 10, muestra un mensaje de error
    alert('Debes aprobar al menos un quiz con una puntuación mínima de 10 para cambiar de curso');
  }
});

function aprobarQuiz(quizNombre, puntuacion) {
  // Busca el quiz en la lista y actualiza su puntuación
  const quiz = quizzes.find(q => q.nombre === quizNombre);
  if (quiz) {
    quiz.puntuacion = puntuacion;
  }
  
  // Guarda la puntuación en el localStorage
  const puntuaciones = obtenerPuntuaciones();
  puntuaciones.push({ nombre: quizNombre, puntuacion: puntuacion });
  localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones));
  
  // Actualiza la lista de quizzes en la página
  actualizarQuizzesLista();
  
  // Actualiza la variable haAprobadoQuiz
  haAprobadoQuiz = quizzes.some(quiz => quiz.puntuacion >= 10);
  console.log(haAprobadoQuiz); 
}

function obtenerPuntuaciones() {
  const puntuaciones = localStorage.getItem('puntuaciones');
  if (puntuaciones) {
    return JSON.parse(puntuaciones);
  } else {
    return [];
  }
}

// Variable que almacena la lista de quizzes y sus puntuaciones
let quizzes = [
  { nombre: 'Quiz 1: Variables', puntuacion: 0 },
  { nombre: 'Quiz 2: Condicionales', puntuacion: 0 },
  { nombre: 'Quiz 3: Ciclos', puntuacion: 0 },
  { nombre: 'Quiz 4: Funciones', puntuacion: 0 },
  { nombre: 'Quiz 5: Estructuras de Datos', puntuacion: 0 },
  { nombre: 'Quiz 6: POO', puntuacion: 0 }
];

// Lee la puntuación desde localStorage
const puntuaciones = obtenerPuntuaciones();
if (puntuaciones) {
  puntuaciones.forEach((puntuacion) => {
    const quiz = quizzes.find(q => q.nombre === puntuacion.nombre);
    if (quiz) {
      quiz.puntuacion = puntuacion.puntuacion;
    }
  });
  actualizarQuizzesLista();
}

function actualizarQuizzesLista() {
  // Actualiza la puntuación de cada quiz
  quizzes.forEach((quiz, index) => {
    const quizPuntuacionElement = document.getElementById(`quiz-${index + 1}-puntuacion`);
    quizPuntuacionElement.textContent = quiz.puntuacion;
  });
  
  // Actualiza la puntuación total
  const puntuacionTotal = quizzes.reduce((acumulado, quiz) => acumulado + parseInt(quiz.puntuacion), 0);
  document.getElementById('puntuacion-total').textContent = `Puntuación total: ${puntuacionTotal}`;
  
  // Actualiza la variable haAprobadoQuiz
  haAprobadoQuiz = quizzes.some(quiz => quiz.puntuacion >= 10);
  console.log(haAprobadoQuiz); 
} 

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

document.getElementById('imprimir-certificado').addEventListener('click', imprimirCertificado);
function imprimirCertificado() {
  if (quizzes.every(quiz => quiz.puntuacion >= 10)) {
    const rutaCertificado = './resources/image/Diplomado c++.png'; // Ruta del archivo del certificado
    const a = document.createElement('a');
    a.href = rutaCertificado;
    a.download = 'Diplomado c++.png';
    a.click();
  } else {
    alert('Debes aprobar todos los quizzes con una puntuación mínima de 10 para imprimir el certificado');
  }
}

