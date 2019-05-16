let map;
let marker;


function initMap() {
  map = new google.maps.Map(
    document.getElementById('map'), {
      center: new google.maps.LatLng(44.817197, 20.437273),
      zoom: 14
    });

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

  let places = [{
      position: new google.maps.LatLng(44.8116093, 20.4710836),
      type: 'home'
    },
    {
      position: new google.maps.LatLng(44.8482649, 20.3844028),
      type: 'home'
    },
    {
      position: new google.maps.LatLng(44.8141699, 20.4595646),
      type: 'info'
    },
    {
      position: new google.maps.LatLng(44.8115567, 20.4656869),
      type: 'horse'
    }
  ];

  // Create markers.
  for (let i = 0; i < places.length; i++) {
    marker = new google.maps.Marker({
      position: places[i].position,
      icon: icons[places[i].type].icon,
      map: map
    });
  };
};



 let object = document.getElementById("my_location");
 object.onclick = function () {
   // HTML5 geolocation.
   infoWindow = new google.maps.InfoWindow;
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
       var pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };

       infoWindow.setPosition(pos);
       //infoWindow.setContent('Location found.');
       // infoWindow.open(map);
       map.setCenter(pos);

       var lokacija = {
         lat: pos.lat,
         lng: pos.lng
       };
       var marker = new google.maps.Marker({
         position: lokacija,
         map: map
       });
     }, function () {
       handleLocationError(true, infoWindow, map.getCenter());
     });
   } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, map.getCenter());
   }

   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
     infoWindow.setPosition(pos);
     infoWindow.setContent(browserHasGeolocation ?
       'Error: The Geolocation service failed.' :
       'Error: Your browser doesn\'t support geolocation.');
     infoWindow.open(map);
   }
 }



