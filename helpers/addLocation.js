/* eslint-disable import/extensions */
import { latObj, lonObj } from './globals.js';

function addLocation(event) {
  event.preventDefault();
  const naslov = document.getElementById('naslov').value;
  const opis = document.getElementById('opis').value;
  const kategorija = document.getElementById('kategorija').value;
  const slika = document.getElementById('slika').value;
  const lat = latObj.value;
  const lon = lonObj.value;

  fetch('https://spomenici-api.herokuapp.com/kolekcija/novogroblje/dodaj', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      naslov,
      opis,
      kategorija,
      slika,
      lat,
      lon
    })
  }).then(response => {
    response.text();
    window.location.reload();
  });
}

export { addLocation as default };
