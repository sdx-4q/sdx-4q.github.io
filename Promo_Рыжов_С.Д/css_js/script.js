(function() {
    // ========== ОЧЕНЬ РЕДКИЕ ПАДАЮЩИЕ ЧАСТИЦЫ ==========
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId = null;
    let lastParticleSpawn = 0;
    const particleSpawnInterval = 3000;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
        return {
            x: x !== undefined ? x : Math.random() * canvas.width,
            y: y !== undefined ? y : -20,
            size: Math.random() * 3 + 2,
            speedY: Math.random() * 1.2 + 0.6,
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.35 + 0.15,
            color: `rgba(179, 239, 66, ${Math.random() * 0.3 + 0.15})`
        };
    }

    function initParticles(count) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = Date.now();
        if (now - lastParticleSpawn > particleSpawnInterval && particles.length < 25) {
            particles.push(createParticle());
            lastParticleSpawn = now;
        }

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.y > canvas.height + 100 || p.x < -100 || p.x > canvas.width + 100) {
                particles.splice(i, 1);
                i--;
            }
        }

        animationId = requestAnimationFrame(drawParticles);
    }

    function startParticles() {
        resizeCanvas();
        initParticles(10);
        lastParticleSpawn = Date.now();
        drawParticles();
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    startParticles();

    // ========== АНИМАЦИЯ ВЫЕЗЖАНИЯ ==========
    const slideLeftElements = document.querySelectorAll('.slide-from-left');
    const slideRightElements = document.querySelectorAll('.slide-from-right');
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -30px 0px" };

    const slideLeftObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                slideLeftObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const slideRightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                slideRightObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    slideLeftElements.forEach(el => slideLeftObserver.observe(el));
    slideRightElements.forEach(el => slideRightObserver.observe(el));
    fadeElements.forEach(el => fadeObserver.observe(el));

    // ========== КНОПКИ ЗАГРУЗКИ ==========
    const downloadBtns = document.querySelectorAll('[data-os]');
    function handleDownload(osName) {
        alert(`🔽 Скачивание ${osName} версии Finlite\nДемо-режим: установочный файл готов к загрузке.`);
    }
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const os = btn.getAttribute('data-os');
            handleDownload(os);
        });
    });

    // ========== СОЦИАЛЬНЫЕ КНОПКИ ==========
    const socialItems = document.querySelectorAll('.social-item-green');
    socialItems.forEach(soc => {
        soc.addEventListener('click', () => {
            const name = soc.getAttribute('data-social') || soc.innerText;
            alert(`Переход в ${name} сообщество Finlite (демо-версия)`);
        });
    });

    // ========== БЕЙДЖИКИ ==========
    const badges = document.querySelectorAll('.badge-os');
    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            alert(`💿 Скачивание для ${badge.innerText} (демо-ссылка)`);
        });
    });

    // ========== 3D ЭФФЕКТ ДЛЯ ИЗОБРАЖЕНИЙ ПРИ ДВИЖЕНИИ МЫШИ ==========
    const images3d = document.querySelectorAll('.image-3d');

    images3d.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            img.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // ========== 3D ЭФФЕКТ ДЛЯ КАРТОЧЕК ПРИ ДВИЖЕНИИ МЫШИ (КАК У ИЗОБРАЖЕНИЙ) ==========
    const cards3d = document.querySelectorAll('.card-3d');

    cards3d.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ========== ДОПОЛНИТЕЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ==========
    setTimeout(() => {
        slideLeftElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
        slideRightElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
        fadeElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 200);
})();
