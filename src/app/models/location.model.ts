interface Location {
    title: string;
    address1: string;
    address2: string;
    coords: { lat: number; lng: number };
    placeId: string;
  }
  
  interface MapOptions {
    center: { lat: number; lng: number };
    fullscreenControl: boolean;
    mapTypeControl: boolean;
    streetViewControl: boolean;
    zoom: number;
    zoomControl: boolean;
    maxZoom: number;
    mapId: string;
  }
  
  interface Configuration {
    locations: Location[];
    mapOptions: MapOptions;
    mapsApiKey: string;
    capabilities: {
      input: boolean;
      autocomplete: boolean;
      directions: boolean;
      distanceMatrix: boolean;
      details: boolean;
      actions: boolean;
    };
  }
  