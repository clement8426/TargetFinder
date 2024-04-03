class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @club = Club.find(params[:club_id])
    @comment = @club.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to @club, notice: "Commentaire ajouté avec succès."
    else
      redirect_to @club, alert: "Impossible d'ajouter le commentaire."
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:description, :note, :photo)
  end
end
