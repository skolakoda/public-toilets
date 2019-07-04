function addLocation(event) {
  event.preventDefault();
  if (!localStorage.token) {
    const hideSignIn = document.querySelector('#hideSignIn');
    const loggedIn = document.querySelector('#loggedIn');
    hideSignIn.style.display = 'block';
    loggedIn.style.color = '#f44336';
    loggedIn.innerHTML = 'Please log in first to add toilet!';
    return;
  }

  const forma = document.getElementById('myForm');
  const formData = new FormData(forma);

  fetch('https://spomenici-api.herokuapp.com/kolekcija/toilets/dodaj', {
    method: 'POST',
    headers: { 'x-auth-token': `${localStorage.token}` },
    body: formData
  }).then(response => {
    response.json();
    window.location.reload();
  });
}

export { addLocation as default };
