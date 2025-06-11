// ...existing code...
import lottie from 'lottie-web';

lottie.loadAnimation({
  container: document.getElementById('animation'), // the dom element
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: '/animation/Start-Test-01.json', // animation data
});

let accordionsItems = document.querySelectorAll('.accordion li');

accordionsItems.forEach((item) => {
  item.addEventListener('click', () => {
    accordionsItems.forEach((item) => {
      item.classList.remove('opened');
    });

    item.classList.add('opened');
  });
});
