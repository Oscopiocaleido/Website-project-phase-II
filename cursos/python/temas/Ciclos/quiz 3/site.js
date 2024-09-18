const tiempoRestanteElement = document.getElementById('tiempo-restante');
const tiempoLimite = 300000; // 5 minutos en milisegundos
let tiempoTranscurrido = 0;
let quizFinalizado = false; // Variable para indicar si el quiz ha finalizado

setInterval(() => {
  if (quizFinalizado) return; // Si el quiz ha finalizado, no hacer nada

  tiempoTranscurrido += 1000;
  const tiempoRestante = tiempoLimite - tiempoTranscurrido;
  const minutos = Math.floor(tiempoRestante / 60000);
  const segundos = Math.floor((tiempoRestante % 60000) / 1000);
  tiempoRestanteElement.textContent = `Tiempo restante: ${minutos} minutos y ${segundos} segundos`;
  console.log(`Tiempo restante: ${minutos} minutos y ${segundos} segundos`);
  if (tiempoTranscurrido >= tiempoLimite) {
    verificarRespuestas();
  }
}, 1000);

document.getElementById('quiz-form').addEventListener('submit', (e) => {
  console.log('Se ha disparado el evento de submit')
    e.preventDefault();
    verificarRespuestas();
  });
  
function aprobarQuiz(quizName, score) {
    // Aquí va el código para aprobar el quiz
    console.log(`El usuario ha aprobado el quiz ${quizName} con una puntuación de ${score}`);
}

function verificarRespuestas(){
    var total=10;
    var puntosMax=20;
    var puntos=0;
    
    var myForm=document.forms["quizForm"];
    var respuestas = ["v","f","f","v","a","c","b","a1,c1","a2,b2","a3,c3"];

    for(var i=1; i<=total; i++){
        if(i<8){
            if(myForm["q"+i].value === null || myForm["q"+i].value === ""){
                alert("Por favor responda la pregunta "+i);
                return false;
            }else if(myForm["q"+i].value === respuestas[i-1]){
                puntos+=2;
            }
        }else{
            var respuestasCorrectas = respuestas[i - 1].split(",");
            var elementos = document.getElementsByName("q" + i);
            var todosCorrectos = true;
        
            for (var j = 0; j < respuestasCorrectas.length; j++) {
              var encontrado = false;
              for (var k = 0; k < elementos.length; k++) {
                if (elementos[k].value === respuestasCorrectas[j] && elementos[k].checked) {
                  encontrado = true;
                  break;
                }
              }
              if (!encontrado) {
                todosCorrectos = false;
                break;
              }
            }
        
            if (todosCorrectos) {
              puntos += 2;
            }
        }
    }
    quizFinalizado=true;
    var resultado = document.getElementById("resultado");
    resultado.innerHTML ='<h3>Obtuviste <span>'+puntos+'</span> de <span>'+puntosMax+'</span>';
    
    // Almacenar la puntuación en localStorage
    localStorage.setItem('puntuacion', JSON.stringify({ quizNombre: 'Quiz 3: Ciclos', puntuacion: puntos }));
    
    // Llamar a la función aprobarQuiz de la página principal
    window.parent.postMessage({ tipo: 'puntuacion', quizNombre: 'Quiz 3: Ciclos', puntuacion: puntos }, '*');
    
    // Redirigir al usuario a la página principal
    setTimeout(() => {
        window.location.href='../../../index.html';
    }, 100);
}