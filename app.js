const nextSliderButton = document.getElementById('nextSlider');
const prevSliderButton = document.getElementById('prevSlider');
const carouselSlider = document.querySelector('.carouselSlider');
const listHTML = document.querySelector('.carouselSlider .list');
const seeMoreButtons = document.querySelectorAll('.seeMore');
const backButton = document.getElementById('back');

let unAcceptClick;
let autoSlideInterval;

// Function to show the slider with animation
const showSlider = (type) => {
    nextSliderButton.style.pointerEvents = 'none';
    prevSliderButton.style.pointerEvents = 'none';

    carouselSlider.classList.remove('nextSlider', 'prevSlider');
    const items = document.querySelectorAll('.carouselSlider .list .item');
    if (type === 'nextSlider') {
        listHTML.appendChild(items[0]);
        carouselSlider.classList.add('nextSlider');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carouselSlider.classList.add('prevSlider');
    }

    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
        nextSliderButton.style.pointerEvents = 'auto';
        prevSliderButton.style.pointerEvents = 'auto';
    }, 2000);
};

// Function to start auto-slide
const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        showSlider('nextSlider');
    }, 3000);
};

// Function to stop auto-slide
const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

// Initialize auto-slide
startAutoSlide();

// Event listeners for navigation buttons
nextSliderButton.addEventListener('click', () => {
    showSlider('nextSlider');
    stopAutoSlide();
    startAutoSlide(); // Restart auto-slide after manual interaction
});
prevSliderButton.addEventListener('click', () => {
    showSlider('prevSlider');
    stopAutoSlide();
    startAutoSlide(); // Restart auto-slide after manual interaction
});

// Event listeners for detail view buttons
seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        carouselSlider.classList.remove('nextSlider', 'prevSlider');
        carouselSlider.classList.add('showDetail');
        stopAutoSlide(); // Stop auto-slide when showing detail view
    });
});

// Event listener for back button
backButton.addEventListener('click', () => {
    carouselSlider.classList.remove('showDetail');
    startAutoSlide(); // Restart auto-slide when going back to carousel
});
