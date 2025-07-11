// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
});

// Fade-in animation for sections and animated elements
const animatedElements = document.querySelectorAll('[data-animate], .section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => observer.observe(element));

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 80) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back-to-top button visibility
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Parallax effect for hero form
window.addEventListener('scroll', () => {
    const heroForm = document.querySelector('.hero-form');
    const scrollPosition = window.pageYOffset;
    heroForm.style.transform = `translateY(${scrollPosition * 0.2}px)`;
});

// Form submission handling (client-side validation)
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formMessage = form.nextElementSibling;
    const formData = new FormData(form);
    
    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (name && email && (form.id === 'hero-form' ? phone : message)) {
        formMessage.textContent = 'Thank you for your submission! We’ll get back to you soon.';
        formMessage.style.color = '#007bff';
        form.reset();
        setTimeout(() => formMessage.textContent = '', 3000);
    } else {
        formMessage.textContent = 'Please fill out all required fields.';
        formMessage.style.color = '#e74c3c';
    }
}