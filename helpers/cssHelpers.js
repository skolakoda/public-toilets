function cssHelpers() {
  const elem = document.querySelector('.collapsible.expandable');
  M.Collapsible.init(elem, {
    accordion: false
  });

  const menu = document.querySelector('#menu');
  const mainSite = document.querySelector('#mainSite');
  menu.addEventListener('click', () => {
    mainSite.classList.toggle('hidden');
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

  const line1 = document.querySelector('#line1');
  const line2 = document.querySelector('#line2');
  const line3 = document.querySelector('#line3');

  const switch1 = document.querySelector('.switch');
  switch1.addEventListener('click', () => {
    line1.classList.toggle('line1S');
    line2.classList.toggle('line2S');
    line3.classList.toggle('line3S');
  });
}

export default cssHelpers;
