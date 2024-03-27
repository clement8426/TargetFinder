class PagesController < ApplicationController
  def home
    @clubs = Club.geocoded
    @markers = @clubs.map do |club|
      {
        lat: club.latitude,
        lng: club.longitude,
        info_window_html: render_to_string(partial: "info_window", locals: {club: club}),
        marker_html: render_to_string(partial: "marker")
      }
    end
  end
end
