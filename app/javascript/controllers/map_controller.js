import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";
import Rails from "@rails/ujs";

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
    markersRegion: Array
  };

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [2.35, 48.85],
      zoom: this.isMobileDevice() ? 3 : 5,
      maxBounds: [
        [-10.0, 38.0],
        [15.0, 54.0]
      ],
      maxZoom: 15,
      minZoom: 3
    });

    this.map.on('moveend', () => {
      this.handleMapMove();
    });

    this.map.on('zoomend', () => {
      this.handleMapMove();
    });

    this.addRegionMarkers();
  }

  handleMapMove() {
    const zoom = this.map.getZoom();
    if (zoom < 7) {
      this.addRegionMarkers();
    } else {
      this.addMarkersToMap();
    }
  }

  addMarkersToMap() {
    const bounds = this.map.getBounds();
    const visibleMarkers = this.markersValue.filter(marker => {
      const lngLat = [marker.lng, marker.lat];
      return bounds.contains(lngLat);
    });
    this.clearMarkers();
    visibleMarkers.forEach(marker => {
      const markerElement = document.createElement('div');
      markerElement.innerHTML = marker.marker_html;
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html);
      new mapboxgl.Marker({ element: markerElement })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }

  addRegionMarkers() {
    const bounds = this.map.getBounds();
    const zoom = this.map.getZoom();
    if (zoom < 7 && this.markersRegionValue) {
      this.clearMarkers();
      this.markersRegionValue.forEach(regionMarker => {
        const markerElement = document.createElement('div');
        markerElement.innerHTML = `<span>Région ${regionMarker.region_code}</span><br/><span>Nombre de clubs : ${regionMarker.club_count}</span>`;
        const popup = new mapboxgl.Popup().setHTML(markerElement.innerHTML);
        new mapboxgl.Marker({ element: markerElement })
          .setLngLat(regionMarker.center)
          .setPopup(popup)
          .addTo(this.map);
      });
    }
  }

  clearMarkers() {
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
  }

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
