/* eslint-disable import/extensions */
/* global google */
import icons from './helpers/icons.js';
import mapConfig from './helpers/mapConfig.js';
import createInfowindow from './helpers/infowindow.js';
import addLocation from './helpers/addLocation.js';
import { latObj, lonObj } from './helpers/constants.js';

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), mapConfig);

  function createMarker(places) {
    const marker = new google.maps.Marker({
      position: places.position,
      icon: icons[places.type] ? icons[places.type].icon : icons.default.icon,
      map
    });
    return marker;
  }

  function addInfowindow(marker, infowindow) {
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  }

  function displayLocations(spomenici) {
    spomenici.forEach(spomenik => {
      const { naslov, opis, kategorija } = spomenik;
      const { lat, lon } = spomenik.lokacija;
      const newLocation = {
        position: new google.maps.LatLng(lat, lon),
        type: kategorija
      };
      const marker = createMarker(newLocation);
      const infowindowContent = `
        <div>
          <header>
            <h3>${naslov}</h3>
          </header>
          <article>
            <p>${opis || ''}</p>
          </article>
        </div>
      `;
      addInfowindow(marker, createInfowindow(infowindowContent));
    });
  }

  fetch('https://spomenici-api.herokuapp.com/kolekcija/novogroblje')
    .then(response => response.json())
    .then(response => {
      displayLocations(response.data);
    });

  const myLocationIcon = document.querySelector('#my_location');
  myLocationIcon.onclick = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      map.setZoom(18);
      latObj.value = pos.lat;
      lonObj.value = pos.lng;

      // eslint-disable-next-line no-new
      new google.maps.Marker({
        position: pos,
        map
      });
    });
  };
}

window.onload = initMap;

document.getElementById('myForm').addEventListener('submit', addLocation);
