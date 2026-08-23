// ============================================
// CARREGAMENTO DO DOCUMENTO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSkills();
    initServiceSlider();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
});

// ============================================
// NAVEGAÇÃO E MENU
// ============================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Menu hamburger
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scrolled effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// COMPETÊNCIAS DINÂMICAS
// ============================================

function initSkills() {
    const skillsData = {
        network: [
            'Redes de Computadores',
            'Configuração de Redes Locais',
            'CCNA 200-301',
            'Infraestrutura de TI',
            'Diagnóstico de Redes',
            'Segurança de Redes'
        ],
        system: [
            'Sistemas Operacionais',
            'Suporte Técnico Hardware',
            'Instalação de Sistemas',
            'Troubleshooting',
            'Manutenção de Computadores',
            'Arquitetura de Hardware'
        ],
        specialty: [
            'Manutenção de Impressoras',
            'Eléctrica Industrial',
            'Automação Industrial',
            'Sistemas CCTV',
            'Instalações Eléctricas',
            'Manutenção Preventiva'
        ]
    };

    populateSkills('networkSkills', skillsData.network);
    populateSkills('systemSkills', skillsData.system);
    populateSkills('specialtySkills', skillsData.specialty);
}

function populateSkills(elementId, skills) {
    const container = document.getElementById(elementId);
    skills.forEach((skill, index) => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        tag.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(tag);
    });
}

// ============================================
// SLIDER DE SERVIÇOS
// ============================================

function initServiceSlider() {
    const slider = document.getElementById('servicesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('sliderIndicators');
    
    let currentIndex = 0;
    const slides = document.querySelectorAll('.service-slide');
    const totalSlides = slides.length;

    // Criar indicadores
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = i === 0 ? 'indicator active' : 'indicator';
        indicator.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        indicatorsContainer.appendChild(indicator);
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar indicadores
        document.querySelectorAll('.indicator').forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    });

    // Touch events para mobile
    let startX = 0;
    let currentTranslate = 0;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, false);

    slider.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (diff > 50) {
            currentIndex = (currentIndex + 1) % totalSlides;
        } else if (diff < -50) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }

        updateSlider();
    }, false);

    // Auto-play (opcional - comentar se não quiser)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalSlides;
    //     updateSlider();
    // }, 6000);
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animar elementos quando entrarem em vista
    document.querySelectorAll('.education-card, .experience-card, .contact-card, .skill-tag').forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// FORMULÁRIO DE CONTACTO
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Validação básica
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos', 'error');
                return;
            }

            // Abrir WhatsApp com mensagem pré-preenchida
            const whatsappMessage = encodeURIComponent(
                `Olá! Meu nome é ${name}.\n\nEmail: ${email}\n\nMensagem: ${message}`
            );
            window.open(`https://wa.me/258842238456?text=${whatsappMessage}`, '_blank');

            // Limpar formulário
            contactForm.reset();
            showNotification('Redirecionando para WhatsApp...', 'success');
        });
    }
}

// ============================================
// NOTIFICAÇÕES
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SCROLL SUAVE
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// EFEITOS DE PARALLAX (Opcional)
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const speed = element.getAttribute('data-parallax') || 0.5;
            
            if (elementPosition - window.innerHeight < scrollPosition) {
                element.style.transform = `translateY(${(scrollPosition - elementPosition) * speed}px)`;
            }
        });
    });
}

// ============================================
// CONTADOR ANIMADO (Opcional)
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// ============================================
// LOG DE CARREGAMENTO
// ============================================

console.log('%c✨ Portfólio de Basílio Carlito Dona carregado com sucesso!', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
console.log('%cTema moderno e profissional ativado', 'color: #10b981; font-size: 12px;');
