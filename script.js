document.addEventListener('DOMContentLoaded', () => {
    
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

   
    skills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        container.appendChild(tag);
    });

   
    console.log("Portfólio de Basílio Dona carregado com sucesso.");
});
