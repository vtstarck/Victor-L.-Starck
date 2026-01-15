/* ARQUIVO: script.js
   AUTOR: Victor
   DESCRIÇÃO: Controla as animações e interatividade do portfólio.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Efeito de Digitação (Typewriter) na Hero Section ---
    const heroText = document.querySelector('.hero-content p');
    const originalText = heroText.innerText;
    heroText.innerText = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroText.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // Velocidade da digitação
        }
    }
    // Inicia a digitação após 1 segundo
    setTimeout(typeWriter, 1000);


    // --- 2. Navbar Dinâmica (Muda de cor ao rolar) ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 3. Scroll Reveal (Aparecer ao rolar) ---
    // Seleciona elementos para animar
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .stat-box, .photo-item, .article-card');

    const observerOptions = {
        threshold: 0.15, // Aciona quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Para de observar depois que animou
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        el.classList.add('hidden-el'); // Adiciona classe inicial via JS para não esconder se JS falhar
        observer.observe(el);
    });


    // --- 4. Rolagem Suave para Links Internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// --- 5. Easter Egg: Acesso à Área Secreta (Cannabis Forum) ---
    document.addEventListener('keydown', function(event) {
        // Verifica se CTRL + SHIFT + W foram pressionados
        if (event.ctrlKey && event.shiftKey && (event.key === 'W' || event.key === 'w')) {
            
            event.preventDefault(); // Tenta impedir que o navegador feche a aba
            
            // Efeito visual antes de trocar de página (Tela pisca verde)
            document.body.style.transition = "background-color 0.2s";
            document.body.style.backgroundColor = "#002211"; // Verde muito escuro
            
            setTimeout(() => {
                // Redireciona para a página secreta
                window.location.href = 'secret-forum.html';
            }, 300);
        }
    });