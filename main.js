/* eslint-disable import/extensions */
/* global google */
import icons from './helpers/icons.js';
import createInfowindow from './helpers/infowindow.js';
import addLocation from './helpers/addLocation.js';
import { latObj, lonObj } from './helpers/globals.js';

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: new google.maps.LatLng(44.8086419, 20.4882411),
    zoom: 17,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    fullscreenControl: true
  });

  function createMarkers(places) {
    const marker = new google.maps.Marker({
      position: places.position,
      icon: icons[places.type] ? icons[places.type].icon : icons.default.icon,
      map
    });
    return marker;
  }

  function displayInfowindow(markers, infowindow) {
    markers.addListener('click', () => {
      infowindow.open(map, markers);
    });
  }
  function displayLocations(spomenici) {
    spomenici.forEach(spomenik => {
      const naslov = spomenik.naslov ? spomenik.naslov : null;
      const opis = spomenik.opis ? spomenik.opis : null;
      const type = spomenik.kategorija ? spomenik.kategorija : null;

      let lat;
      let lon;
      let newLocation;
      let markerMaker;
      let infowindowContent;
      let infowindowMaker;
      if (spomenik.lokacija) {
        lat = spomenik.lokacija.lat ? spomenik.lokacija.lat : null;
        lon = spomenik.lokacija.lon ? spomenik.lokacija.lon : null;
        if (lat && lon) {
          newLocation = {
            position: new google.maps.LatLng(lat, lon),
            type
          };
          markerMaker = createMarkers(newLocation);
        }
      }
      if (naslov && opis) {
        infowindowContent = `<div><header><h3>${naslov}</h3></header><article><p>${opis}</p></article></div>`;
        infowindowMaker = createInfowindow(infowindowContent);
      }
      if (markerMaker && infowindowMaker) {
        displayInfowindow(markerMaker, infowindowMaker);
      }
    });
  }

  fetch('https://spomenici-api.herokuapp.com/novogroblje')
    .then(response => response.json())
    .then(data => {
      displayLocations(data);
    });

  const myLocation = document.querySelector('#my_location');
  myLocation.onclick = () => {
    if (navigator.geolocation) {
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
    }
  };
}
window.onload = initMap;

document.getElementById("myForm").addEventListener("submit", addLocation);