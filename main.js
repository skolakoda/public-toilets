import icons from './helpers/icons.js';
import map from './helpers/map.js';
import createInfowindow from './helpers/infowindow.js';
import addLocation from './helpers/addLocation.js';
import { latObj, lonObj } from './helpers/constants.js';
import cssHelpers from './helpers/cssHelpers.js';
import logSystem from './helpers/logSystem.js';
import findNearestLocation from './helpers/closestToilet.js';

const allMarkers = [];
const checkedList = document.querySelectorAll('input[name=filter]');
const myForm = document.getElementById('myForm');
const emergency = document.querySelector('#emergencyBtn');

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

function displayLocations(toilets) {
  toilets.forEach(toilet => {
    const { naslov, opis, kategorija, slika } = toilet;
    const { lat, lon } = toilet.lokacija;
    const newLocation = {
      position: new google.maps.LatLng(lat, lon),
      type: kategorija
    };
    const marker = createMarker(newLocation);
    const infowindowContent = `
    <div">
    <header>
      <h5 style="padding: 5px;">${kategorija.toUpperCase()}</h5>
    </header>
    <header>
      <h6 style="padding: 5px;">${naslov}</h6>
    </header>
    ${slika ? `<img src="data:image/png;base64, ${slika}" style="padding-right: 10px;"/>` : ''} 
    <article style="padding: 5px;">
      <p>${opis || ''}</p>
    </article>
  </div>
    `;
    const infowindow = createInfowindow(infowindowContent);
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
    map.addListener('click', () => {
      infowindow.close(map, marker);
    });
  });
}

fetch('https://spomenici-api.herokuapp.com/kolekcija/toilets')
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

emergency.addEventListener('click', () => {
  findNearestLocation(allMarkers);
});

cssHelpers();
logSystem();
