// script.js

const images = document.querySelectorAll('.gallery-image');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

images.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentIndex = index;
        showLightbox(image.src);
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    lightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    lightboxImg.src = images[currentIndex].src;
});

function showLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}
