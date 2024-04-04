import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl"; // N'oubliez pas cela !

// Connecte au data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
  };

  connect() {
    console.log("apiKey", this.apiKeyValue);
    console.log("markers", this.markersValue);
    mapboxgl.accessToken = this.apiKeyValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [2.35, 48.85], // Centre sur Paris, France
      zoom: 5, // Zoom pour afficher la France entière
      maxBounds: [
        [-10.0, 38.0], // Sud-ouest de la zone étendue
        [15.0, 54.0]   // Nord-est de la zone étendue
      ],
      maxZoom: 15, // Limite de zoom
      minZoom: 4   // Limite de zoom minimale pour afficher une zone étendue
    });

    this.map.on('load', () => {
      this.map.fitBounds(this.#getExtendedBounds(), { padding: 70, maxZoom: 15, duration: 0 });
    });



    this.#addMarkersToMap();
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html);

      const customMarker = document.createElement("div");
      customMarker.innerHTML = marker.marker_html;

      new mapboxgl.Marker(customMarker)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }


  #getExtendedBounds() {
    return [[-10.0, 38.0], [15.0, 54.0]];
  }
}
