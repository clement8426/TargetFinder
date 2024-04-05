import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    const sideBar = this.element.querySelector("#mobile-nav");
    const openSidebar = this.element.querySelector("#openSideBar");
    const closeSidebar = this.element.querySelector("#closeSideBar");
    sideBar.style.transform = "translateX(-260px)";

    // Ajouter un écouteur d'événements au document pour détecter les clics
    document.addEventListener('click', (event) => {
      // Vérifier si le clic est en dehors de la sidebar ou sur le bouton de fermeture
      if ((event.target !== sideBar && !sideBar.contains(event.target)) || event.target === closeSidebar) {
        this.toggleSidebar(false); // Fermer la sidebar
      }
    });

    // Ajouter un écouteur d'événements au bouton d'ouverture de la sidebar
    openSidebar.addEventListener('click', () => this.toggleSidebar(true));

    // Ajouter un écouteur d'événements au bouton de fermeture de la sidebar
    closeSidebar.addEventListener('click', () => this.toggleSidebar(false));
  }

  toggleSidebar(flag) {
    const sideBar = this.element.querySelector("#mobile-nav");
    const openSidebar = this.element.querySelector("#openSideBar");
    const closeSidebar = this.element.querySelector("#closeSideBar");

    if (flag) {
      sideBar.style.transform = "translateX(0px)";
      openSidebar.classList.add("hidden");
      closeSidebar.classList.remove("hidden");
    } else {
      sideBar.style.transform = "translateX(-260px)";
      closeSidebar.classList.add("hidden");
      openSidebar.classList.remove("hidden");
    }
  }
}
