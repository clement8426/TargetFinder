class Club < ApplicationRecord
  has_one_attached :photo

  validates :address, presence: true
  validate :address_in_france

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  belongs_to :creator, class_name: "User", foreign_key: "creator_id", optional: true
  has_many :club_edits, dependent: :destroy
  has_many :editors, through: :club_edits, source: :user
  has_many :comments, dependent: :destroy

  def average_rating
    total_notes = comments.sum(:note)
    total_comments = comments.count
    return 0 if total_comments.zero?
    total_notes.to_f / total_comments
  end

  private

  def address_in_france
    if address.present? && !photo.attached?
      result = Geocoder.search(address).first
      unless result && result.country == "France"
        errors.add(:address, "doit être en France")
      end
    end
  end
end
