class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :store_user_location!, if: :storable_location?


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end

  private

  def store_user_location!
    # Stockez uniquement l'URL si l'utilisateur n'est pas déjà sur la page de connexion
    session[:previous_url] = request.fullpath unless request.fullpath =~ /\/users/
  end

  def storable_location?
    request.get? && !request.xhr? && !request.fullpath.include?("/users")
  end

  def after_sign_in_path_for(resource)
    stored_location = session[:previous_url]
    session[:previous_url] = nil
    stored_location || root_path
  end
end
