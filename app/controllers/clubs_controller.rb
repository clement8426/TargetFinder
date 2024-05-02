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
    @club = Club.find(params[:id]) # Récupère le club spécifique
    @comments = @club.comments # Récupère les commentaires associés à ce club

  end


  # GET /clubs/new
  def new
    @club = current_user.created_clubs.build
  end

  # GET /clubs/1/edit
  def edit
  end

  # POST /clubs or /clubs.json
  def create
    @club = Club.new(club_params)
    @club.creator = current_user # Définir le créateur comme l'utilisateur actuel

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
        # Vérifier si l'utilisateur actuel n'est pas déjà un éditeur du club
        unless @club.editors.include?(current_user)
          # Ajouter l'utilisateur actuel à la liste des éditeurs du club
          @club.editors << current_user
        end

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
    @club = Club.find(params[:id])
    if @club.destroy
      respond_to do |format|
        format.html { redirect_to profile_path, notice: "Le club a été supprimé avec succès." }
        format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.html { redirect_to profile_path, alert: "Erreur lors de la suppression du club." }
        format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_club
      @club = Club.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def club_params
      params.require(:club).permit(:name, :city, :description, :address, :photo)
    end


end
