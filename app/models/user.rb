class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :created_clubs, class_name: "Club", foreign_key: "creator_id"
  has_many :club_edits
  has_many :edited_clubs, through: :club_edits, source: :club
end
