import icons from './helpers/icons.js';
import map from './helpers/map.js';
import createInfowindow from './helpers/infowindow.js';
import addLocation from './helpers/addLocation.js';
import { latObj, lonObj } from './helpers/constants.js';
import cssHelpers from './helpers/cssHelpers.js';
import logSystem from './helpers/logSystem.js';

const allMarkers = [];
const checkedList = document.querySelectorAll('input[name=filter]');
const myForm = document.getElementById('myForm');

function createMarker({ position, type }) {
  const marker = new google.maps.Marker({
    icon: icons[type] ? icons[type].icon : icons.default.icon,
    category: type,
    position,
    map
  });
  allMarkers.push(marker);
  return marker;
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
    const infowindow = createInfowindow(infowindowContent);
    marker.addListener('click', () => infowindow.open(map, marker));
  });
}

fetch('https://spomenici-api.herokuapp.com/kolekcija/novogroblje')
  .then(response => response.json())
  .then(response => {
    displayLocations(response.data);
  });

const myLocationIcon = document.querySelector('#my_location');
myLocationIcon.onclick = () => {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const pos = {
      lat: coords.latitude,
      lng: coords.longitude
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

const toggleMarkers = cbox => {
  allMarkers.forEach(mark => {
    if (mark.category === cbox.value) {
      mark.setMap(cbox.checked ? map : null);
    }
  });
};

myForm.addEventListener('submit', addLocation);

checkedList.forEach(cbox => cbox.addEventListener('change', () => toggleMarkers(cbox)));

cssHelpers();
logSystem();
