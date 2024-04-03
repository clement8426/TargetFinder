import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="slider"
export default class extends Controller {
  connect() {
    const slidesContainer = this.element.querySelector("#slides-container");
    const slide = this.element.querySelector(".slide");
    const prevButton = this.element.querySelector("#slide-arrow-prev");
    const nextButton = this.element.querySelector("#slide-arrow-next");

    nextButton.addEventListener("click", () => {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft += slideWidth;
    });

    prevButton.addEventListener("click", () => {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft -= slideWidth;
    });
  }
}
