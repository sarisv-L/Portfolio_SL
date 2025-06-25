// ...existing code...
import lottie from 'lottie-web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

// lottie.loadAnimation({
//   container: document.getElementById('animation'), // the dom element
//   renderer: 'svg',
//   loop: false,
//   autoplay: true,
//   path: '/animation/Start-Test-01.json', // animation data
// });

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
    // Only start if the accordion item is opened
    if (!item.classList.contains('opened')) return;
    intervalId = setInterval(() => {
      // Only advance slides if still opened
      if (!item.classList.contains('opened')) {
        stopSlideshow();
        return;
      }
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
  const observer = new MutationObserver(() => {
    if (item.classList.contains('opened')) {
      startSlideshow();
    } else {
      stopSlideshow();
      currentSlide = 0;
      showSlide(currentSlide);
    }
  });
  observer.observe(item, { attributes: true, attributeFilter: ['class'] });
  if (item.classList.contains('opened')) {
    startSlideshow();
  }
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
const resetFace = (event) => {
  gsap.to(faceCircle, {
    x: 0,
    y: 0,
    duration: 1,
    ease: 'Elastic.easeOut',
  });
  gsap.to(myFaceImg, {
    x: 0,
    y: 0,
    duration: 1,
    ease: 'Elastic.easeOut',
  });
};

// Mouse move event listener
faceCircle.addEventListener('mousemove', activateFace);
faceCircle.addEventListener('mouseleave', resetFace);

/////// LENIS SCROLLING ////////////////////////////////////////

// Initialize Lenis
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

//////// GSAP Animation //////////////////////////

window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1.2 } });

  tl.from('#logo', {
    opacity: 0,
    scale: 0.5,
    xPercent: -300,
    rotation: 180, // Start rotated 180deg
  })
    .from(
      '.menu-button',
      {
        opacity: 0,
        y: -20,
        stagger: 0.2,
      },
      '-=0.3'
    )
    .from(
      '.profile-pic',
      {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    )
    .from(
      '.circle-wrapper',
      {
        opacity: 0,
        xPercent: 100,
        rotation: 180, // Start rotated 180deg
      },
      '-=0.4'
    );
});

//// Menu Button Hover
// Animate on hover using GSAP
const buttons = document.querySelectorAll('.menu-button');

buttons.forEach((button) => {
  const link = button.querySelector('a');

  button.addEventListener('mouseenter', () => {
    // Kill any running tweens to prevent overlap
    gsap.killTweensOf([button, link]);
    // bounce + scale effect
    gsap.to(button, {
      scale: 1.2,
      y: -5,
      duration: 0.4,
      ease: 'ease.out',
      overwrite: 'auto',
    });

    // offset text slightly
    gsap.to(link, {
      x: 4,
      y: -2,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  button.addEventListener('mouseleave', () => {
    // Kill any running tweens to prevent overlap
    gsap.killTweensOf([button, link]);
    // reset scale and remove inline transforms to ensure proper reset
    gsap.to(button, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onComplete: () => {
        gsap.set(button, { clearProps: 'transform' });
      },
    });

    // reset text offset
    gsap.to(link, {
      x: 0,
      y: 0,
      duration: 0.2,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onComplete: () => {
        gsap.set(link, { clearProps: 'transform' });
      },
    });
  });
});
