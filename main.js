let map;
function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(44.817197, 20.437273), zoom: 13});

  let iconBase =
      'http://maps.google.com/mapfiles/kml/shapes/';

  let icons = {
    info: {
      icon: iconBase + 'info.png'
    },
    man: {
      icon: iconBase + 'man.png'
    },
    lodging: {
      icon: iconBase + 'lodging.png'
    },
    home: {
      icon: iconBase + 'homegardenbusiness.png'
    },
    horse: {
      icon: iconBase + 'horsebackriding.png'
    }
  };

  let places = [
    {
      position: new google.maps.LatLng(44.8116093,20.4710836),
      type: 'home'
    }, {
      position: new google.maps.LatLng(44.8482649,20.3844028),
      type: 'home'
    },
    {
      position: new google.maps.LatLng(44.8141699,20.4595646),
      type: 'info'
    },
    {
      position: new google.maps.LatLng(44.8115567,20.4656869),
      type: 'horse'
    }
  ];

  // Create markers.
  for (let i = 0; i < places.length; i++) {
    let marker = new google.maps.Marker({
      position: places[i].position,
      icon: icons[places[i].type].icon,
      map: map
    });
  };
}

  // Get current location
/* let x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
} */



  
  
