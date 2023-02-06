declare namespace Feature {
  interface Properties {
    auction_id: string;
    feature_id: string;
    cps: string;
    icon?: string;
    advertizer?: string;
    category?: string;
    address_ja?: string;
    address_en?: string;
    address_remark?: string;
    name_ja?: string;
    name_en?: string;
    subtitle?: string;
    summary?: string;
    phone_number?: string;
    promotion_banner?: string;
    promotion_banner_width?: number;
    promotion_banner_height?: number;
    promotion_card?: string;
    promotion_url?: string;
    directions?: string;
    lat?: string;
    lng?: string;
    min_zoom?: string;
    business_hours?: string;
    business_hours_remark?: string;
    external_links?: string;
    profile?: string;
  }
}
declare interface Feature extends mapboxgl.MapboxGeoJSONFeature {
  // properties: Feature.Properties;
  properties: any;
  geometry: GeoJSON.Geometry;
}
