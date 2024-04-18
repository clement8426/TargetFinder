// Importez la classe IntersectionObserver
import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";
import Rails from "@rails/ujs";

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array

  };

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [2.35, 48.85],
      zoom: this.isMobileDevice() ? 3 : 5, // Adjust zoom level for mobile devices

      maxBounds: [
        [-10.0, 38.0],
        [15.0, 54.0]
      ],
      maxZoom: 15,
      minZoom: 4
    });

    this.map.on('moveend', () => {
      this.handleMapMove();
    });

    this.map.on('zoomend', () => {
      this.handleMapMove();
    });
    this.addMarkersToMap(); // Utilisez cette méthode
  }

  handleMapMove() {
    this.addMarkersToMap(); // Appelez cette méthode lors du déplacement ou du zoom de la carte
  }

  addMarkersToMap() {
    const bounds = this.map.getBounds();

    // Utilisez les limites de la carte pour filtrer les marqueurs
    const visibleMarkers = this.markersValue.filter(marker => {
      const lngLat = [marker.lng, marker.lat];
      return bounds.contains(lngLat);
    });
    console.log("Nombre de marqueurs affichés : ", visibleMarkers.length);

    // Effacez les marqueurs existants
    this.clearMarkers();

    // Ajoutez uniquement les marqueurs visibles à la carte
    visibleMarkers.forEach(marker => {
      // Créez un élément DOM pour le marqueur avec le HTML personnalisé
      const markerElement = document.createElement('div');
      markerElement.innerHTML = marker.marker_html;

      // Créez une popup avec le contenu HTML
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html);

      // Ajoutez le marqueur personnalisé à la carte
      new mapboxgl.Marker({ element: markerElement })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }


  clearMarkers() {
    // Supprimez tous les marqueurs de la carte
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
  }

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
