let map;
function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(44.787197, 20.457273), zoom: 12});

  let iconBase =
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

  let icons = {
    parking: {
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      icon: iconBase + 'library_maps.png'
    },
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };

  let places = [
    {
      position: new google.maps.LatLng(44.8116093,20.4710836),
      type: 'info'
    }, {
      position: new google.maps.LatLng(44.8482649,20.3844028),
      type: 'info'
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



  
  