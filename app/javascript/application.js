// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import 'flowbite';

import suggestions from 'suggestions';

//= require sweetalert
//= require rails-ujs

import Swal from 'sweetalert2';
window.Swal = Swal;
