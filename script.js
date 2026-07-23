//==========================================
// ELEMENTOS
//==========================================
const welcomeScreen = document.querySelector(".welcome-screen");
const letterScreen = document.querySelector(".letter-screen");
const formScreen = document.querySelector(".form-screen");
const thanksScreen = document.querySelector(".thanks-screen");

const startButton = document.getElementById("startButton");
const openLetter = document.getElementById("openLetter");
const loveForm = document.getElementById("loveForm");
const loveRange = document.getElementById("loveRange");
const loveValue = document.getElementById("loveValue");
const music = document.getElementById("music");

//==========================================
// SLIDER
//==========================================
loveRange.addEventListener("input", () => {
    loveValue.innerHTML = `${loveRange.value} ❤️`;
});

//==========================================
// CAMBIAR PANTALLA
//==========================================
function showScreen(screen){
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });
    screen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

//==========================================
// BIENVENIDA
//==========================================
startButton.addEventListener("click", () => {
    showScreen(letterScreen);
});

//==========================================
// ABRIR CARTA
//==========================================
openLetter.addEventListener("click", () => {
    showScreen(formScreen);
    music.play().catch(() => {});
});

//==========================================
// EFECTO CORAZONES
//==========================================
function createHeart(){
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = (Math.random() * 20 + 18) + "px";
    heart.style.opacity = ".8";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.transition = "all 6s linear";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = `translateY(-120vh) rotate(${Math.random()*720}deg)`;
        heart.style.opacity = "0";
    }, 50);

    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 700);

//==========================================
// CONFETTI CORAZONES
//==========================================
function celebration(){
    for(let i = 0; i < 40; i++){
        setTimeout(createHeart, i * 100);
    }
}

//==========================================
// ENVIAR FORMULARIO
//==========================================
loveForm.addEventListener("submit", async function(e){
    e.preventDefault();

    const button = document.querySelector(".submitButton");
    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = "💌 Enviando...";

    try {
        const response = await fetch(this.action, {
            method: "POST",
            body: new FormData(this),
            headers: { "Accept": "application/json" }
        });

        if(response.ok){
            celebration();
            showScreen(thanksScreen);
            music.pause();
            this.reset();
            loveValue.innerHTML = "500 ❤️";
        } else {
            throw new Error("No se pudo enviar");
        }
    } catch(error){
        console.error(error);
        alert("Ocurrió un error enviando el formulario 😢");
    }

    button.disabled = false;
    button.innerHTML = originalText;
});

//==========================================
// MENSAJES ROMÁNTICOS
//==========================================
const mensajes = [
    "Cada respuesta tuya vale oro ❤️",
    "Gracias por formar parte de mi vida ❤️",
    "Te amo muchísimo ❤️",
    "Sos mi lugar favorito ❤️",
    "Siempre voy a elegirte ❤️"
];

setInterval(() => {
    const titulo = document.querySelector(".form-card h1");
    if(titulo) titulo.innerHTML = mensajes[Math.floor(Math.random()*mensajes.length)];
}, 7000);

//==========================================
// EFECTO CURSOR
//==========================================
document.addEventListener("mousemove", (e) => {
    if(Math.random() > 0.85){
        const heart = document.createElement("span");
        heart.innerHTML = "💕";
        heart.style.position = "fixed";
        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";
        heart.style.pointerEvents = "none";
        heart.style.fontSize = "16px";
        heart.style.transition = "all 1.5s ease";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = "translateY(-40px)";
            heart.style.opacity = "0";
        }, 20);

        setTimeout(() => heart.remove(), 1500);
    }
});