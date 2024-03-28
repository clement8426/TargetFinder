class ClubsController < ApplicationController
  before_action :set_club, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: %i[ show index ]

  # GET /clubs or /clubs.json
  def index
    @clubs = Club.all

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

  # GET /clubs/1 or /clubs/1.json
  def show
  end

  # GET /clubs/new
  def new
    @club = Club.new
  end

  # GET /clubs/1/edit
  def edit
  end

  # POST /clubs or /clubs.json
  def create
    @club = Club.new(club_params)

    respond_to do |format|
      if @club.save
        format.html { redirect_to club_url(@club), notice: "Le club a été créé avec succès." }
        format.json { render :show, status: :created, location: @club }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /clubs/1 or /clubs/1.json
  def update
    respond_to do |format|
      if @club.update(club_params)
        format.html { redirect_to club_url(@club), notice: "Le club a été mis à jour avec succès." }
        format.json { render :show, status: :ok, location: @club }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clubs/1 or /clubs/1.json
  def destroy
    @club.destroy!

    respond_to do |format|
      format.html { redirect_to clubs_url, notice: "Le club a été supprimé avec succès." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_club
      @club = Club.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def club_params
      params.require(:club).permit(:name, :city, :description, :address)
    end
end
