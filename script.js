document.addEventListener('DOMContentLoaded', () => {
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
