import { Controller } from "@hotwired/stimulus";
import Swal from 'sweetalert2';

export default class extends Controller {
  connect() {
    this.element.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      customClass: {
        container: 'borderless' // Ajoutez la classe 'borderless' au conteneur de la boîte de dialogue
      }
    }).then((result) => {
      if (result.isConfirmed) {
        event.target.submit();
      }
    }).catch(() => {
      // Ne rien faire en cas d'erreur
    });
  }
}
