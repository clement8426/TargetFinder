import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="club-show"
export default class extends Controller {
  connect() {
    const stars = this.element.querySelectorAll(".rating-star-label");

    stars.forEach((star, index) => {
      star.addEventListener("click", function() {
        stars.forEach((s, i) => {
          if (i <= index) {
            s.classList.add("selected");
          } else {
            s.classList.remove("selected");
          }
        });
      });

      star.addEventListener("click", function() {
        stars.forEach((s, i) => {
          if (i <= index) {
            s.classList.add("validated");
          } else {
            s.classList.remove("validated");
          }
        });
      });
    });
  }

  toggleCommentForm() {
    const commentFormContainer = document.getElementById('comment-form-container');
    commentFormContainer.classList.toggle('hidden');
  }
}
