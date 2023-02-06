import mapboxgl from 'mapbox-gl';
import Event from './event';
import EventData from './eventData';
import { createHighlightHotelIcon } from 'utils/params';

class HotelsMap extends Event {
  private _map: mapboxgl.Map;
  private _lastPoints: Point;
  private _hoveredFeature?: Feature;
  // private _mousemoveTimesetTimer?: { id: number; feature: Feature };

  constructor(
    map: mapboxgl.Map,
  ) {
    super();

    this._lastPoints = { x: 0, y: 0 };

    this._map = map;
    this._map.on('load', this.load.bind(this));
    this._map.on('click', this.layerId, this.click.bind(this));
    this._map.on('click', this.dotLayerId, this.click.bind(this));
    this._map.on('moveend', this.moveend.bind(this));
    this._map.on('mousemove', this.mousemove.bind(this));
    this._map.on('mousemove', this.layerId, this.mousemoveOnLayer.bind(this));
    this._map.on('mousemove', this.dotLayerId, this.mousemoveOnLayer.bind(this));
    this._map.on('mouseleave', this.layerId, this.mouseleaveOnLayer.bind(this));
    this._map.on('mouseleave', this.dotLayerId, this.mouseleaveOnLayer.bind(this));
  }

  get sourceId() {
    return 'hotels-source';
  }

  get dotSourceId() {
    return 'hotels-dot-source';
  }

  get highlightHotelSourceId() {
    return 'highlight-hotel-source';
  }

  get layerId() {
    return 'hotels-layer';
  }

  get dotLayerId() {
    return 'hotels-dot-layer';
  }

  get highlightHotelLayerId() {
    return 'highlight-hotel-layer';
  }
  
  get source() {
    return this._map.getSource(this.sourceId) as mapboxgl.GeoJSONSource;
  }

  get dotSource() {
    return this._map.getSource(this.dotSourceId) as mapboxgl.GeoJSONSource;
  }

  get highlightSource() {
    return this._map.getSource(this.highlightHotelSourceId) as mapboxgl.GeoJSONSource;
  }

  private load(event: mapboxgl.MapboxEvent<any> & mapboxgl.EventData) {
    this._map.loadImage(
      'https://hotelsmap.s3.ap-northeast-1.amazonaws.com/icons/hotel_icon_40x46_2.png',
      (error, image) => {
      if (error) throw error;
      this._map.addImage('hotel_icon', image as any);
    });
    this._map.addSource(this.dotSourceId, {
      type: 'vector',
      url: 'mapbox://tk-mapbox.hotels'
    });
    this._map.addLayer({
      'id': this.dotLayerId,
      'type': 'circle',
      'source': this.dotSourceId,
      'source-layer': 'hotels',
      'paint': {
        'circle-color': '#ad6770',
        'circle-radius': 5,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#e8b9bd'
      },
      'filter': [
        'all',
        ['>=', 2, ['get', 'priority']],
      ]
    });
    this._map.addSource(this.sourceId, {
      type: 'vector',
      url: 'mapbox://tk-mapbox.hotels'
    });
    this._map.addLayer({
      'id': this.layerId,
      'type': 'symbol',
      'source': this.sourceId,
      'source-layer': 'hotels',
      'layout': {
        'icon-image': 'hotel_icon',
        'icon-size': 1
      },
      'filter': [
        'all',
        ['<=', 3, ['get', 'priority']],
      ]
    });
    this._map.addImage('highlight-hotel', createHighlightHotelIcon(this._map), { pixelRatio: 2 });
    this._map.addSource(this.highlightHotelSourceId, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [],
      }
    });
    this._map.addLayer({
      'id': this.highlightHotelLayerId,
      'type': 'symbol',
      'source': this.highlightHotelSourceId,
      'layout': {
        'icon-image': 'highlight-hotel'
      }
    });
    this._map.moveLayer(this.layerId, this.highlightHotelLayerId);
    this._map.moveLayer(this.dotLayerId, this.highlightHotelLayerId);
    this._map.moveLayer(this.dotLayerId, this.layerId);
  }

  private click(event: mapboxgl.MapboxEvent<any> & { features?: mapboxgl.MapboxGeoJSONFeature[] | undefined; }) {
    if (!event.features || event.features.length == 0) { return; }
    this.fire(new EventData('click', { ...event }));
  }

  private moveend(event: mapboxgl.MapLayerMouseEvent) {
    this.fire(new EventData('moveend', { ...event }));
  }

  private mousemove(event: mapboxgl.MapLayerMouseEvent) {
    this._lastPoints = event.point;
  }

  private mousemoveOnLayer(event: mapboxgl.MapLayerMouseEvent) {
    if (
      event.features &&
      event.features.length > 0
    ) {
      const feature = event.features[0] as Feature;
      this._hoveredFeature = feature;
      this.fire(new EventData('hoverstart', { ...event, feature }));
    }
  }

  private mouseleaveOnLayer(event: mapboxgl.MapLayerMouseEvent) {
    if (this._hoveredFeature) {
      this._hoveredFeature = undefined;
      this.fire(new EventData('hoverend', { ...event }));
    }
  }

  public highlightHotel(feature?: Feature) {
    this.highlightSource.setData({
      'type': 'FeatureCollection',
      'features': !!feature ? [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': feature.geometry,
        }
      ] : []
    });
  }

  public flyTo(coordinates: [number, number]) {
    this._map.flyTo({
      center: coordinates,
      zoom: 9,
      speed: 1.0,
      essential: true
    });
  }

  public getFeaturesOnBound() {
    const bounds = this._map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const targetFeatures: Feature[] = [];
    const features = this._map.querySourceFeatures(this.sourceId, { sourceLayer: 'hotels' }) as Feature[];
    for (const feature of features) {
      const coordinates = feature.geometry.coordinates;
      let dupedFeature: Feature;
      for (const targetFeature of targetFeatures) {
        if (targetFeature.properties.id === feature.properties.id) {
          dupedFeature = feature;
        }
      }
      if (
        !dupedFeature &&
        sw.lng <= coordinates[0] && coordinates[0] <= ne.lng &&
        sw.lat <= coordinates[1] && coordinates[1] <= ne.lat
      ) {
        targetFeatures.push(feature);
      }
    }
    return targetFeatures;
  }

  public getRenderedFeatures(point: Point): Feature[] {
    const box: [mapboxgl.PointLike, mapboxgl.PointLike] = [
      [point.x, point.y],
      [point.x + 1, point.y + 1],
    ];
    const targetFeatures = this._map.queryRenderedFeatures(box, {
      layers: [this.layerId, this.dotLayerId]
    });
    return targetFeatures as Feature[];
  }
}

export default HotelsMap;
