import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="down-page"
export default class extends Controller {
  static targets = ["commentFormContainer"]

  connect() {
    console.log("Hello, down page show!");
  }

  scrollDown() {
    console.log("scrolling down");

    setTimeout(() => {
      this.commentFormContainerTarget.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 30);
  }

}
