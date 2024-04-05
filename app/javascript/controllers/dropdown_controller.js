import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dropdown"
export default class extends Controller {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }

  toggle(event) {
    super.toggle()
  }

  hide(event) {
    super.hide(event)
  }
}
