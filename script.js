// script.js

// Función para redirigir a la página de "Sí"
function nextPage() {
    window.location.href = "index_yes.html";
}

// Función para mover el botón "No" a una posición aleatoria
function moveButton() {
    const noButton = document.getElementById("noButton");
    const container = document.querySelector(".container");

    const containerRect = container.getBoundingClientRect();
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const maxX = containerRect.width - buttonWidth;
    const maxY = containerRect.height - buttonHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.position = "absolute";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.classList.add("wiggle"); // Efecto de movimiento divertido
    setTimeout(() => noButton.classList.remove("wiggle"), 500); // Eliminar la animación después de 0.5s
}


// Partículas en el fondo
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
  return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 2,
      speedY: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
  };
}

for (let i = 0; i < 50; i++) {
  particles.push(createParticle());
}

// Redimensionar canvas al cambiar tamaño de la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Si necesitas generar más partículas en caso de un canvas más grande
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let particle of particles) {
      ctx.fillStyle = `rgba(255, 0, 100, ${particle.opacity})`;
      ctx.font = `${particle.size}px Arial`;
      ctx.fillText("💖", particle.x, particle.y);
      particle.y -= particle.speedY;

      if (particle.y < -10) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
      }
  }
  
  requestAnimationFrame(drawParticles);
}

drawParticles();
