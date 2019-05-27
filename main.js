/* global google */
let map;
let marker;

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
    klub: {
      icon: `${iconBase1}icon32.png`
    },
    restoran: {
      icon: `${iconBase2}icon47.png`
    },
    proba: {
      icon: `${iconBase2}icon26.png`
    }
  };

  function createMarkers(places) {
    // Create markers
    marker = new google.maps.Marker({
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

  function createInfowindow(content) {
    const infowindow = new google.maps.InfoWindow({
      content
    });
    return infowindow;
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

window.onload = initMap;