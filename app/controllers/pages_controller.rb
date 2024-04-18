class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:profile]

  def home
    @clubs = Club.all
    @markers = @clubs.map do |club|
      {
        lat: club.latitude,
        lng: club.longitude,
        info_window_html: render_to_string(partial: "info_window", locals: {club: club}),
        marker_html: render_to_string(partial: "marker")
      }
    end

    @clubs_with_region = Club.all.map do |club|
      location = Geocoder.search([club.latitude, club.longitude]).first
      if location.present? && location.data["address"].present?
        region_code = location.data["address"]["ISO3166-2-lvl6"] || location.data["address"]["ISO3166-2-lvl6"]
        region_code_digits = region_code.scan(/\d/).join
        { club: club, region_code: region_code_digits }
      end
    end.compact

    # Trie les clubs par code de région
    @sorted_clubs = @clubs_with_region.sort_by { |club_info| club_info[:region_code] }

  end

  def profile
    @user = current_user
    @current_comments = @user.comments
    @created_clubs = Club.where(creator_id: @user.id)
    @edited_clubs = ClubEdit.where(user_id: @user.id).map(&:club)
  end

end
