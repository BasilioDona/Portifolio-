document.addEventListener('DOMContentLoaded', () => {
const slider = document.getElementById("slider");

let startX = 0;
let currentIndex = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) {
        // arrastou para esquerda
        currentIndex++;
    } else if (diff < -50) {
        // arrastou para direita
        currentIndex--;
    }

    const totalSlides = slider.children.length;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= totalSlides) currentIndex = totalSlides - 1;

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
});
    // Competências extraídas do seu currículo
    const skills = [
        "Redes de Computadores", 
        "Manutenção de Impressoras", 
        "Suporte Técnico Hardware", 
        "Sistemas Operacionais", 
        "Configuração de Redes Locais",
        "Eléctrica Industrial e Residencial",
        "Automação Industrial e Residencial",
    ];

    const container = document.getElementById('skills-list');

    // Inserção dinâmica das tags
    skills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        container.appendChild(tag);
    });

    // Log para confirmar carregamento
    console.log("Portfólio de Basílio Dona carregado com sucesso.");
});
