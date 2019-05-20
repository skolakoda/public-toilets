/* global google */
let map;
// eslint-disable-next-line no-unused-vars
let marker;
// eslint-disable-next-line no-unused-vars
function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: new google.maps.LatLng(44.817197, 20.437273),
    zoom: 12
  });

  const iconBase1 = 'http://maps.google.com/mapfiles/kml/pal2/';
  const iconBase2 = 'http://maps.google.com/mapfiles/kml/pal3/';

  const icons = {
    default: {
      icon: `${iconBase1}icon10.png`
    },
    info: {
      icon: `${iconBase2}icon44.png`
    },
    restaurants: {
      icon: `${iconBase1}icon32.png`
    },
    radiation: {
      icon: `${iconBase2}icon47.png`
    },
    market: {
      icon: `${iconBase2}icon26.png`
    }
  };

  function createMarkers(places) {
    // Create markers
    places.forEach(i => {
      marker = new google.maps.Marker({
        position: i.position,
        icon: icons[i.type].icon,
        map
      });
    });
  }
  function displayLocations(spomenici) {
    const places = [];
    spomenici.forEach(spomenik => {
      const { lat } = spomenik.lokacija;
      const { lon } = spomenik.lokacija;
      const newLocation = {
        position: new google.maps.LatLng(lat, lon),
        type: 'radiation'
      };
      places.push(newLocation);
    });
    createMarkers(places);
  }

  fetch('https://spomenici-api.herokuapp.com/spomenici')
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

        marker = new google.maps.Marker({
          position: pos,
          map
        });
      });
    }
  };
}
