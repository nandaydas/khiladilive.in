// Initialize Lucide icons
lucide.createIcons();

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// FAQ Toggle
function toggleFaq(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// Testimonial Carousel
let currentSlide = 0;
const totalSlides = 5;
let autoSlideInterval;

function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 2000); // Auto-slide every 2 seconds
    }

    // Add click events to navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); // Reset the timer when manually navigating
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); // Reset the timer when manually navigating
    });

    // Pause auto-slide on hover
    const testimonialSection = document.querySelector('.testimonial-carousel').parentElement.parentElement;
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    testimonialSection.addEventListener('mouseleave', () => {
        resetAutoSlide();
    });

    // Start auto-slide
    resetAutoSlide();
    updateCarousel(); // Initial update
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialCarousel();
    initScrollAnimations();
});