const iconBase1 = 'https://maps.google.com/mapfiles/kml/pal2/';
const iconBase2 = 'https://maps.google.com/mapfiles/kml/pal3/';

const toilet = 'img/marker/toilet.png';

const icons = {
  default: {
    icon: toilet
  },
  groblje: {
    icon: `${iconBase2}icon44.png`
  },
  spomenici: {
    icon: `${iconBase1}icon32.png`
  },
  restoran: {
    icon: `${iconBase2}icon47.png`
  },
  other: {
    icon: `${iconBase2}icon26.png`
  }
};

export { icons as default };
