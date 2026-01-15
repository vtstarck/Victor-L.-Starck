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
// --- 5. Easter Egg: Clique Secreto no Ponto do Logo ---
    const secretTrigger = document.querySelector('.logo span');
    
    // Contador de cliques (opcional: se quiser que precise clicar 3x pra abrir)
    // Por enquanto deixei com 1 clique só, como pediu.
    
    if (secretTrigger) {
        secretTrigger.addEventListener('click', function() {
            // Feedback visual sutil (o ponto pisca verde rápido)
            secretTrigger.style.color = '#00ff88';
            secretTrigger.style.textShadow = '0 0 10px #00ff88';
            
            // Efeito de transição na tela
            document.body.style.transition = "all 0.5s ease";
            document.body.style.filter = "invert(1) hue-rotate(180deg)"; // Efeito psicodélico de "Matrix"
            
            setTimeout(() => {
                // Redireciona para o Fórum Secreto
                window.location.href = 'secret-forum.html';
            }, 400);
        });
        
        // DICA STARK: Muda o cursor para indicar que é clicável? 
        // Se quiser que seja 100% secreto, apague a linha abaixo.
        secretTrigger.style.cursor = 'pointer'; 
    }