// ...existing code...
import lottie from 'lottie-web';

lottie.loadAnimation({
  container: document.getElementById('animation'), // the dom element
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: '/animation/Start-Test-01.json', // animation data
});
