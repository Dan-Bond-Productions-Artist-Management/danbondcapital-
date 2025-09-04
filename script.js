// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0, 0, 0, 0.98)";
    } else {
        navbar.style.background = "rgba(0, 0, 0, 0.95)";
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(
        ".venture-card, .opportunity-card, .stat",
    );

    animateElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);

        // Simple validation
        const requiredFields = this.querySelectorAll("[required]");
        let isValid = true;

        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = "#e74c3c";
            } else {
                field.style.borderColor = "#e9ecef";
            }
        });

        if (isValid) {
            // Show success message
            showMessage(
                "Thank you for your message! I'll get back to you soon.",
                "success",
            );
            this.reset();
        } else {
            showMessage("Please fill in all required fields.", "error");
        }
    });
}

// Message display function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const message = document.createElement("div");
    message.className = `form-message ${type}`;
    message.textContent = text;
    message.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 10px;
        text-align: center;
        font-weight: 500;
        ${
            type === "success"
                ? "background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;"
                : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"
        }
    `;

    // Insert message after form
    contactForm.parentNode.insertBefore(message, contactForm.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        // Don't add loading to external links
        if (
            this.getAttribute("href") &&
            this.getAttribute("href").startsWith("http")
        ) {
            return;
        }

        // Add loading effect for internal buttons
        if (this.type === "submit") {
            const originalText = this.textContent;
            this.textContent = "Sending...";
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
    const heroH2 = document.querySelector(".hero-content h2");
    if (heroH2) {
        const originalText = heroH2.textContent;
        typeWriter(heroH2, originalText, 80);
    }
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to cards
document
    .querySelectorAll(".venture-card, .opportunity-card")
    .forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

// Add click tracking for Uber referral link
document.querySelector('a[href*="uber.com"]')?.addEventListener("click", () => {
    console.log("Uber referral link clicked");
    // You can add analytics tracking here if needed
});

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll("section");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    },
    { threshold: 0.1 },
);

revealSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    revealObserver.observe(section);
});

// Add CSS for revealed sections
const style = document.createElement("style");
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
