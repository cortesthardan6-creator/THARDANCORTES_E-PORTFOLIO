/* PORTFOLIO JAVASCRIPT — fixed and mobile-friendly */

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            const open = navLinks.classList.contains("show");
            menuBtn.textContent = open ? "✕" : "☰";
            menuBtn.setAttribute("aria-expanded", String(open));
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuBtn.textContent = "☰";
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* Typing animation */
    const typingText = document.getElementById("typingText");
    const words = [
        "English Major Student",
    ];

    if (typingText) {
        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (!deleting) {
                typingText.textContent = currentWord.substring(0, characterIndex + 1);
                characterIndex++;

                if (characterIndex === currentWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1600);
                    return;
                }
            } else {
                typingText.textContent = currentWord.substring(0, characterIndex - 1);
                characterIndex--;

                if (characterIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(typeEffect, deleting ? 45 : 85);
        }

        typeEffect();
    }

    /* Light / dark mode */
    const themeBtn = document.getElementById("themeBtn");

    function applyTheme(theme) {
        const dark = theme === "dark";
        document.body.classList.toggle("dark", dark);

        if (themeBtn) {
            themeBtn.textContent = dark ? "☀" : "☾";
            themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
            themeBtn.setAttribute("aria-pressed", String(dark));
        }

        try {
            localStorage.setItem("theme", theme);
        } catch (e) {}
    }

    if (themeBtn) {
        let saved = null;
        try { saved = localStorage.getItem("theme"); } catch (e) {}

        if (saved === "dark" || saved === "light") {
            applyTheme(saved);
        } else {
            const prefersDark = window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(prefersDark ? "dark" : "light");
        }

        themeBtn.addEventListener("click", () => {
            applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
        });
    }

    /* Active navigation */
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    function updateActiveNavigation() {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 160;
            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {
                current = section.id;
            }
        });

        navItems.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    }

    window.addEventListener("scroll", updateActiveNavigation, { passive: true });
    updateActiveNavigation();

    /* Scroll reveal */
    const revealElements = document.querySelectorAll(
        ".section-heading, .about-grid, .skill-card, .project-card, .timeline-item, .interest, .contact-box"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => element.classList.add("revealed"));
    }

    /* 3D card effect only on mouse/desktop */
    const canHover = window.matchMedia &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canHover) {
        document.querySelectorAll(".project-card").forEach(card => {
            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateX = ((y / rect.height) - 0.5) * -5;
                const rotateY = ((x / rect.width) - 0.5) * 5;

                card.style.transform =
                    `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    /* Button click effect */
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => {
            button.style.transform = "scale(0.97)";
            setTimeout(() => button.style.transform = "", 120);
        });
    });

    /* Current year */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
});
