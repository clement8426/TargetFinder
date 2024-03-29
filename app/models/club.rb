class Club < ApplicationRecord
  validates :address, presence: true
  validate :address_in_france

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  belongs_to :creator, class_name: "User", foreign_key: "creator_id"
  has_many :club_edits
  has_many :editors, through: :club_edits, source: :user

  private

  def address_in_france
    if address.present?
      result = Geocoder.search(address).first
      unless result && result.country == "France"
        errors.add(:address, "doit être en France")
      end
    end
  end
end
