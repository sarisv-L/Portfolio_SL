// ...existing code...
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (window.matchMedia('(min-width:769px)').matches) {
  import('https://unpkg.com/lenis@1.3.4/dist/lenis.min.js').then(() => {
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
  });
}

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

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

//////// GSAP Animation //////////////////////////

window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1.2 } });

  tl.from('.menu-button', {
    opacity: 0,
    y: -80,
    scale: 1,
    duration: 1.5,
    stagger: 0.25,
  })
    // Start menu buttons as circles above their final position

    .from(
      '#logo',
      {
        x: -400,
        y: -300,
        opacity: 0,
        scale: 0,
        xPercent: -100,
        ease: 'back.out(1.2)',
      },
      '-=1'
    )

    .from(
      '.profile-pic',
      {
        x: -400,
        y: -300,
        opacity: 0,
        scale: 0,
        duration: 2,
        ease: 'back.out(1.2)',
      },
      '-=0.2'
    )
    .from(
      '.intro-text',
      {
        opacity: 0,
        duration: 4,
        ease: 'expo.inOut',
        yPercent: 100,
      },
      '-=3.5'
    );

  if (window.matchMedia('(min-width: 769px)').matches) {
    tl.to('.intro-text', {
      scrollTrigger: {
        trigger: '.intro-text',
        start: 'top bottom',
        end: 'bottom 60%',
        scrub: 3,
        toggleActions: 'play none none reverse',
      },
      x: 800,
      rotation: 180,
      delay: 0.5,
      duration: 1.5,
      ease: 'power2.out',
    });
  }

  tl.from(
    '.work',
    {
      scrollTrigger: {
        trigger: 'intro-text',
        start: 'top top',
        end: 'center center',
        scrub: 2,
        toggleActions: 'play none none reverse',
      },
      xPercent: -50,
      ease: 'power2.out',
    }
    // '-=3.5'
  )
    .from('.web-header h2', {
      scrollTrigger: {
        trigger: '.description-text',
        start: 'top center',
        end: 'center 20%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      yPercent: -100,
      ease: 'power2.out',
      stagger: 0.25,
    })
    .from('#contact h2', {
      scrollTrigger: {
        trigger: '.skillz',
        start: 'top center',
        end: 'bottom 20%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      yPercent: -100,
      ease: 'power2.out',
      stagger: 0.25,
    });

  gsap.utils.toArray('.skillz .kugel').forEach((circle, i) => {
    gsap.from(circle, {
      scrollTrigger: {
        trigger: circle,
        start: 'center 90%',
        end: 'center 40%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
      x: -150,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      // delay: i * 0.2,
    });
  });
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

/// SCROLL TRIGGER CARDS
const cards = document.querySelectorAll('.card');

cards.forEach((card, i) => {
  const cardDirection = i % 2 !== 0 ? -100 : 100;
  gsap.set(card, {
    xPercent: cardDirection,
    opacity: 0,
  });

  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top center',
      end: 'bottom 80%',

      toggleActions: 'play none none reverse',
    },
    xPercent: 0,
    opacity: 1,
  });
});

const goToTop = document.getElementById('go-to-top');

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
    goToTop.classList.add('visible');
  } else {
    goToTop.classList.remove('visible');
  }
});

goToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
