/* global google */

function createInfowindow(content) {
  const infowindow = new google.maps.InfoWindow({
    content
  });
  return infowindow;
}

export default createInfowindow;
