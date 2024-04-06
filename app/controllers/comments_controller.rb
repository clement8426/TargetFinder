class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @club = Club.find(params[:club_id])
    @comment = @club.comments.build(comment_params)
    @comment.user = current_user

    respond_to do |format|
      if @comment.save
        format.html { redirect_to @club, notice: "Commentaire ajouté avec succès." }
      else
        format.html { redirect_to @club, alert: "Impossible d'ajouter le commentaire." }
      end
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to profile_path, notice: "Commentaire supprimé avec succès." }
    end
  end


  private

  def comment_params
    params.require(:comment).permit(:description, :note, :photo)
  end
end
