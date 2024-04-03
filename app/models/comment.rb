class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :club
  validates :description, presence: true
  validates :note, presence: true
  has_one_attached :photo
end
