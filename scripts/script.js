// ...existing code...
import lottie from 'lottie-web';

lottie.loadAnimation({
  container: document.getElementById('nav-elements'), // the dom element
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/animation/ballz.json', // animation data
});
