// ...existing code...
import lottie from 'lottie-web';
import { gsap } from 'gsap';

lottie.loadAnimation({
  container: document.getElementById('animation'), // the dom element
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: '/animation/Start-Test-01.json', // animation data
});

let accordionsItems = document.querySelectorAll('.accordion-item');

accordionsItems.forEach((item) => {
  item.addEventListener('click', () => {
    accordionsItems.forEach((item) => {
      item.classList.remove('opened');
    });

    item.classList.add('opened');
  });
});

////// Slideshow Integration

accordionsItems.forEach((item) => {
  const slides = item.querySelectorAll('figure .slide');
  let currentSlide = 0;
  let intervalId = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function startSlideshow() {
    if (intervalId || slides.length < 2) return;
    intervalId = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 6000);
  }

  function stopSlideshow() {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Show the first slide initially
  showSlide(currentSlide);

  // Listen for accordion open/close
  item.addEventListener('click', () => {
    if (item.classList.contains('opened')) {
      startSlideshow();
    } else {
      stopSlideshow();
      currentSlide = 0;
      showSlide(currentSlide);
    }
  });
});

/// My Face Animation Intro
const faceCircle = document.getElementById('my-face');
const myFaceImg = faceCircle.querySelector('img');

// Mouse move stuff
const activateFace = (event) => {
  let boundBox = faceCircle.getBoundingClientRect();
  const circleStrength = 40;
  const faceStrength = 80;
  const newX = (event.clientX - boundBox.left) / faceCircle.offsetWidth - 0.5;
  const newY = (event.clientY - boundBox.top) / faceCircle.offsetHeight - 0.5;

  // Move Circle to mouse position
  gsap.to(faceCircle, {
    x: newX * circleStrength,
    y: newY * circleStrength,
    duration: 1,
    ease: 'power4.easeOut',
  });
  gsap.to(myFaceImg, {
    x: newX * faceStrength,
    y: newY * faceStrength,
    duration: 1,
    ease: 'power4.easeOut',
  });
};

// Mouse leave stuff
const resetFace = (event) => {};

// Mouse move event listener
faceCircle.addEventListener('mousemove', activateFace);
faceCircle.addEventListener('mouseleave', resetFace);
