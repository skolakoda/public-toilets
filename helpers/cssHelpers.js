function cssHelpers() {
  const elem = document.querySelector('.collapsible.expandable');
  M.Collapsible.init(elem, {
    accordion: false
  });

  const sign = document.querySelector('#sign');
  const hideSignIn = document.querySelector('#hideSignIn');
  sign.addEventListener('click', () => {
    hideSignIn.style.display = 'block';
  });

  const goToSingnUp = document.querySelector('#goToSingnUp');
  const hideSignUp = document.querySelector('#hideSignUp');
  goToSingnUp.addEventListener('click', () => {
    hideSignIn.style.display = 'none';
    hideSignUp.style.display = 'block';
  });

  const goToSingnIn = document.querySelector('#goToSingnIn');
  goToSingnIn.addEventListener('click', () => {
    hideSignIn.style.display = 'block';
    hideSignUp.style.display = 'none';
  });
  window.addEventListener('click', event => {
    if (event.target === hideSignUp) {
      hideSignUp.style.display = 'none';
    }
  });

  window.addEventListener('click', event => {
    if (event.target === hideSignIn) {
      hideSignIn.style.display = 'none';
    }
  });

  const hamburger = document.querySelector('#hamburger-menu');
  const mainSite = document.querySelector('#mainSite');
  const line1 = document.querySelector('#line1');
  const line2 = document.querySelector('#line2');
  const line3 = document.querySelector('#line3');

  hamburger.addEventListener('click', () => {
    line1.classList.toggle('line1S');
    line2.classList.toggle('line2S');
    line3.classList.toggle('line3S');
    mainSite.classList.toggle('hidden');
  });

  mainSite.onscroll = () => {
    if (mainSite.scrollTop === 0) {
      hamburger.style.zIndex = '1';
    } else {
      hamburger.style.zIndex = '0';
    }
  };
}

export default cssHelpers;
