import mapboxgl from 'mapbox-gl';

const HOTEL_HIGHTLIGHT_ICON_SIZE = 140;

export const INIT_GEOJSON: mapboxgl.GeoJSONSourceRaw = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: []
  }
};

export const INITIAL_MAP_STATE = {
  lng: 139.7671687688049,
  lat: 35.68116566710953,
  zoom: 15,
  pitch: 50,
  bearing: -10,
  antialias: true
};

export const STYLES = {
  STREET: 'mapbox://styles/mapbox/streets-v11',
  OUTDOORS: 'mapbox://styles/mapbox/outdoors-v11',
  LIGHT: 'mapbox://styles/mapbox/light-v10',
  DARK: 'mapbox://styles/mapbox/dark-v10',
  SATELLITE: 'mapbox://styles/mapbox/satellite-v9',
};

export const BUILDINGS_LAYER_STYLE = {
  'id': 'buildings',
  'source': 'composite',
  'source-layer': 'building',
  'filter': ['==', 'extrude', 'true'],
  'type': 'fill-extrusion',
  'minzoom': 15,
  'paint': {
    'fill-extrusion-color': '#d2d2d2',
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
    ],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.4
  }
} as mapboxgl.AnyLayer;

export const TERRAIN_SOURCE_STYLE = {
  'type': 'raster-dem',
  'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
  'tileSize': 512,
  'maxzoom': 14
} as mapboxgl.AnySourceData;

export const createHighlightHotelIcon = (map) => ({
  width: HOTEL_HIGHTLIGHT_ICON_SIZE,
  height: HOTEL_HIGHTLIGHT_ICON_SIZE,
  data: new Uint8Array(HOTEL_HIGHTLIGHT_ICON_SIZE * HOTEL_HIGHTLIGHT_ICON_SIZE * 4),
  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
  },
  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;
    const radius = (HOTEL_HIGHTLIGHT_ICON_SIZE / 2) * 0.25;
    const outerRadius = (HOTEL_HIGHTLIGHT_ICON_SIZE / 2) * 0.8 * t + radius;
    const context = this.context;
    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      outerRadius,
      0,
      Math.PI * 2
    );
    context.fillStyle = `rgba(232, 185, 189, ${1 - t})`;
    context.fill();
    // Draw the inner circle.
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = `rgba(173, 103, 112, 1.0)`;
    context.strokeStyle = 'rgba(232, 185, 189, 1.0)';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();
    // Update this image's data with data from the canvas.
    this.data = context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;
    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();
    // Return `true` to let the map know that the image was updated.
    return true;
  }
});
